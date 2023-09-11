import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTmep = (onSubmit) => html`<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form @submit=${onSubmit} class="login-form">
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export function loginView(ctx) {
  ctx.render(loginTmep(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (data.email == "" || data.password == "") {
    return alert("Fields are empty!");
  }
  await login(data.email, data.password);
  event.target.reset();
  alert(`Wellcome ${data.email}`);
  ctx.page.redirect("/");
}
