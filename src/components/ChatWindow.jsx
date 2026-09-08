import { useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socket.js";

export default function ChatWindow({
  isOpen,
  onClose,
  initialContact = null,
  currentUser,
  connections = {},
  availableFounders = [],
}) {
  const [activeContact, setActiveContact] = useState(initialContact);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isContactTyping, setIsContactTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Sync initialContact if it changes from parent prop
  useEffect(() => {
    if (initialContact) {
      setActiveContact(initialContact);
      setIsMinimized(false);
    }
  }, [initialContact]);

  // Determine room ID between current user and active contact
  const roomId =
    currentUser && activeContact
      ? [String(currentUser._id), String(activeContact._id)].sort().join("_")
      : null;

  // Load chat history from localStorage on room switch
  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    try {
      const historyKey = `foundmet_chat_${roomId}`;
      const stored = localStorage.getItem(historyKey);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Welcome system message
        const starter = [
          {
            id: `init_${Date.now()}`,
            roomId,
            isSystem: true,
            text: `Connection established. You can now securely message ${activeContact.name}.`,
            timestamp: new Date().toISOString(),
          },
        ];
        setMessages(starter);
        localStorage.setItem(historyKey, JSON.stringify(starter));
      }
    } catch {
      setMessages([]);
    }
  }, [roomId, activeContact]);

  // Connect to Socket.IO and listen for messages
  useEffect(() => {
    if (!currentUser || !roomId) return;

    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    // Join the private direct room
    socket.emit("join_room", { roomId, user: currentUser });

    // Handle incoming message
    const handleReceiveMessage = (incomingMsg) => {
      if (incomingMsg.roomId === roomId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === incomingMsg.id)) return prev;
          const updated = [...prev, incomingMsg];
          try {
            localStorage.setItem(`foundmet_chat_${roomId}`, JSON.stringify(updated));
          } catch {
            // Ignore storage limits
          }
          return updated;
        });

        if (isMinimized) {
          setUnreadCount((c) => c + 1);
        }
      }
    };

    // Handle contact typing
    const handleUserTyping = ({ userId, isTyping }) => {
      if (activeContact && String(userId) === String(activeContact._id)) {
        setIsContactTyping(isTyping);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user_typing", handleUserTyping);
    };
  }, [currentUser, roomId, activeContact, isMinimized]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isContactTyping, isMinimized]);

  // Handle typing debounce
  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (roomId && currentUser) {
      const socket = getSocket();
      socket.emit("typing", {
        roomId,
        userId: currentUser._id,
        userName: currentUser.name,
        isTyping: true,
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", {
          roomId,
          userId: currentUser._id,
          userName: currentUser.name,
          isTyping: false,
        });
      }, 1500);
    }
  };

  // Send message
  const handleSendMessage = (textToSend = null) => {
    const text = (typeof textToSend === "string" ? textToSend : inputText).trim();
    if (!text || !roomId || !currentUser || !activeContact) return;

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      roomId,
      senderId: currentUser._id,
      senderName: currentUser.name,
      senderPhoto: currentUser.photo,
      receiverId: activeContact._id,
      text,
      timestamp: new Date().toISOString(),
    };

    // 1. Emit to Socket.IO server
    const socket = getSocket();
    if (socket.connected) {
      socket.emit("send_message", newMessage);
    }

    // 2. Optimistic local update
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMessage.id)) return prev;
      const updated = [...prev, newMessage];
      try {
        localStorage.setItem(`foundmet_chat_${roomId}`, JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
      return updated;
    });

    setInputText("");

    // Notify typing stopped
    socket.emit("typing", {
      roomId,
      userId: currentUser._id,
      userName: currentUser.name,
      isTyping: false,
    });

    // 3. Fallback automated response for demo / test contact if server is in mock mode
    if (!socket.connected || activeContact._id?.startsWith?.("seed_") || activeContact._id?.startsWith?.("demo_")) {
      setTimeout(() => {
        const replies = [
          `Thanks for reaching out! I'm really excited about building together. What stack are you looking to use?`,
          `Great to connect, ${currentUser.name}! Would love to set up a quick 15-minute sync this week.`,
          `Awesome proposal! Looking forward to reviewing the project roadmap.`,
        ];
        const autoReply = {
          id: `reply_${Date.now()}`,
          roomId,
          senderId: activeContact._id,
          senderName: activeContact.name,
          senderPhoto: activeContact.photo,
          receiverId: currentUser._id,
          text: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => {
          const updated = [...prev, autoReply];
          try {
            localStorage.setItem(`foundmet_chat_${roomId}`, JSON.stringify(updated));
          } catch {
            // Ignore
          }
          return updated;
        });
      }, 1500);
    }
  };

  if (!isOpen) return null;

  // Filter connected founders list
  const connectedFounders = availableFounders.filter(
    (f) =>
      f._id !== currentUser?._id &&
      (connections[f._id] === "connected" || connections[f._id] === "pending" || !connections)
  );

  return (
    <div
      className="foundmet-chat-dock position-fixed"
      style={{
        bottom: "20px",
        right: "24px",
        zIndex: 1055,
        width: isMinimized ? "auto" : "360px",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {/* Minimized Pill Button */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            setUnreadCount(0);
          }}
          className="btn btn-foundmet rounded-pill shadow-lg d-flex align-items-center gap-2 py-2 px-3 animate-bounce"
        >
          <i className="bi bi-chat-dots-fill fs-5"></i>
          <span className="fw-semibold">
            {activeContact ? activeContact.name : "Messages"}
          </span>
          {unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill">{unreadCount}</span>
          )}
        </button>
      ) : (
        /* Expanded Chat Card */
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden d-flex flex-column" style={{ height: "500px" }}>
          
          {/* Header */}
          <div
            className="p-3 text-white d-flex align-items-center justify-content-between"
            style={{
              background: "linear-gradient(135deg, #0B5CFF 0%, #7038F5 100%)",
            }}
          >
            {activeContact ? (
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <button
                  type="button"
                  className="btn btn-link text-white p-0 me-1"
                  onClick={() => setActiveContact(null)}
                  title="All Chats"
                >
                  <i className="bi bi-chevron-left fs-5"></i>
                </button>
                <div className="position-relative">
                  <img
                    src={
                      activeContact.photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        activeContact.name || "F"
                      )}&background=ffffff&color=0B5CFF&size=80`
                    }
                    alt={activeContact.name}
                    className="rounded-circle border border-white"
                    style={{ width: "36px", height: "36px", objectFit: "cover" }}
                  />
                  <span
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                    style={{ width: "10px", height: "10px" }}
                  ></span>
                </div>
                <div className="text-truncate">
                  <h6 className="mb-0 fw-bold text-truncate" style={{ fontSize: "14px" }}>
                    {activeContact.name}
                  </h6>
                  <small className="opacity-90 d-block text-truncate" style={{ fontSize: "11px" }}>
                    {isContactTyping ? (
                      <span className="text-warning fw-bold">typing...</span>
                    ) : (
                      "Active on FoundMet"
                    )}
                  </small>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-chat-quote-fill fs-5"></i>
                <h6 className="mb-0 fw-bold">Founder Messages</h6>
              </div>
            )}

            {/* Window Controls */}
            <div className="d-flex align-items-center gap-1">
              <button
                type="button"
                className="btn btn-link text-white p-1"
                onClick={() => setIsMinimized(true)}
                title="Minimize"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <button
                type="button"
                className="btn btn-link text-white p-1"
                onClick={onClose}
                title="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          {/* Body */}
          {activeContact ? (
            /* Active Thread */
            <div className="d-flex flex-column flex-grow-1 bg-light overflow-hidden">
              
              {/* Message Feed */}
              <div className="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-2" style={{ maxHeight: "330px" }}>
                {messages.map((msg) => {
                  if (msg.isSystem) {
                    return (
                      <div key={msg.id} className="text-center my-1">
                        <span className="badge bg-white text-secondary border px-2 py-1 small" style={{ fontSize: "10px" }}>
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isMe = String(msg.senderId) === String(currentUser?._id);

                  return (
                    <div
                      key={msg.id}
                      className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}
                    >
                      <div
                        className={`p-2 px-3 rounded-4 small shadow-xs ${
                          isMe
                            ? "bg-primary text-white"
                            : "bg-white text-main border"
                        }`}
                        style={{
                          maxWidth: "80%",
                          wordBreak: "break-word",
                          borderBottomRightRadius: isMe ? "4px" : "16px",
                          borderBottomLeftRadius: !isMe ? "4px" : "16px",
                        }}
                      >
                        {msg.text}
                      </div>
                      <small className="text-muted mt-1 px-1" style={{ fontSize: "10px" }}>
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </small>
                    </div>
                  );
                })}

                {/* Live Typing indicator */}
                {isContactTyping && (
                  <div className="d-flex align-items-center gap-1 text-secondary small bg-white p-2 rounded-3 border align-self-start">
                    <span className="spinner-grow spinner-grow-sm text-primary" style={{ width: "8px", height: "8px" }}></span>
                    <span style={{ fontSize: "11px" }}>{activeContact.name} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Icebreakers */}
              <div className="px-2 py-1 bg-white border-top border-bottom d-flex gap-1 overflow-x-auto">
                {[
                  "👋 Hi, love your idea!",
                  "☕ Free for an intro call?",
                  "🤝 Let's explore synergies",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    className="btn btn-outline-secondary btn-sm rounded-pill text-nowrap py-0 px-2"
                    style={{ fontSize: "11px" }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2 bg-white d-flex align-items-center gap-2"
              >
                <input
                  type="text"
                  className="form-control rounded-pill border-1"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={handleInputChange}
                  style={{ fontSize: "13px" }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: "36px", height: "36px", flexShrink: 0 }}
                >
                  <i className="bi bi-send-fill" style={{ fontSize: "13px" }}></i>
                </button>
              </form>
            </div>
          ) : (
            /* Connections / Chats List */
            <div className="flex-grow-1 p-2 bg-white overflow-y-auto">
              <div className="small text-secondary fw-bold px-2 py-1 text-uppercase" style={{ fontSize: "11px" }}>
                Connected Founders
              </div>

              {connectedFounders.length > 0 ? (
                <div className="d-flex flex-column gap-1">
                  {connectedFounders.map((founder) => (
                    <div
                      key={founder._id}
                      onClick={() => setActiveContact(founder)}
                      className="p-2 rounded-3 d-flex align-items-center gap-3 cursor-pointer hover-bg-light border-bottom border-light"
                      style={{ cursor: "pointer", transition: "background 0.15s" }}
                    >
                      <img
                        src={
                          founder.photo ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            founder.name || "Founder"
                          )}&background=0B5CFF&color=fff&size=80`
                        }
                        alt={founder.name}
                        className="rounded-circle border"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="text-main small text-truncate">
                            {founder.name}
                          </strong>
                          <span className="badge bg-primary-subtle text-primary" style={{ fontSize: "10px" }}>
                            {founder.role === "co-founder" ? "Co-Founder" : "Founder"}
                          </span>
                        </div>
                        <small className="text-secondary d-block text-truncate" style={{ fontSize: "11px" }}>
                          {founder.projectDetails || "Ready to connect & build"}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 text-secondary">
                  <i className="bi bi-people fs-2 text-muted"></i>
                  <p className="small mt-2 mb-0">No connected founders yet.</p>
                  <small className="text-muted">
                    Connect with founders from the Explore feed to chat with them!
                  </small>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
