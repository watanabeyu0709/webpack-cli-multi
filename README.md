## Introduce
this is a simple self use cli for multi-views app with webpack

## Base on
node `8.6.0`
npm `5.3.0`

## Quick to start
1.make sure you have install webpack npm with global
2.download this project
3.npm install
4.npm run dev-* (example:npm run dev-mobile) `develop mode`
5.npm run build-* (example:npm run build-mobile)  `build mode`

## Directory
```
|--- dist #build files
|--- node_modules #node packages
|--- src #dev folder
    |--- components #global components
    |--- css #global css
        |--- common.scss #global css-style
        |--- variable.scss #global css-variable
    |--- img #global img
    |--- js #global script
        |--- api.js #api conf
        |--- common.js #global js with all plugins & functions & conts
        |--- ...
    |--- static #static files for relative path
    |--- views #all views
        |--- mobile #display mode
            |--- components #private components
            |--- css #private css
            |--- img #private img
            |--- js #private js
            |--- router #private router
            |--- App.vue #main vue
            |--- main.js #main entry
        |--- pc #display mode
            |--- ... #just like what in mobile
        |--- thinker #display mode
            |--- ... #just like what in mobile
        |--- ...  #and so on
    |--- template.html #html template for webpack
|--- .babelrc #babel conf
|--- .gitignore #git ignore conf
|--- package.json #all dependencies
|--- postcss.config.js #postcss conf
|--- README.md #this file
|--- webpack.config.js #webpack file
```
