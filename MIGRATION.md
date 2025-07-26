# Next.js to Vite Migration

This document outlines the conversion of the Subway Sign app from Next.js to Vite React.

## What Changed

### Build System
- **From**: Next.js 12.2.5
- **To**: Vite 4.2.0 with @vitejs/plugin-react

### Routing
- **From**: Next.js file-based routing (`pages/`)
- **To**: React Router DOM 6.8.0
  - `pages/index.js` → `src/pages/Home.jsx`
  - `pages/sign/[sign].js` → `src/pages/SignPage.jsx` with `useParams()` hook

### Data Fetching
- **From**: `getServerSideProps()` and `getServerSidePaths()`
- **To**: Client-side data fetching with `useEffect()` and `fetch()`

### Meta Tags & SEO
- **From**: `next/head` component
- **To**: Custom `useDocumentMeta()` hook for managing document title and meta tags

### Images
- **From**: Next.js `Image` component
- **To**: Standard HTML `<img>` tags

### Project Structure
```
Old (Next.js):           New (Vite):
├── pages/               ├── src/
│   ├── _app.js         │   ├── pages/
│   ├── _document.js    │   │   ├── Home.jsx
│   ├── index.js        │   │   └── SignPage.jsx
│   └── sign/           │   ├── components/
│       └── [sign].js   │   ├── styles/
├── components/         │   ├── utils/
├── styles/             │   │   └── useDocumentMeta.js
├── public/             │   ├── App.jsx
├── next.config.js      │   └── main.jsx
└── package.json        ├── public/
                        ├── index.html
                        ├── vite.config.js
                        └── package.json
```

### Configuration Files
- **Removed**: `next.config.js`
- **Added**: `vite.config.js` with React plugin, PWA support, and SCSS configuration
- **Updated**: ESLint config for Vite/React

### PWA Support
- **From**: `next-pwa`
- **To**: `vite-plugin-pwa`

## Environment Variables
- Use `VITE_API_URL` instead of `API_URL` (Vite requires `VITE_` prefix for client-side variables)
- Create `.env` file with: `VITE_API_URL=http://localhost:5000`

## Scripts
```json
{
  "dev": "vite",           // instead of "next dev"
  "build": "vite build",   // instead of "next build"
  "preview": "vite preview" // for testing production builds
}
```

## Key Benefits of Migration
1. **Faster Development**: Vite's hot module replacement is significantly faster
2. **Better Build Performance**: Vite uses esbuild for faster builds
3. **Modern Tooling**: Native ES modules support
4. **Simplified Configuration**: Less complex than Next.js setup
5. **Bundle Size**: More control over code splitting and optimization

## API Requirements
Since this is now a pure client-side application, make sure your API server:
1. Has CORS properly configured
2. Is running on the URL specified in `VITE_API_URL`
3. Handles all the endpoints the app expects (`/signids`, `/sign/:id`, `/signinfo/:id`, `/stations`)

## Development
```bash
npm install
npm run dev  # Starts development server on http://localhost:3000
```

## Production
```bash
npm run build  # Creates optimized build in /dist
npm run preview  # Preview production build locally
```