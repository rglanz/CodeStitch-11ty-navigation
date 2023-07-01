# CodeStitch-11ty-navigation

![3tQpYbY3nrYrXOGGLK5Yl8Ok9GSnEpho3yPMHiBu](https://github.com/rglanz/CodeStitch-11ty-navigation/assets/42592799/bfe4f247-2e4a-4d96-93c9-34b0354e512f)

This is a fully functioning, 11ty-generated static site with a navigation bar from [CodeStitch](https://codestitch.app/).

I use LESS as a CSS preprocessor. I recommend [EasyLess](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less) as a VSCode extension. This plugin also integrates [autoprefixer](https://github.com/postcss/autoprefixer) to make sure your CSS is compliant across browsers.

## Page Structure
- Home (`root-level` page)
- About
- Services  (`parent` page)
  - Service A  (`child` page)
  - Service B
  - Service C
- Portfolio
- Contact

## 11ty Setup
11ty is already configured, just run `npm i` to install the packages.

Run `npm start` to launch a local server.

In each .html page (e.g., `index.html`), the front-matter should look like this:

```
---
layout: "base.html"
permalink: "/"
eleventyNavigation:
  key: "Home"
  order: 100
---
```

For `child` pages, add the `parent` tag to the `eleventyNavigation` property:

```
---
layout: "base.html"
permalink: "service-a/"
eleventyNavigation:
  key: "Service A"
  order: 100
  parent: "Services"
---
```

If you don't want the `parent` page to be visitable, set the `permalink` to `false`:

```
---
layout: "base.html"
permalink: false
eleventyNavigation:
  key: "Services"
  order: 300
---
```

### \* Key Detail *
11ty will automatically add a `children` property to every navigation object. For `root-level` pages, this will be an empty array. For `parent` pages, this will be an array containing each `child` page (i.e., each page with `parent: Parent Page` in its frontmatter.

## Algorithm

We need two levels of unordered lists: 1) an outer list which contains our `root-level` and `parent` pages, and 2) an inner list which contains the `children` of a `parent` page.

Here is the general algorithm for rendering the pages:
- Create the outer `<ul>`
- `For` loop
  - If `child` page, render nothing (we don't want Service A showing up in the main navigation)
  - Elseif `root-level` page, render `<li>` with a link (`<a>`) inside
  - Elseif `parent` page (i.e., Services)
    - render `<li>` with name of `parent`
    - begin an inner `<ul>`
      - `For` loop through the `children` array (i.e., Services A, B, & C)
      - render `<li>` with a link (`<a>`) inside

We will end up with a top-level `<ul>` which contains the `root-level` and `parent` pages, and a (hidden by CSS) inner `<ul>` which contains that `parent`'s `child` pages.

### \* Key Detail *
This project is only setup for a single-level of `child` pages. 11ty Navigation supports infinite depth, although this is often confusing for users and ill-advised.

## Resources
- [Original Stitch](https://codestitch.app/app/dashboard/stitches/758?nav=Top%20Dropdown)
- [11ty Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)

