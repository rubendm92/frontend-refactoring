# frontend refactoring

This repository comes from a small exercise I did as an assignment in university in order to show us how to use the browser localStorage.

The Javascript code is pretty ugly. The concerns are not well factored out and it's using jQuery, which it is not needed for this simple app.

The purpose of this exercise now is to migrate this code into a (in my opinion :)) well factored code, separating the code responsible for accessing the storage and the code doing the use cases.

Here are some _key_ commits:

- [Initial state](https://github.com/rubendm92/frontend-refactoring/commit/70945b1fdd5e6c8122f893ae855e0e2373305b20)
- [All the use cases tested end to end](https://github.com/rubendm92/frontend-refactoring/commit/70945b1fdd5e6c8122f893ae855e0e2373305b20)
- [jQuery removed](https://github.com/rubendm92/frontend-refactoring/commit/56bdf208740ab7e39211943effe0577f6f09181d)
- [Code split in multiple files, unit and integration tests added](https://github.com/rubendm92/frontend-refactoring/commit/9353971dd35d34363bc2686de4dc6c5eade5a105)
- [Using Webpack and Babel to support ES6 modules](https://github.com/rubendm92/frontend-refactoring/commit/9f9639ef401f5b697b81a80c0a222cf2f5666de6)
- [Using SASS instead of CSS](https://github.com/rubendm92/frontend-refactoring/commit/acae680d50cf4320aaca4b308d08da57fb29ff6f)
- [Custom element for the notes](https://github.com/rubendm92/frontend-refactoring/commit/a5d6143fe65a750814d366b13824dcc66defca02)

![But why?](https://media.giphy.com/media/1M9fmo1WAFVK0/giphy.gif "But why?")

## Why Puppeteer

This project had no tests at the beginning and it seemed pretty hard to unit test it, so I decided to start with end to end tests. I have already used [Nightwatch.js](http://nightwatchjs.org/) at work, so I wanted to try something new.

I thought about trying [PhantomJS](http://phantomjs.org/), but I read somewhere that it is deprecated, so the search continues. Until I saw [Puppeteer](https://github.com/GoogleChrome/puppeteer). It's not that I think it was perfect, but I was like 5 hours trying stuff and looking for things and it was the one that worked at first try. Doing assertions is a little bit difficult, but the challenge was nice to practice some Javascript.

## Why Babel

I wanted to use ES6 and for using it while running tests with mocha I had to include it.

## Why Webpack

To be able to use ES6 modules. As I read, you can bundle all your javascript in just one file only with Babel, but if you are using ES6 modules the code doesn't work.

## Why SASS

Just to be cool :D Just to give it a try at doing some configuration with Webpack. Doing this I found that right now at work we are using Webpack 3 and at this repo I'm using Webpack 4, which breaks with ExtractTextPlugin, a plugin that allows you to generate the css from the sass as a separate file. Due to the broken plugin, right now the styles are generated in Javascript, which (I think) inserts the style in the HTML on run.

## Why Custom Elements

I worked with [Polymer](https://www.polymer-project.org/) some years ago and I liked having your own elements in the HTML instead of just a bunch of _divs_ and _spans_. Using a custom element is kind of easy. What I was not able to do was using a shadow dom because (I think) Puppeteer is not able to find the elements once they are hidden behind a shadow dom. Maybe I have to experiment more :)
