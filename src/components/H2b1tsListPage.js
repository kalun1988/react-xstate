// H2b1tsListPage.js
import React from "react";

const H2b1tsListPage = ({ state, send, onLogout }) => {
  return (
    <div>
      <h1>H2b1ts List</h1>
      {state.matches("h2b1tsListPage.loading") && <p>Loading...</p>}
      {state.matches("h2b1tsListPage.failed") && (
        <>
          <p>Error: Failed to load h2b1ts</p>
          <button onClick={() => send("RETRY")}>Retry</button>
        </>
      )}
      {state.matches("h2b1tsListPage.loaded") &&
        state.context.h2b1ts &&
        state.context.h2b1ts.length > 0 && (
          <ul>
            {state.context.h2b1ts.map((h2b1t) => (
              <li key={h2b1t.id}>{h2b1t.name}</li>
            ))}
          </ul>
        )}
      <button
        onClick={() => {
          console.log("Create New H2b1t Clicked");
          send("CREATE_H2B1T");
        }}
      >
        Create New H2b1t
      </button>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default H2b1tsListPage;
