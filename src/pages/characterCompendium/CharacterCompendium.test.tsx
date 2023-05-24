import { render, screen } from "@testing-library/react";
import CharacterCompendium from "./CharacterCompendium";

test("Renders characterList", () => {
  render(<CharacterCompendium />);
  const linkElement = screen.getByText(/Character Compendium/i);
  expect(linkElement).toBeInTheDocument();
});