import { render, screen } from "@testing-library/react";
import { HelloWorld } from "./HelloWorld";

it("Should render hello world", () => {
  render(<HelloWorld />);
  const element = screen.queryByText("Hello world");

  expect(element).toBeInTheDocument();
});
