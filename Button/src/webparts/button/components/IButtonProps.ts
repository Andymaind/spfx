import { IButtonInfo } from "../IButtoninfo";
export interface IButtonProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  collectionData: IButtonInfo[];
  color: string;
}
