import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../api/service.js";
import { createSubmitHandler } from "../util.js";

const editTmep = (data, onSubmit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Fact</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="category"
        id="category"
        placeholder="Category"
        .value=${data.category}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${data.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${data.description}
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
        .value=${data.moreInfo}
      ></textarea>
      <button type="submit">Post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const id = ctx.params.id;
  const data = await getById(id);
  ctx.render(editTmep(data, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  const id = ctx.params.id;

  if (Object.values(data).some((x) => x == "")) {
    return alert("Fileds are empty!");
  }

  const obj = {
    category: data.category,
    imageUrl: data["image-url"],
    description: data.description,
    moreInfo: data["additional-info"],
  };
  await update(id, obj);
  ctx.page.redirect(`/details/${id}`);
}
