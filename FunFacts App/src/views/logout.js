import { logout } from "../api/user.js";

export function logoutView(ctx) {
  logout();
  alert(`See you again ${ctx.user.email}!`);
  ctx.page.redirect("/");
}
