import { HomePage } from "~/components/Home";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "howmuch.green",
    description: "How much green?",
  };
};

export default HomePage;
