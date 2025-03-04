import fs from "fs";
import path from "path";
import mime from "mime-types";
import sizeOf from "image-size";

interface CharData {
  width: number;
  height: number;
  data: string;
}

interface Themes {
  [theme: string]: {
    [char: string]: CharData;
  };
}

const THEMES_PATH = path.resolve(__dirname, "../assets/theme");
const DEFAULT_THEME = "default";

const themes: Themes = loadThemes(THEMES_PATH);

function loadThemes(themesPath: string): Themes {
  return fs.readdirSync(themesPath).reduce((acc: Themes, themeName) => {
    const themeDir = path.resolve(themesPath, themeName);
    acc[themeName] = fs
      .readdirSync(themeDir)
      .reduce((chars: { [char: string]: CharData }, imgFile) => {
        const { name: char } = path.parse(imgFile);
        const imgPath = path.resolve(themeDir, imgFile);
        chars[char] = createCharData(imgPath);
        return chars;
      }, {});
    return acc;
  }, {});
}

function createCharData(imgPath: string): CharData {
  const file = fs.readFileSync(imgPath);
  const dimensions = sizeOf(file);
  if (!dimensions.width || !dimensions.height) {
    throw new Error(`Invalid image dimensions for ${imgPath}`);
  }

  const mimeType = mime.lookup(imgPath);
  if (!mimeType) {
    throw new Error(`Could not determine MIME type for ${imgPath}`);
  }

  const base64 = fs.readFileSync(imgPath).toString("base64");
  return {
    width: dimensions.width,
    height: dimensions.height,
    data: `data:${mimeType};base64,${base64}`,
  };
}

export function generateCodeImage(
  code: string | number,
  theme: string = DEFAULT_THEME,
  spacing: number = 0
): string {
  const themeChars = themes[theme] || themes[DEFAULT_THEME];
  const chars = code.toString().split("");

  let currentX = 0;
  let maxHeight = 0;
  const images: string[] = [];

  for (const char of chars) {
    const charData = themeChars[char] ?? themeChars["?"];

    if (!charData) {
      throw new Error(`Char '${char}' not found in theme '${theme}'`);
    }

    images.push(
      `<image x="${currentX}" y="0" width="${charData.width}" height="${charData.height}" xlink:href="${charData.data}" />`
    );

    currentX += charData.width + spacing;
    maxHeight = Math.max(maxHeight, charData.height);
  }

  return buildSVG(
    Math.max(0, currentX - spacing),
    maxHeight,
    images.join("\n    ")
  );
}

function buildSVG(width: number, height: number, content: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" 
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Generated Code</title>
  <g>${content}</g>
</svg>`;
}
