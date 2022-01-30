import "discord.js";

declare module "discord.js" {
	export interface Command<ButtonInteractionMeta = unknown> {
		name: string;
		description: string;
		aliases?: string[];
		execute: (message: Message, args: string[]) => Promise<void>;
		buttonInteractionIdPrefix?: string;
		buttonInteractionIdParser?: (str: string) => ButtonInteractionMeta;
		buttonInteractionIdArgs?: string[];
		buttonInteraction?: (
			interaction: ButtonInteraction,
			meta: ButtonInteractionMeta extends unknown
				? unknown
				: ButtonInteractionMeta
		) => Promise<unknown>;
	}
}
