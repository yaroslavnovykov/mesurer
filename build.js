const esbuild = require("esbuild");
const path = require("path");

const watch = process.argv.includes("--watch");

async function build() {
  const ctx = await esbuild.context({
    entryPoints: [path.join(__dirname, "src/content.jsx")],
    bundle: true,
    outfile: path.join(__dirname, "dist/content.js"),
    format: "iife",
    target: ["chrome120"],
    jsxFactory: "h",
    jsxFragment: "Fragment",
    inject: [path.join(__dirname, "src/jsx-shim.js")],
    loader: {
      ".css": "text",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: !watch,
    sourcemap: watch ? "inline" : false,
  });

  if (watch) {
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log("Build complete: dist/content.js");
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
