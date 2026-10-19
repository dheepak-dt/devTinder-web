# DevTinder Web

DevTinder is a React single-page application for discovering developers, managing connection requests, and editing a developer profile. The interface is responsive across desktop, tablet, and mobile layouts.

## Project structure

```text
src/
  App.jsx                 Router and Redux provider
  main.jsx                React entry point and global stylesheet
  index.css               Tailwind/DaisyUI imports and shared responsive styles
  components/
    Body.jsx              Authenticated app shell, navigation, page outlet, footer
    NavBar.jsx            Main navigation, account menu, and logout action
    Feed.jsx              Developer discovery feed
    UserCard.jsx          Profile card and connection actions
    Connections.jsx       Existing connections page
    Requests.jsx          Incoming requests page
    UserTile.jsx          Shared connection/request row
    Login.jsx             Login and signup forms
    Profile.jsx           Profile page
    EditProfile.jsx       Profile editor and live preview
    Footer.jsx             Shared footer
  utils/
    appStore.js           Redux store
    *Slice.js             Redux state for user, feed, connections, and requests
    constants.js          Backend API base URL
```

## UI and design dependencies

- **React 19** renders the interface.
- **React Router 7** handles client-side routes.
- **Redux Toolkit** and **React Redux** manage application state.
- **Tailwind CSS 4** is integrated through `@tailwindcss/vite`.
- **DaisyUI 5** supplies utility component classes such as buttons, cards, and menus. There is no separate icon or component library dependency.
- **Vite 8** provides the development server and production build.

The design system is implemented in `src/index.css`: shared surface, type, spacing, card, navigation, and responsive breakpoint styles are defined there and used by the page components.

## Routes

- `/` — developer discovery
- `/login` — sign in or create an account
- `/profile` — edit profile and preview changes
- `/connections` — accepted connections
- `/requests` — review incoming connection requests

## Development

```sh
npm install
npm run dev
```

Run `npm run build` to create a production build and `npm run lint` to run Oxlint.
