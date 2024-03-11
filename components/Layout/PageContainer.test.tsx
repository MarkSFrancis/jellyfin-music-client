import { render, screen } from "@testing-library/react";
import React from "react";
import { ChakraProvider } from "../Chakra/ChakraProvider";
import { PageContainer } from "./PageContainer";
import { expect, it } from "vitest";

it("should render children", async () => {
  const childId = "test-id";

  render(
    <ChakraProvider>
      <PageContainer>
        <div data-testid={childId}></div>
      </PageContainer>
    </ChakraProvider>
  );

  const child = await screen.findByTestId(childId);
  expect(child).toBeInTheDocument();
});
