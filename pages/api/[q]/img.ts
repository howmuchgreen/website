import type { NextApiRequest, NextApiResponse } from "next";
import {
  createCanvas,
  NodeCanvasRenderingContext2D,
  registerFont,
} from "canvas";

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

const BG_COLOR = "#ffebf4";

const addWebsite = (context: NodeCanvasRenderingContext2D, q: string) => {
  const website = `howmuch.green/`;

  context.font = "normal 40pt Nunito";
  context.textAlign = "left";
  context.fillStyle = "#000";
  context.fillText(website, 32, 40 + 32);

  const query = q;

  context.fillStyle = "#aaa";
  context.fillText(query, 435, 40 + 32);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = `${req.query.q}`;

  const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
  const context = canvas.getContext("2d");
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, IMG_WIDTH, IMG_HEIGHT);

  addWebsite(context, q);

  const buffer = canvas.toBuffer("image/png");

  res.status(200).setHeader("Content-Type", "image/png").send(buffer);
}
