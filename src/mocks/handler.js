// src/mocks/handler.js
import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:1337/auth/local", (req, res, ctx) => {
    const { identifier, password } = req.body;
    if (password === "1234") {
      // Assuming OTP is used as password
      return res(
        ctx.delay(2000),
        ctx.json({ jwt: "fake_jwt_token", user: { email: identifier } })
      );
    } else {
      return res(
        ctx.delay(2000), // Adding delay to 401 as well
        ctx.status(401),
        ctx.json({ message: "Invalid OTP" })
      );
    }
  }),
  rest.get("http://localhost:1337/api/h2b1ts", (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json([
        { id: 1, name: "H2b1t 1" },
        { id: 2, name: "H2b1t 2" },
        { id: 3, name: "H2b1t 3" },
      ])
    );
  }),
  rest.post("http://localhost:1337/api/h2b1ts", (req, res, ctx) => {
    const { name } = req.body;
    return res(ctx.status(201), ctx.json({ id: new Date().getTime(), name }));
  }),
];
