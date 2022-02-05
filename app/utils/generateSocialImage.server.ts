import { GlobalFonts, Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";
import { howMuch, ResultObject, Thing } from "@howmuchgreen/howmuchcarbon";
import { readFileSync } from "fs";
import { resolve } from "path";
import { LoaderFunction } from "remix";

GlobalFonts.registerFromPath(
  resolve("./public", "fonts", "Nunito-Regular.ttf")
);
GlobalFonts.registerFromPath(
  resolve("./public", "fonts", "Nunito-ExtraLight.ttf")
);
GlobalFonts.registerFromPath(resolve("./public", "fonts", "Nunito-Bold.ttf"));

const IMG_WIDTH = 1200;
const IMG_HEIGHT = 630;

const addBackground = async (context: SKRSContext2D) => {
  const image = new Image();
  image.src = readFileSync(resolve("./public", "socialBackground.png"));
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
