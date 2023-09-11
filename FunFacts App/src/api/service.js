import * as api from "./api.js";

const endpoints = {
  all: "/data/facts?sortBy=_createdOn%20desc",
  create: "/data/facts",
  byId: "/data/facts/",
  deleteById: "/data/facts/",
  update: "/data/facts/",
};

export async function getAll() {
  return api.get(endpoints.all);
}

export async function getById(id) {
  return api.get(endpoints.byId + id);
}

export async function create(data) {
  return api.post(endpoints.create, data);
}

export async function deleteById(id) {
  await api.del(endpoints.deleteById + id);
}

export async function update(id, data) {
  return api.put(endpoints.update + id, data);
}
