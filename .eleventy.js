const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./src/**/*.css": "/styles",
  });
  eleventyConfig.addPassthroughCopy({ "./src/assets": "/assets" });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",
    open: true,
    files: "./public/styles/**/*.css",
  });

  return {
    dir: {
      input: "src",
      includes: "_eleventy/includes",
      layouts: "_eleventy/layouts",
      output: "public",
    },
    htmlTemplateEngine: "njk",
  };
};
