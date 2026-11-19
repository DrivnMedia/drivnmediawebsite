// Generates public/og.png (1200x630): dark card with the logo and the hero headline.
// Run with: npm run og
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, root));

// Pull the headline straight from the copy file so the image never drifts.
const site = await read("src/data/site.ts").then((b) => b.toString());
const heroBlock = site.slice(site.indexOf("export const hero"));
const pick = (key) => heroBlock.match(new RegExp(`${key}:\\s*"([^"]+)"`))[1];
const highlight = pick("headline");
const rest = heroBlock.match(/rotating:\s*\[\s*"([^"]+)"/)[1];
const eyebrow = pick("eyebrow");

const logo = await sharp(await read("src/assets/drivn-logo.png")).resize({ width: 640 }).png().toBuffer();
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const h = (type, style, children, props = {}) => ({ type, props: { style, children, ...props } });

const tree = h(
  "div",
  {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "64px 72px",
    backgroundColor: "#0b0f14",
    backgroundImage:
      "radial-gradient(circle at 100% 0%, rgba(28,148,252,0.35), rgba(11,15,20,0) 55%), radial-gradient(circle at 0% 100%, rgba(60,224,252,0.14), rgba(11,15,20,0) 45%)",
    color: "#fff",
    fontFamily: "Sora",
  },
  [
    h("img", { width: 320, height: 96 }, undefined, { src: logoSrc, width: 320, height: 96 }),
    h("div", { display: "flex", flexDirection: "column" }, [
      h("div", { fontSize: 22, fontWeight: 600, letterSpacing: 3.5, textTransform: "uppercase", color: "#3ce0fc" }, eyebrow),
      h("div", { marginTop: 28, fontSize: 80, fontWeight: 600, lineHeight: 1.04, letterSpacing: -3, color: "#3ce0fc" }, highlight),
      h("div", { fontSize: 80, fontWeight: 600, lineHeight: 1.04, letterSpacing: -3 }, rest),
    ]),
  ],
);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Sora", data: await read("node_modules/@fontsource/sora/files/sora-latin-600-normal.woff"), weight: 600, style: "normal" },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
const out = await sharp(png).png({ compressionLevel: 9, palette: false }).toBuffer();
await writeFile(new URL("public/og.png", root), out);
console.log(`public/og.png written (${Math.round(out.length / 1024)} KB)`);
