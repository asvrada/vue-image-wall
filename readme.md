# vue image wall

An interactive vue component that displays multiple images in a row.

By hovering mouse over one of the images, that image will expand in width.

[Demo](https://asvrada.github.io/vue-imagewall/)

## How to use

First, check dependency. Make sure you have following tools installed on your system:

* [node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

Then, clone/download this repo

`git clone https://github.com/asvrada/vue-imagewall.git`

Under this repo, install dependency for this project

`yarn install`

After this point, you can check the `package.json` to see available actions under `scripts` section.

```bash
# To run in the browser:
yarn run serve

# To build production build
yarn run build

# etc...
```

### To use as a vue component

At this point, this repo is **not ready** to be used as normal/standard vue component because its still under early development.

To use this in your project, I'd recommend build and publish this repo to a separate domain then include it using HTML tag `<frame>` from wherever you want to use it.

## TODO:
1. vue component
1. Support for images of all size
2. Add two interaction modes 
    1. macOS dock
    2. ~~Normal~~ (done)
