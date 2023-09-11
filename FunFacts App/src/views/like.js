import { like } from "../api/likeService.js";

export async function likeView(ctx) {
  const id = ctx.params.id;
  console.log(ctx.params.id);
  await like(id);
  ctx.page.redirect(`/details/${id}`);
}
