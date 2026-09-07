# FoundeMet — Frontend Architecture PRD

**Version:** 1.0  
**Frontend:** React.js + Vite  
**Styling:** Tailwind CSS  
**State Management:** React Context + React Query/TanStack Query  
**Routing:** React Router  
**Real-Time:** Socket.IO Client  
**HTTP Client:** Axios  
**Forms:** React Hook Form + Zod  
**Icons:** Lucide React  
**Image Uploads:** Cloudinary/ImageKit  
**Authentication:** JWT via HTTP-only cookies

---

# 1. Frontend Objective

The FoundeMet frontend should provide a modern founder-focused experience where users can:

- Discover founders
- Discover startup ideas
- Discover projects
- Publish posts
- Create and manage their profile
- Send and receive connection requests
- Chat with connections
- Control contact visibility
- Receive notifications
- Search for potential co-founders
- Manage their projects and ideas

The frontend should be:

- Responsive
- Fast
- Component-driven
- Accessible
- Maintainable
- SEO-friendly where appropriate
- Easy to extend

---

# 2. Frontend Architecture Philosophy

The application should follow:

**Pages → Features → Components → Services → API**

Instead of:

```text
components/
    Button.jsx
    Modal.jsx
    User.jsx
    Chat.jsx
    Project.jsx
    ...
```

use feature-based organization:

```text
features/
    auth/
    users/
    connections/
    chat/
    ideas/
    projects/
    posts/
    notifications/
    search/
```

This keeps related functionality together.

---

# 3. High-Level Architecture

```text
                    React Application
                           │
             ┌─────────────┴─────────────┐
             │                           │
          Routing                    Global State
             │                           │
       React Router              Auth / UI / User
             │
      ┌──────┴──────┐
      │             │
    Pages        Protected Pages
      │             │
      └──────┬──────┘
             │
         Features
             │
     ┌───────┼────────┬────────┐
     │       │        │        │
   Users   Ideas   Projects   Chat
     │       │        │        │
     └───────┴────────┴────────┘
             │
        API Services
             │
          Axios
             │
       Node.js API
             │
          MongoDB
```

---

# 4. Recommended Folder Structure

```text
foundemet/
│
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── images/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   ├── providers.jsx
│   │   └── queryClient.js
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── illustrations/
│   │
│   ├── components/
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MobileNav.jsx
│   │   │
│   │   └── common/
│   │       ├── ErrorBoundary.jsx
│   │       ├── ProtectedRoute.jsx
│   │       └── LoadingScreen.jsx
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── OnboardingForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   ├── services/
│   │   │   │   └── authApi.js
│   │   │   └── validation/
│   │   │       └── authSchema.js
│   │   │
│   │   ├── users/
│   │   │   ├── components/
│   │   │   │   ├── FounderCard.jsx
│   │   │   │   ├── FounderProfile.jsx
│   │   │   │   ├── SkillsList.jsx
│   │   │   │   └── ContactInfo.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useUsers.js
│   │   │   └── services/
│   │   │       └── userApi.js
│   │   │
│   │   ├── connections/
│   │   │   ├── components/
│   │   │   │   ├── ConnectButton.jsx
│   │   │   │   ├── ConnectionCard.jsx
│   │   │   │   ├── ConnectionRequest.jsx
│   │   │   │   └── ConnectionList.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useConnections.js
│   │   │   └── services/
│   │   │       └── connectionApi.js
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── ChatList.jsx
│   │   │   │   ├── Message.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── TypingIndicator.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useChat.js
│   │   │   │   └── useSocket.js
│   │   │   └── services/
│   │   │       └── chatApi.js
│   │   │
│   │   ├── ideas/
│   │   │   ├── components/
│   │   │   │   ├── IdeaCard.jsx
│   │   │   │   ├── IdeaDetails.jsx
│   │   │   │   ├── IdeaForm.jsx
│   │   │   │   └── IdeaGrid.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useIdeas.js
│   │   │   └── services/
│   │   │       └── ideaApi.js
│   │   │
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   ├── ProjectDetails.jsx
│   │   │   │   ├── ProjectForm.jsx
│   │   │   │   └── ProjectMembers.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useProjects.js
│   │   │   └── services/
│   │   │       └── projectApi.js
│   │   │
│   │   ├── posts/
│   │   │   ├── components/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostComposer.jsx
│   │   │   │   ├── CommentList.jsx
│   │   │   │   └── PostActions.jsx
│   │   │   ├── hooks/
│   │   │   │   └── usePosts.js
│   │   │   └── services/
│   │   │       └── postApi.js
│   │   │
│   │   ├── notifications/
│   │   │   ├── components/
│   │   │   │   ├── NotificationItem.jsx
│   │   │   │   └── NotificationList.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useNotifications.js
│   │   │   └── services/
│   │   │       └── notificationApi.js
│   │   │
│   │   └── search/
│   │       ├── components/
│   │       │   ├── SearchBar.jsx
│   │       │   ├── FilterPanel.jsx
│   │       │   └── SearchResults.jsx
│   │       ├── hooks/
│   │       │   └── useSearch.js
│   │       └── services/
│   │           └── searchApi.js
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── FounderProfile.jsx
│   │   │   ├── IdeaDetails.jsx
│   │   │   └── ProjectDetails.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Onboarding.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── Dashboard.jsx
│   │       ├── Profile.jsx
│   │       ├── Connections.jsx
│   │       ├── Messages.jsx
│   │       ├── MyIdeas.jsx
│   │       ├── MyProjects.jsx
│   │       ├── MyPosts.jsx
│   │       ├── Notifications.jsx
│   │       └── Settings.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── UIContext.jsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useInfiniteScroll.js
│   │   └── useMediaQuery.js
│   │
│   ├── lib/
│   │   ├── axios.js
│   │   ├── socket.js
│   │   └── utils.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   └── globals.css
│   │
│   ├── constants/
│   │   ├── roles.js
│   │   ├── skills.js
│   │   └── routes.js
│   │
│   └── main.jsx
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# 5. Application Routes

## Public Routes

```text
/
```

Home page.

```text
/explore
```

Discover people, ideas, projects and posts.

```text
/founders
```

Founder discovery.

```text
/founders/:username
```

Public founder profile.

```text
/ideas
```

Startup idea discovery.

```text
/ideas/:id
```

Idea details.

```text
/projects
```

Project discovery.

```text
/projects/:id
```

Project details.

---

# 6. Authentication Routes

```text
/login
/register
/onboarding
/forgot-password
/reset-password/:token
```

---

# 7. Protected Routes

```text
/app
/app/profile
/app/connections
/app/messages
/app/messages/:conversationId
/app/ideas
/app/ideas/new
/app/ideas/:id/edit
/app/projects
/app/projects/new
/app/projects/:id/edit
/app/posts
/app/notifications
/app/settings
```

The `/app/*` area requires authentication.

---

# 8. Route Protection

Protected routes should use:

```text
ProtectedRoute
       ↓
Check AuthContext
       ↓
Authenticated?
   │          │
  YES         NO
   ↓          ↓
Render       /login
```

The frontend should never rely exclusively on local state for authorization.

The backend remains the source of truth.

---

# 9. Global Application Providers

The root application should have:

```text
BrowserRouter
    ↓
QueryClientProvider
    ↓
AuthProvider
    ↓
UIProvider
    ↓
App
```

Responsibilities:

### AuthProvider

Stores:

- Current user
- Authentication loading state
- Login state
- Logout state

### UIProvider

Stores:

- Theme
- Sidebar state
- Mobile navigation state
- Global modal state

### QueryClientProvider

Handles:

- API caching
- Loading states
- Refetching
- Mutation states
- Cache invalidation

---

# 10. Homepage UI Architecture

```text
Home
│
├── Navbar
│
├── HeroSection
│
├── SearchFounder
│
├── FeaturedFounders
│   └── FounderCard
│
├── TrendingIdeas
│   └── IdeaCard
│
├── FeaturedProjects
│   └── ProjectCard
│
├── FounderPosts
│   └── PostCard
│
├── HowItWorks
│
├── CTASection
│
└── Footer
```

The homepage should remain usable without authentication.

---

# 11. Navbar

Desktop:

```text
┌─────────────────────────────────────────────────────────┐
│ FoundeMet    Explore    Ideas    Projects    People     │
│                                      Login   Join       │
└─────────────────────────────────────────────────────────┘
```

Authenticated:

```text
┌─────────────────────────────────────────────────────────┐
│ FoundeMet    Explore    Ideas    Projects               │
│                                      🔔   💬   Avatar    │
└─────────────────────────────────────────────────────────┘
```

---

# 12. Founder Card

The FounderCard is a reusable component.

```text
┌─────────────────────────────┐
│        Profile Image        │
│                             │
│  Rahul Sharma               │
│  Full Stack Developer       │
│                             │
│  React • Node • MongoDB     │
│                             │
│  Looking for                │
│  Technical Co-Founder       │
│                             │
│       View Profile          │
└─────────────────────────────┘
```

Props:

```javascript
<FounderCard
    user={user}
    showConnect={true}
    compact={false}
/>
```

---

# 13. Founder Profile UI

Structure:

```text
Profile Header
│
├── Avatar
├── Name
├── Roles
├── Location
├── Verification
├── Connect Button
└── Contact Status
```

Then:

```text
About
Skills
Looking For
Ideas
Projects
Posts
```

Tabs can be used on desktop.

---

# 14. Connect Button States

The button must change according to relationship state.

```text
No relationship
        ↓
[Connect]

Request sent
        ↓
[Pending]

Connected
        ↓
[Connected]

Own profile
        ↓
[Edit Profile]

Blocked
        ↓
[Blocked]
```

This should be implemented as a reusable component.

---

# 15. Contact Information Component

The UI should reflect backend permissions.

Before connection:

```text
Phone
+91 XXXXX XXXXX
🔒 Available after connecting
```

After connection:

```text
Phone
+91 9876543210
```

If hidden by the owner:

```text
Phone
Private
```

Never fetch unauthorized phone numbers just to hide them on the frontend.

---

# 16. Explore Page

The Explore page is one of the most important screens.

```text
Explore
────────────────────────────────────────

Search founders, ideas or projects...

[People] [Ideas] [Projects] [Posts]

Filters
────────────────
Role
Skills
Looking For
Experience
Stage
Location

Results
────────────────

FounderCard
FounderCard
FounderCard
FounderCard
```

Desktop:

```text
┌───────────────┬───────────────────────────┐
│ Filters       │ Search Results            │
│               │                           │
│ Role          │ Founder Card              │
│ Skills        │ Founder Card              │
│ Looking For   │ Founder Card              │
│ Stage         │ Founder Card              │
└───────────────┴───────────────────────────┘
```

Mobile filters should become a drawer/modal.

---

# 17. Search UX

Search should use debouncing.

Example:

```text
User types:

"react"

       ↓

wait ~300ms

       ↓

API request

       ↓

Results
```

Avoid making an API request on every keystroke.

---

# 18. Idea Card

```text
┌──────────────────────────────┐
│ AI Study Assistant           │
│                              │
│ Helping students learn      │
│ more efficiently using AI.  │
│                              │
│ MVP                          │
│ AI • React • Node.js         │
│                              │
│ Looking for: AI Engineer     │
│                              │
│ Founder: Rahul               │
│                              │
│ [View Idea]                  │
└──────────────────────────────┘
```

---

# 19. Project Card

```text
┌──────────────────────────────┐
│       Project Image          │
│                              │
│ MediKiosk                    │
│ Healthcare Platform          │
│                              │
│ React • Node • MongoDB       │
│                              │
│ 👥 3 members                 │
│                              │
│ Looking for Developer        │
│                              │
│ [View Project]               │
└──────────────────────────────┘
```

---

# 20. Post Feed

The post feed should be component-based.

```text
PostFeed
│
├── PostComposer
│
├── PostCard
│   ├── PostHeader
│   ├── PostContent
│   ├── PostImage
│   └── PostActions
│
├── PostCard
│
└── PostCard
```

Post actions:

```text
Like
Comment
Save
Share
```

---

# 21. Onboarding UI

Onboarding should feel like a guided setup rather than a long registration form.

Example:

```text
Step 1 / 5

Welcome to FoundeMet 👋

What best describes you?

[Founder]
[Developer]
[Designer]
[Business]
[Student]
[Other]

                    [Continue]
```

Progress:

```text
● ━━━ ○ ━━━ ○ ━━━ ○ ━━━ ○
```

---

# 22. Onboarding Steps

```text
Step 1
Basic Profile

        ↓

Step 2
Your Role

        ↓

Step 3
What Are You Looking For?

        ↓

Step 4
Skills

        ↓

Step 5
Ideas / Projects

        ↓

Profile Created
```

---

# 23. Dashboard Architecture

```text
Dashboard
│
├── Sidebar
│
├── Topbar
│
└── Main Content
    │
    ├── Overview
    ├── Profile
    ├── Connections
    ├── Messages
    ├── Ideas
    ├── Projects
    ├── Posts
    ├── Notifications
    └── Settings
```

Desktop:

```text
┌─────────────┬────────────────────────────────┐
│             │ Topbar                         │
│   Sidebar   ├────────────────────────────────┤
│             │                                │
│ Dashboard   │         Page Content           │
│ Profile     │                                │
│ Connections │                                │
│ Messages    │                                │
│ Ideas       │                                │
│ Projects    │                                │
│ Posts       │                                │
│ Settings    │                                │
└─────────────┴────────────────────────────────┘
```

---

# 24. Dashboard Sidebar

```text
FoundeMet

⌂ Overview

👤 Profile

🤝 Connections

💬 Messages

💡 My Ideas

🚀 My Projects

📝 My Posts

🔔 Notifications

⚙ Settings
```

---

# 25. Messaging UI

Desktop:

```text
┌────────────────┬──────────────────────────────┐
│ Conversations  │ Chat                         │
│                │                              │
│ Rahul          │ Rahul Sharma                 │
│ Priya          │ 🟢 Online                    │
│ Arjun          │                              │
│                │ Hello!                       │
│                │                              │
│                │ Hi, interested in your idea. │
│                │                              │
│                │ How can I contribute?        │
│                │                              │
│                ├──────────────────────────────┤
│                │ Type message...        ➤     │
└────────────────┴──────────────────────────────┘
```

---

# 26. Socket.IO Frontend Architecture

```text
Socket Provider
       │
       ├── Connection
       ├── Message Received
       ├── Typing
       ├── Online Status
       └── Read Status
```

The chat feature should not create a new socket connection for every message.

Use a single authenticated socket connection where possible.

---

# 27. API Service Layer

Components should not directly write Axios requests.

Bad:

```javascript
axios.get("/api/users");
```

inside many components.

Instead:

```text
Component
    ↓
useUsers()
    ↓
userApi.js
    ↓
Axios
    ↓
Backend
```

Example service:

```javascript
export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};
```

---

# 28. React Query Strategy

Use React Query for server state.

Examples:

```text
useCurrentUser()
useUsers()
useFounder()
useIdeas()
useProjects()
useConnections()
useNotifications()
useConversations()
```

Mutations:

```text
useLogin()
useRegister()
useSendConnection()
useAcceptConnection()
useCreateIdea()
useCreateProject()
useCreatePost()
```

After mutations, invalidate relevant queries.

---

# 29. Loading States

Every major page should have a loading state.

Use skeletons instead of blank screens.

Example:

```text
┌─────────────────────────────┐
│ ███████████                 │
│ █████████████████           │
│                             │
│ ████████  ████████████     │
└─────────────────────────────┘
```

Components:

```text
FounderCardSkeleton
IdeaCardSkeleton
ProjectCardSkeleton
PostSkeleton
ProfileSkeleton
ChatSkeleton
```

---

# 30. Error States

Every API-driven feature needs:

### Loading

```text
Loading...
```

### Success

```text
Content
```

### Empty

```text
No founders found.

Try changing your filters.
```

### Error

```text
Something went wrong.

[Try Again]
```

---

# 31. Empty States

Examples:

### No connections

> You haven't connected with anyone yet.

**Discover Founders**

### No ideas

> You haven't published an idea yet.

**Publish Your Idea**

### No projects

> Showcase something you've built.

**Create Project**

---

# 32. Form Architecture

Use:

```text
React Hook Form
+
Zod
```

Example:

```text
RegisterForm
     ↓
React Hook Form
     ↓
Zod Validation
     ↓
authApi
     ↓
Backend
```

Validation should happen both:

- Frontend
- Backend

Frontend validation is for UX; backend validation is for security.

---

# 33. Image Upload UX

Profile image:

```text
      ┌───────────┐
      │           │
      │   Photo   │
      │           │
      └───────────┘

[Upload Image]
```

Before uploading:

- Validate file type
- Validate size
- Show preview
- Upload
- Show progress
- Display uploaded image

---

# 34. Responsive Design

### Desktop

Use:

```text
Navbar
Sidebar
Multi-column grids
Large chat interface
```

### Tablet

Collapse:

```text
Sidebar → Compact Sidebar
```

### Mobile

Use:

```text
Topbar
Bottom Navigation
Drawer Filters
Single-column cards
Full-screen Chat
```

---

# 35. Mobile Navigation

```text
┌────────────────────────────────────┐
│                                    │
│          Application               │
│                                    │
│                                    │
├────────────────────────────────────┤
│ Home  Explore  Create  Chat  You  │
└────────────────────────────────────┘
```

---

# 36. Design System

Create reusable design tokens.

### Colors

Primary:

```text
Brand
Primary
Secondary
Background
Surface
Border
Text
Muted
Success
Warning
Danger
```

Do not hardcode colors throughout components.

Use Tailwind configuration/design tokens.

---

# 37. Typography

Recommended hierarchy:

```text
Hero Heading
Page Heading
Section Heading
Card Heading
Body
Caption
Label
```

Keep typography consistent throughout the application.

---

# 38. Accessibility

All interactive elements should have:

- Keyboard support
- Visible focus states
- Accessible labels
- Appropriate ARIA attributes where required
- Sufficient contrast
- Alt text for meaningful images

Do not make important actions dependent only on color.

---

# 39. Performance Requirements

The frontend should:

- Lazy-load large routes
- Compress images
- Use responsive images
- Paginate large lists
- Debounce search
- Cache API responses
- Avoid unnecessary rerenders
- Virtualize very large chat/feed lists if necessary
- Code-split dashboard features

Example:

```javascript
const Messages = lazy(() =>
    import("./pages/dashboard/Messages")
);
```

---

# 40. SEO

Public pages should be SEO-friendly.

Important pages:

```text
/
 /founders/:username
 /ideas/:id
 /projects/:id
```

Each should have appropriate:

- Title
- Description
- Open Graph metadata
- Canonical URL
- Social preview image

Private dashboard pages do not need to be indexed.

---

# 41. Authentication State Flow

```text
Application starts
       ↓
GET /api/auth/me
       ↓
Is user authenticated?
     /       \
   YES        NO
    ↓          ↓
Store user   Guest state
    ↓
Render app
```

Avoid storing sensitive authentication tokens in `localStorage` when HTTP-only cookies can be used.

---

# 42. Frontend Security

Frontend must:

- Avoid rendering unsanitized HTML
- Validate user input
- Avoid exposing secrets
- Never include private API keys
- Never trust client-side authorization
- Handle expired sessions
- Handle CSRF protection according to backend architecture
- Restrict file upload types and sizes

---

# 43. Environment Variables

Example:

```text
VITE_API_URL=
VITE_SOCKET_URL=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Never put:

```text
JWT_SECRET
DATABASE_URL
PRIVATE_API_KEY
```

in frontend environment variables.

---

# 44. Frontend State Classification

Use the right state tool for the right job.

### Server State

Use React Query:

```text
Users
Ideas
Projects
Posts
Connections
Notifications
Messages
```

### Global Client State

Use Context:

```text
Current User
Theme
Sidebar
UI preferences
```

### Local State

Use `useState`:

```text
Modal open/close
Form fields
Dropdown
Tabs
Temporary UI state
```

Avoid putting everything into one global store.

---

# 45. Core User Flow

```text
                HOME
                  │
        ┌─────────┴─────────┐
        │                   │
     Explore             Register
        │                   │
        ↓                   ↓
   Founder Card         Onboarding
        │                   │
        ↓                   ↓
   Founder Profile      Profile
        │
        ↓
      Connect
        │
        ↓
  Connection Request
        │
        ↓
     Accepted
        │
        ↓
       Chat
        │
        ↓
 Contact Details
        │
        ↓
   Collaboration
```

---

# 46. MVP Frontend Screens

The first release should contain approximately these screens:

### Public

```text
Home
Explore
Founder Profile
Idea Details
Project Details
```

### Authentication

```text
Login
Register
Onboarding
Forgot Password
```

### Application

```text
Dashboard
Profile
Connections
Messages
Ideas
Projects
Posts
Notifications
Settings
```

---

# 47. Development Order

Build the frontend in this order:

```text
1. Project Setup
        ↓
2. Design System
        ↓
3. Navbar / Layout
        ↓
4. Authentication
        ↓
5. Onboarding
        ↓
6. Profile
        ↓
7. Founder Discovery
        ↓
8. Connections
        ↓
9. Ideas
        ↓
10. Projects
        ↓
11. Posts
        ↓
12. Notifications
        ↓
13. Chat
        ↓
14. Contact Privacy
        ↓
15. Admin UI
        ↓
16. Performance / SEO
        ↓
17. Testing
```

---

# 48. Testing Strategy

Use:

```text
Vitest
React Testing Library
Playwright
```

Test:

### Components

- FounderCard
- ConnectButton
- IdeaCard
- ProjectCard

### Forms

- Login
- Register
- Onboarding
- Idea creation
- Project creation

### Critical flows

```text
Register
Login
Complete onboarding
Search founder
Send connection
Accept connection
Start chat
View contact
```

---

# 49. Frontend Definition of Done

A feature is complete only when:

- UI implemented
- Responsive design implemented
- Loading state implemented
- Empty state implemented
- Error state implemented
- Form validation implemented
- API integration implemented
- Authentication considered
- Authorization handled by backend
- Accessibility checked
- Mobile layout checked
- Basic tests written

---

# 50. Final Frontend Architecture

The final architecture should look like:

```text
                         FoundeMet
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
      Public                                  App
        │                                       │
   ┌────┼────┐                    ┌─────────────┼─────────────┐
   │    │    │                    │             │             │
 Home Explore Profiles          Dashboard     Chat        Settings
   │    │    │                    │
   │    │    │             ┌──────┼──────┐
   │    │    │             │      │      │
 Ideas Projects Posts   Connections Ideas Projects
        │
        ↓
    Feature Layer
        │
 ┌──────┼─────────────────────────────────┐
 │      │       │       │       │         │
Auth   Users   Ideas   Projects Posts   Chat
 │      │       │       │       │         │
 └──────┴───────┴───────┴───────┴─────────┘
                    │
              Service Layer
                    │
             React Query
                    │
                 Axios
                    │
             Node.js API
                    │
                MongoDB
```

# 51. Architectural Principle

The most important rule for the FoundeMet frontend is:

> **Pages should compose features. Features should own their business UI and API logic. Shared components should contain only genuinely reusable UI.**

This prevents the application from becoming a huge collection of unrelated components as FoundeMet grows.

The frontend should ultimately make the following action extremely easy:

**Discover → Connect → Chat → Build.**