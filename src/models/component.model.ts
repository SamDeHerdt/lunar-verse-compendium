import Character from "./character.model";

export default interface ComponentData {
  isDarkMode: boolean;
}

export interface CharacterDetailListData extends ComponentData {
  selectedCharacter: Character | null;
  url: string;
}

export interface MovieListData extends ComponentData {
  selectedCharacter: Character;
}

export interface DarkModeSwitchProps extends ComponentData {
    handleDarkModeToggle: () => void;
  }
