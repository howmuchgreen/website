import type { NextApiRequest, NextApiResponse } from "next";
import {
  createCanvas,
  NodeCanvasRenderingContext2D,
  registerFont,
  loadImage,
} from "canvas";
import { howMuch, Thing } from "@howmuchgreen/howmuchcarbon";

registerFont("./common/fonts/Nunito-Regular.ttf", { family: "Nunito" });
registerFont("./common/fonts/Nunito-ExtraLight.ttf", {
  family: "Nunito",
  weight: "200",
});
registerFont("./common/fonts/Nunito-Bold.ttf", {
  family: "Nunito",
  weight: "700",
});

const IMG_WIDTH = 1200;
const IMG_HEIGHT = 630;

const addBackground = async (context: NodeCanvasRenderingContext2D) => {
  const image = await loadImage("./public/socialBackground.png");

  context.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);
};

const addWebsite = (context: NodeCanvasRenderingContext2D, q: string) => {
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

const addResult = (context: NodeCanvasRenderingContext2D, result: Thing) => {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;
  const query = `${q}`;

  const result = howMuch(query).bestResult;

  const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
  const context = canvas.getContext("2d");

  await addBackground(context);
  addWebsite(context, query);
  addResult(context, result);

  const buffer = canvas.toBuffer("image/png");

  res.status(200).setHeader("Content-Type", "image/png").send(buffer);
}
