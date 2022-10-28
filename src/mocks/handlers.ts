// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("/data", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([
        { key: 1, extraLine: 150 },
        { key: 2, extraLine: 250 },
        { key: 3, extraLine: 350 },
        { key: 4, extraLine: 450 },
      ])
    );
  }),
];
