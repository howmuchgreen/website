import { GlobalFonts, Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";
import { howMuch, Trip, Thing } from "@howmuchgreen/howmuchcarbon";
import { readFileSync } from "fs";
import { join } from "path";
import { getResultCo2Eq, getResultName } from "~/common/result";

type Result = Trip | Thing;

const getAssetPath = (asset: string) => {
  return join("./public", asset);
};

GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-Regular.ttf"));
GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-ExtraLight.ttf"));
GlobalFonts.registerFromPath(getAssetPath("fonts/Nunito-Bold.ttf"));

const IMG_WIDTH = 1200;
const IMG_HEIGHT = 630;

const addBackground = async (context: SKRSContext2D) => {
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

const addResult = (context: SKRSContext2D, result: Result) => {
  context.font = "normal 42pt Nunito";
  context.fillStyle = "#000";

  if (result.kind === "thing") {
    const name = getResultName(result);

    context.textAlign = "center";
    context.fillText(name, IMG_WIDTH / 2, 100);
  } else if (result.kind === "trip") {
    const originName = result.origin.name;
    const destinationName = result.destination.name;

    context.textAlign = "right";
    context.fillText(originName, IMG_WIDTH / 2 - 64, 100);

    context.textAlign = "left";
    context.fillText(destinationName, IMG_WIDTH / 2 + 64, 100);

    const image = new Image();
    image.src = readFileSync(getAssetPath("plane.png"));
    image.width = 64;
    image.height = 32;
    context.drawImage(image, IMG_WIDTH / 2 - 32, 100 - 32, 64, 32);
  }

  const co2Eq = getResultCo2Eq(result);
  const [co2, unit] = co2Eq.format().split(" ");

  context.textAlign = "center";
  context.font = "700 160pt Nunito";
  context.fillStyle = "#f12711";
  context.fillText(co2, IMG_WIDTH / 2, 360);

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
