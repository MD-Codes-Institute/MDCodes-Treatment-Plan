import { fireEvent, render, screen } from "@testing-library/react";
import ActionButton from "./ActionButton";

describe("ActionButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render button", () => {
    render(
      <ActionButton type="button" onClick={() => {}}>
        Button render
      </ActionButton>
    );
    expect(screen.getByText("Button render")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <ActionButton type="button" onClick={handleClick}>
        Click here to toggle modal
      </ActionButton>
    );
    const btn = screen.getByRole("button", { name: /click here to toggle modal/i });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should set attribute type="submit" when passed', () => {
    render(
      <ActionButton type="submit" onClick={() => {}}>
        Submit
      </ActionButton>
    );
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toHaveAttribute("type", "submit");
  });
});
