import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getLikes, getUserLike } from "../api/likeService.js";
import { deleteById, getById } from "../api/service.js";

const detailsTemp = (data, user, onDell) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt="example1" />
    <p id="details-category">${data.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${data.description}</p>
        <p id="more-info">${data.moreInfo}</p>
      </div>

      <h3>Likes:<span id="likes">${data.likes}</span></h3>

      <div id="action-buttons">
        <!--Edit and Delete are only for creator-->
        ${data.isOwner
          ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDell} id="delete-btn">Delete</a></div>`
          : nothing}
        ${user && data.isOwner !== true && data.liked == 0
          ? html`<a href="/like/${data._id}" id="like-btn">Like</a>`
          : nothing}
      </div>
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const user = ctx.user;
  // const data = await getById(id);

  const request = [getById(id), getLikes(id)];
  if (user) {
    request.push(getUserLike(id, user._id));
  }

  const [data, likes, liked] = await Promise.all(request);
  data.likes = likes;

  if (user) {
    data.isOwner = user._id == data._ownerId;
    data.liked = liked;
  }
  ctx.render(detailsTemp(data, user, onDell));
  async function onDell() {
    const choice = confirm("Are you sure you want to delete this?");

    if (choice) {
      await deleteById(id);
      ctx.page.redirect("/catalog");
    }
  }
}
