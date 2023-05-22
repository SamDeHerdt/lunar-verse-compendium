import { render, screen } from "@testing-library/react";
import CharacterList from "./CharacterSearch";

test("Renders characterList", () => {
  render(<CharacterList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
