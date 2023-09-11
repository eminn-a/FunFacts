import page from "../node_modules/page/page.mjs";

import { renderCtx } from "./midd/render.js";
import { addSession } from "./midd/session.js";

import { homeView } from "./views/homeView.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsVewi.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { logoutView } from "./views/logout.js";
import { likeView } from "./views/like.js";

import * as api from "../src/api/likeService.js";
window.api = api;

page(addSession);
page(renderCtx);

page("/", homeView);
page("/catalog", catalogView);
page("/register", registerView);
page("/login", loginView);
page("/logout", logoutView);
page("/create", createView);
page("/edit/:id", editView);
page("/details/:id", detailsView);
page("/like/:id", likeView);

page.start();
