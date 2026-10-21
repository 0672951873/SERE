# Serein Parfums

A responsive editorial storefront for a fictional South African perfume house. Built with React, TypeScript, and Vite.

## Requirements

- Node.js 18 or newer
- npm

## Deploy to Render

The `render.yaml` Blueprint configures this as a static site. In Render, create a new Blueprint from the connected Git repository and Render will build with `npm install && npm run build` and publish `dist`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; use `npm run preview` to inspect that build locally.

## Storefront interactions

- Filter the collection by fragrance type.
- Add fragrances to the shopping bag and change quantities in the bag drawer.
- Submit an email address in the newsletter form for an on-page confirmation.

The checkout button is a visual storefront placeholder and is not connected to payment processing. Product and editorial images are loaded from Unsplash; Google Fonts are loaded remotely.
