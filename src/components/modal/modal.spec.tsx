import React from "react";
import { render, screen } from "@testing-library/react";
import ModalRoot from "./ModalRoot";
// import ModalHeader from "./ModalHeader";

describe("Modal render", () => {
  it("should have all required components", () => {
    render(<ModalRoot className="flex flex-col">Olá testando o testing library</ModalRoot>);
    const modalRender = screen.getByText("Olá testando o testing library");
    expect(modalRender).toHaveClass("flex flex-col", {exact: false})
    expect(modalRender).toBeInTheDocument()
  });
});
