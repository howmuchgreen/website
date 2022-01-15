# 🌱 howmuch.green

This repo contains the source code of https://howmuch.green

## Development

Node 16 is required.

>  💡 On a Mac M1 you'll need to execute the following command prior to `npm install`:
>```bash
> arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg
>```
> *This seems to be because of [`node-canvas` (thread here)](https://github.com/Automattic/node-canvas/issues/1733#issuecomment-808916786)*

```bash
npm i
npm run dev
```
