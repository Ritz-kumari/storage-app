# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# stroageApp-frontend

## Run with the local API

Start the [backend](../stroageApp-backend/README.md) first, then run:

```sh
npm ci
VITE_BACKEND_BASE_URL=http://localhost:4000 npm run dev -- --host localhost --port 5174 --strictPort
```

Open `http://localhost:5174/login`. Google sign-in is shown only when
`VITE_GOOGLE_CLIENT_ID` is set; it must match `GOOGLE_CLIENT_ID` on the backend.
