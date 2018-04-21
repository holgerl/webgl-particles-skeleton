# webgl-particles-skeleton

This is skeleton code for a particle visualization in WebGL.

It uses Three.js and Webpack.

See [the resulting visualization here](https://holgerl.github.io/webgl-particles-skeleton/).

## Installing

```
npm install webpack webpack-cli -g
npm install
```

## Building once

```
webpack
```

Open `index.html`

## Live building and reloading

```
npm start
```

Open `http://localhost:8081/webpack-dev-server/`

## The code

```javascript
src/
├── dist/
│   └── bundle.js       // The built js
├── docs/
├── src/
│   ├── fragmenshader.glsl  // Fragment shader calculates the particle appearances
│   ├── index.js        // The js entry point
│   ├── main.js         // The setup code for the visualization
│   └── vertexshader.glsl   // Vertex shader calculates the particle positions
├── index.html           // The html entry point
├── package.json        // NPM config file
├── README.md           // This readme!
└── webpack.config.js   // Webpack build config
```