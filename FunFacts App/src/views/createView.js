import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/service.js";
import { createSubmitHandler } from "../util.js";

const createTmep = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Add Fact</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="category" id="category" placeholder="Category" />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add Fact</button>
    </form>
  </div>
</section>`;

export function createView(ctx) {
  ctx.render(createTmep(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (Object.values(data).some((x) => x == "")) {
    return alert("Fields are empty!");
  }
  const obj = {
    category: data.category,
    imageUrl: data["image-url"],
    description: data.description,
    moreInfo: data["additional-info"],
  };
  await create(obj);
  event.target.reset();
  ctx.page.redirect("/catalog");
}
