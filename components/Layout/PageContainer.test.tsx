import { render, screen } from "@testing-library/react";
import React from "react";
import { ChakraProvider } from "../Chakra";
import { PageContainer } from "./PageContainer";

it("should render children", async () => {
  const childId = "test-id";

  render(
    <ChakraProvider>
      <PageContainer>
        <div data-testId={childId}></div>
      </PageContainer>
    </ChakraProvider>
  );

  const child = await screen.findByTestId(childId);
  expect(child).toBeInTheDocument();
});
