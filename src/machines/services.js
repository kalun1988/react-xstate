// src/machines/services.js
export const loginService = (context, event) => {
  return fetch("http://localhost:1337/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: event.data.email, // Using email as identifier
      password: event.data.otp, // Using OTP as password
    }),
  }).then((response) => {
    if (!response.ok) {
      // If response is not ok, reject the promise with the error message
      return response.json().then((data) => Promise.reject(data));
    }
    // If response is ok, resolve the promise with the response data
    return response.json();
  });
};

export const fetchH2b1tsService = (context, event) => {
  return fetch("http://localhost:1337/api/h2b1ts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch h2b1ts");
    return res.json();
  });
};

export const createH2b1tService = (context, event) => {
  return fetch("http://localhost:1337/api/h2b1ts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.jwt}`,
    },
    body: JSON.stringify({ name: event.name }),
  }).then((response) => {
    if (!response.ok) {
      // If response is not ok, reject the promise with the error message
      return response.json().then((data) => Promise.reject(data));
    }
    // If response is ok, resolve the promise with the response data
    return response.json();
  });
};
