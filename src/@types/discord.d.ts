import "discord.js";
import { IToDConfig } from "../interfaces/IToDConfig";

declare module "discord.js" {
	export interface Command<ButtonInteractionMeta = unknown> {
		name: string;
		description: string;
		aliases?: string[];
		execute: (message: Message, args: string[], gameConfig: Map<string, IToDConfig>) => Promise<void>;
		buttonInteractionIdPrefix?: string;
		buttonInteractionIdParser?: (str: string) => ButtonInteractionMeta;
		buttonInteractionIdArgs?: string[];
		buttonInteraction?: (
			interaction: ButtonInteraction,
			meta: ButtonInteractionMeta extends unknown ? unknown : ButtonInteractionMeta
		) => Promise<unknown>;
	}
}
