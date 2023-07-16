# Meme generator

**Type:** an Image Editor

**Technologies used:** React, Sass, Canvas API, Imgflip API

**Deploy:** https://Kirill-Cherepanov.github.io/meme-generator/

**Repository:** https://github.com/Kirill-Cherepanov/meme-generator

![image](https://github.com/Kirill-Cherepanov/meme-generator/assets/52123816/f404b026-f95b-4d7b-9dd7-830e5a943cc1)

## What I've built and have learned

- Created a fully responsive web application to edit images, mostly focused on adding text to them, as well as applying basic image filters.
- Used canvas to imprint changes onto a given image on the client side. This made the experience much smoother than alternative web apps, albeit at the expense of accuracy of image generation.
- Bootstrapped the application with an API for popular meme images.
- Designed an eye-pleasing user interface.

## My general thoughts

### About this project

The application uses the Imgflip API to fetch popular meme templates, or allows uploading a client's image. After that, it employs the Canvas API to render an image.
It stores information on all the changes to the original template: positioning, font, color and other settings for all the text boxes and filters applied to an image.
After that using the Canvas API it consumes all the data and applies the changes.
There is a margin of error in rendering since the Canvas API can't exactly use CSS data.
There were major hurdles that I ran across while making this project. More on that below.

### Issues I've run across

First and foremost, the Imgflip API is terrible.
Initially I didn't intend to use the Canvas API. I hoped that the Imgflip API could do all the rendering since it promises to be able to do so.
But the reality is that the API they provide for rendering is fatally imprecise and the documentation is so lacking that it's almost nonexistent.
I thought of abandoning the project entirely but I just couldn't throw away everything that I had already done at the time.
Although at this point there is almost nothing left of what it was originally.
Also I should note that the Canvas API is quite quirky. I had to think of many workarounds to make the rendered image at least similar to what it should be. And now that I think of it, it might have been easier to just try taking a screenshot of an element on the page. I'm sure I've seen a library for this.
