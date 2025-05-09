﻿# FrontEnd_ToDoList
**Project**  
Front-end React 18 + Vite + Material-UI for HDM Todo-List.

---

1. Stack
- **React 18 + Vite** – ultra-fast dev server, HMR, TypeScript out-of-the-box  
- **Material-UI v5** – accessible component library, theming made easy  
- **React Router v6** – single-page routing  
- **Dayjs** – lightweight date handling (FR locale)  
- **React-Toastify** – non-blocking notifications  
- **Yarn 1** – parity with backend

---

2. Quick Start

```bash
git clone https://github.com/Mehdi-Lahouir/FrontEnd_ToDoList.git
cd FrontEnd_ToDoList
yarn                        # install deps

# configure API url
cp .env.sample .env         # VITE_API_BASE_URL=http://localhost:3000

# dev server (HMR at :5173)
yarn dev

3. Features Implemented

List tasks (initial fetch already coded).

Create task (button “Ajouter” or press Enter).

Edit task inline — ✔ button enabled only when text differs from original.

Delete task (trash icon).

Contextual toasts ready via useUiToast hook.

Dark / light mode switch available through UiThemeContext (foundation laid).

4. Code Structure

frontend
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── assets
│       └── images
│           └── favicon.png
├── README.md
├── src
│   ├── components
│   │   ├── App.tsx
│   │   ├── AppContext.ts
│   │   ├── TodoPage.tsx
│   │   └── UiThemeContext.ts
│   ├── config
│   │   ├── router.tsx
│   │   └── theming.ts
│   ├── hooks
│   │   ├── useFetch.ts
│   │   └── useUiToast.ts
│   ├── index.d.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

5. Key Design Choices

useFetch centralises headers + base URL, returns standardised helpers (get, post, …).

Local state stores both name and initialName → lets us detect modifications and disable the “save” button until needed.

Button actions are idempotent: disabled when request would be a no-op, reducing server chatter.

Styling: MUI palette customised via config/theming.ts, easy to switch dark/light.
6. Useful Scripts

Script	Description
yarn dev	Dev server with HMR
yarn build	Production build (creates dist/)
yarn preview	Serve the build locally
yarn lint	ESLint + TypeScript checks

7. Possible Improvements

Checkbox done + strike-through style (backend ready for boolean field).

Filter / search / sort tasks.

Persist dark/light preference to localStorage.

Offline cache with IndexedDB for PWA behaviour.
