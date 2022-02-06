import { GlobalFonts, Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";
import { howMuch, Thing } from "@howmuchgreen/howmuchcarbon";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const getAssetPath = (asset: string) => {
  return join(__dirname, "..", "..", "..", "public", asset);
};

GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-Regular.ttf"));
GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-ExtraLight.ttf"));
GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-Bold.ttf"));

const IMG_WIDTH = 1200;
const IMG_HEIGHT = 630;

const getAllFiles = function (dirPath: string, arrayOfFiles: string[]) {
  console.log(dirPath);
  const files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  if (files.length > 20) {
    return arrayOfFiles;
  }

  files.forEach(function (file) {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

// [
//   '/var/task/output/server/pages/api/___vc/__bridge.js',
//   '/var/task/output/server/pages/api/___vc/__helpers.js',
//   '/var/task/output/server/pages/api/___vc/__launcher.js',
//   '/var/task/output/server/pages/api/___vc/package.json',
//   '/var/task/output/server/pages/api/_build/assets.json',
//   '/var/task/output/server/pages/api/_build/index.js',
//   '/var/task/output/server/pages/api/index.js',
//   '/var/task/output/server/pages/package.json'
// ]
const addBackground = async (context: SKRSContext2D) => {
  console.log(getAllFiles(join(__dirname, "..", "..", "..", ".."), []));
  const image = new Image();
  image.src = readFileSync(getAssetPath("socialBackground.png"));
  image.width = IMG_WIDTH;
  image.height = IMG_HEIGHT;

  context.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);
};

const addWebsite = (context: SKRSContext2D, q: string) => {
  const website = `howmuch.green/`;
  const y = 560;
  const x = 130;

  context.font = "normal 36pt Nunito";
  context.textAlign = "left";
  context.fillStyle = "#000";
  context.fillText(website, x, y);

  const query = q;

  context.fillStyle = "#aaa";
  context.fillText(query, x + 360, y);
};

const addResult = (context: SKRSContext2D, result: Thing) => {
  const [co2eq, unit] = result.co2Eq.format().split(" ");

  context.font = "normal 42pt Nunito";
  context.textAlign = "center";
  context.fillStyle = "#000";
  context.fillText(result.name, IMG_WIDTH / 2, 100);

  context.font = "700 160pt Nunito";
  context.fillStyle = "#f12711";
  context.fillText(co2eq, IMG_WIDTH / 2, 360);

  context.font = "normal 50pt Nunito";
  context.textAlign = "left";
  context.fillText(`${unit} CO2eq`, 840, 360);
};

export const generateSocialImage = async (query: string) => {
  const result = howMuch(query).bestResult;

  const canvas = new Canvas(IMG_WIDTH, IMG_HEIGHT);
  const context = canvas.getContext("2d");

  await addBackground(context);
  addWebsite(context, query);
  addResult(context, result);

  const buffer = canvas.toBuffer("image/png");

  return buffer;
};
