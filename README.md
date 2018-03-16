# webgl-particles-skeleton

This is skeleton code for a particle visualization in WebGL.

It uses Three.js and Webpack.

See [the resulting visualization here](https://holgerl.github.io/webgl-particles-skeleton/).

## Build

```
npm install
webpack
```

Open `main.html`

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
├── main.html           // The html entry point
├── package.json        // NPM config file
├── README.md           // This readme!
└── webpack.config.js   // Webpack build config
```