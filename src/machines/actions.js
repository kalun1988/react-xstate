// src/machines/actions.js
import { assign } from "xstate";

export const setJwt = assign({
  jwt: (context, event) => event.jwt,
});

export const clearSession = (context, event) => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  return assign({ user: null, jwt: null, error: null });
};
