import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("css applied correctly for seach box validation", () => {
  test("Check search initially has no class applied to it", () => {
    render(<Search searchTerm="" setSearchTerm={() => {}} />);
    const input = screen.getByLabelText("Order ID:");
    expect(input).not.toHaveClass("searchBoxError");
  });

  test("Invalid entry in input results in a search error", async () => {
    render(<Search searchTerm="" setSearchTerm={() => {}} />);
    const input = screen.getByLabelText("Order ID:");
    await userEvent.click(input);
    await userEvent.keyboard("   ");
    expect(input).toHaveClass("searchBoxError");
  });
});

test("search data is correctly sent to parent component", async () => {
  const mockSetSearchTerm = jest.fn();
  render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
  const input = screen.getByRole("textbox", { name: "Order ID:" });
  const button = screen.getByRole("button", { name: "Search Order" });

  await userEvent.click(input);
  await userEvent.keyboard("1234");
  await userEvent.click(button);

  expect(mockSetSearchTerm).toHaveBeenCalledWith("1234");
});
