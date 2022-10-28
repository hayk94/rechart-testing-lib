import React, { PropsWithChildren } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { TEST_ID } from "./MyChart";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

global.ResizeObserver = require("resize-observer-polyfill");

// https:/ / github.com / recharts / recharts / issues / 2268;
jest.mock("recharts", () => {
  const OriginalRechartsModule = jest.requireActual("recharts");

  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ height, children }: any) => (
      <div
        className="recharts-responsive-container"
        style={{ width: 800, height: 800 }}
      >
        {children}
      </div>
    ),
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the button", () => {
  render(<App />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("renders the first line", async () => {
  const { container } = render(<App />);
  screen.logTestingPlaygroundURL();

  const paths = container.querySelectorAll("path");
  console.log("paths", paths.length);

  const line = await screen.findByTestId(TEST_ID);

  expect(line).toBeInTheDocument();
});

test("renders the extra line", async () => {
  const { container } = render(<App />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  await waitFor(() => {
    const paths = container.querySelectorAll("path");
    console.log("paths", paths.length);
  });

  screen.logTestingPlaygroundURL();

  const line = await screen.findByTestId(TEST_ID);

  expect(line).toBeInTheDocument();
});
