// appMachine.js
import { createMachine, assign } from "xstate";
import * as services from "./services";
import * as actions from "./actions";
import * as guards from "./guards";

const appMachine = createMachine(
  {
    id: "app",
    initial: "splashScreen",
    context: {
      user: null,
      jwt: null,
      error: null,
      h2b1ts: null,
    },
    states: {
      splashScreen: {
        on: {
          CHECK_SESSION: {
            actions: "setJwt",
          },
        },
        after: {
          3000: [
            { target: "h2b1tsListPage.loading", cond: "hasJwt" },
            { target: "login" },
          ],
        },
      },
      login: {
        on: {
          LOGIN: {
            target: "loading",
            actions: assign({ error: null }),
          },
        },
      },
      loading: {
        invoke: {
          id: "loginService",
          src: "loginService",
          onDone: {
            target: "h2b1tsListPage.loading",
            actions: assign({
              user: (context, event) => {
                const { user, jwt } = event.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("jwt", jwt);
                return user;
              },
              jwt: (context, event) => event.data.jwt,
              error: null,
            }),
          },
          onError: {
            target: "login",
            actions: assign({
              error: (context, event) => event.data.message,
            }),
          },
        },
      },
      h2b1tsListPage: {
        initial: "loading",
        states: {
          loading: {
            invoke: {
              id: "fetchH2b1ts",
              src: "fetchH2b1tsService",
              onDone: {
                target: "loaded",
                actions: assign({
                  h2b1ts: (context, event) => event.data,
                }),
              },
              onError: "failed",
            },
          },
          loaded: {},
          failed: {},
        },
        on: {
          LOGOUT: {
            target: "login",
            actions: "clearSession",
          },
          RETRY: ".loading",
          CREATE_H2B1T: "createH2b1tPage",
        },
      },
      createH2b1tPage: {
        initial: "idle",
        states: {
          idle: {
            on: {
              SUBMIT_FORM: "submitting",
            },
          },
          submitting: {
            invoke: {
              id: "createH2b1tService",
              src: "createH2b1tService",
              onDone: {
                target: "#app.h2b1tsListPage.loading",
              },
              onError: {
                target: "idle",
                actions: assign({ error: (context, event) => event.data }),
              },
            },
          },
        },
        on: {
          CANCEL_CREATION: "h2b1tsListPage",
        },
      },
    },
  },
  {
    guards,
    services,
    actions,
  }
);

export default appMachine;
