import { LoaderFunction } from "@remix-run/node";
import { generateSocialImage } from "~/utils/generateSocialImage.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { q } = params;
  const query = `${q}`;

  const buffer = await generateSocialImage(query);

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
