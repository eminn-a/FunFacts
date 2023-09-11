import { html, render } from "../../node_modules/lit-html/lit-html.js";

const root = document.getElementById("content");
const naviRoot = document.getElementById("navi-bar");

const renderPage = (html) => {
  render(html, root);
};

const naviTemp = (user) => html`
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/catalog">Fun Facts</a>
    </div>
    ${user
      ? html`<div class="user">
          <a href="/create">Add Fact</a>
          <a href="/logout">Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>
`;

export function renderCtx(ctx, next) {
  render(naviTemp(ctx.user), naviRoot);

  ctx.render = renderPage;

  next();
}
