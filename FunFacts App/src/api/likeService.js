import * as api from "./api.js";

const endponts = {
  likes: `/data/likes`,
  getLikesCount: (id) =>
    `/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`,
  likesByUserAnFact: (factId, userId) =>
    `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function like(likeId) {
  return api.post(endponts.likes, { likeId });
}

export async function getLikes(likeId) {
  return api.get(endponts.getLikesCount(likeId));
}

export async function getUserLike(likeId, userId) {
  return api.get(endponts.likesByUserAnFact(likeId, userId));
}
