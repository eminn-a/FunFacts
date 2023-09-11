import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/service.js";

const catalogtemp = (data) => html`<h2>Fun Facts</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${data.length > 0
      ? data.map((x) => singleTemp(x))
      : html`<h2>No Fun Facts yet.</h2>`}
  </section>`;

const singleTemp = (data) => html` <div class="fact">
  <img src=${data.imageUrl} alt="example1" />
  <h3 class="category">${data.category}</h3>
  <p class="description">${data.description}</p>
  <a class="details-btn" href="/details/${data._id}">More Info</a>
</div>`;

export async function catalogView(ctx) {
  const data = await getAll();
  ctx.render(catalogtemp(data));
}
