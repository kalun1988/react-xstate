// App.js
import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";
import appMachine from "./machines/appMachine";
import SplashScreen from "./components/SplashScreen";
import LoginForm from "./components/LoginForm";
import LoadingOverlay from "./components/LoadingOverlay";
import H2b1tsListPage from "./components/H2b1tsListPage";
import CreateH2b1tPage from "./components/CreateH2b1tPage";

const App = () => {
  const [state, send] = useMachine(appMachine);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      send({ type: "CHECK_SESSION", jwt });
    }
  }, [send]);

  const handleLogin = (data) => {
    send({ type: "LOGIN", data });
  };

  const handleLogout = () => {
    send({ type: "LOGOUT" });
  };
  const handleCreateSubmit = (name) => {
    send({ type: "SUBMIT_FORM", name });
  };

  const handleCancel = () => {
    send({ type: "CANCEL_CREATION" }); // You might need to define this event in your state machine
  };

  return (
    <div className="app">
      {state.matches("splashScreen") && <SplashScreen />}
      {state.matches("login") && (
        <LoginForm onLogin={handleLogin} error={state.context.error} />
      )}
      {state.matches("loading") && <LoadingOverlay />}
      {state.matches("h2b1tsListPage") && (
        <H2b1tsListPage state={state} send={send} onLogout={handleLogout} />
      )}
      {state.matches("createH2b1tPage") && (
        <CreateH2b1tPage
          onSubmit={handleCreateSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
