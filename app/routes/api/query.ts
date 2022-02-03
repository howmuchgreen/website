import { ActionFunction, redirect } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  return redirect(`/${body.get("query")}`);
};
