import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const registerTmep = (onSubmit) => html` <section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="login">Login</a></p>
    </form>
  </div>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTmep(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (data.email == "" || data.password == "" || data["re-password"] == "") {
    return alert("Fields are empty!");
  }
  if (data.password != data["re-password"]) {
    return alert("Password do not match!");
  }
  await register(data.email, data.password);
  event.target.reset();
  alert(`Wellcome ${data.email}`);
  ctx.page.redirect("/");
}
