# ludum-dare-50

Source code for our unofficial Ludum Dare 50 entry. The theme is "delay the inevitable." [Play it here](https://thecodingcouple.github.io/ludum-dare-50/)! (Work in progress)

## Synopsis

Don't Fall is a 2D platformer. The goal of the game is to stay on top of the rotating rectangle for as long as possible.

How to play:
* `Left Arrow` to move left
* `Right Arrow` to move right
* `Up Arrow` or `Space` to jump

## Built With

* [Phase Game Framework](https://phaser.io/)
* [Visual Studio Code](https://code.visualstudio.com/)

## Third Party Assets

* [PP Fight or Flight Heavy Loop music](https://www.gamedevmarket.net/asset/pixel-platformer-music-pack/)
* [Jump, Hit and Death sound effects](https://www.gamedevmarket.net/asset/mega-sfx-pack/)

## Useful Resources

* [Color Hunt (palette generator)](https://colorhunt.co/palette/f0e9d2e6ddc4678983181d31)
* [Phaser 3 Webpack Project template](https://github.com/photonstorm/phaser3-project-template/blob/master/package.json) (it was a little out of date, needed to update from Webpack 4 to Webpack 5)
* [Infinite Jumper in Phase with Modern JavaScript](https://www.goodreads.com/book/show/55219493-infinite-jumper-in-phaser-3-with-modern-javascript)
* [Arcade physics for generic solid shapes](https://phaser.discourse.group/t/arcade-physics-generic-solid-color-shapes/6894)
* [Phaser Discourse Group](https://phaser.discourse.group/)
* How to detect when a sprite is off the screen:
    * https://www.html5gamedevs.com/topic/1564-destroy-off-screen-sprites-using-events/
    * https://phaser.io/examples/v2/sprites/out-of-bounds
    * https://phaser.discourse.group/t/out-of-bounds-checking/905
    * https://stackoverflow.com/questions/53091837/outofboundskill-equivalent-in-phaser-3
    * https://phaser.discourse.group/t/what-is-incamera-in-phaser-3/7031/2
* Sprite movement and jumping with matter
    * https://phaser.io/examples/v3/view/tilemap/collision/matter-platformer-with-wall-jumping
* [Deploying to gh-pages](https://gist.github.com/cobyism/4730490?permalink_comment_id=3611980#gistcomment-3611980)
* [Preloading fonts in phaser](https://phaser.discourse.group/t/loading-fonts-in-phaser-3-not-working/8898/2)

## Project Setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```
### Compiles and minifies for production

```
npm run build
```

### Deploy to gh-pages

```
npm run deploy
```
Alternatively:

```
git add dist && git commit -m "updating gh-pages"
git subtree push --prefix dist origin gh-pages
```

## License (MIT)

MIT License

Copyright (c) 2022 The Coding Couple

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
