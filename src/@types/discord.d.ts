import "discord.js";

declare module "discord.js" {
	export interface Client {
		commands: Command[];
	}

	export interface Command {
		messageCommand: IMessageCommand;
		interactionCommand?: IInteractionCommand;
	}

	export interface IMessageCommand {
		name: string;
		description: string;
		aliases?: string[];
		buttonInteractionIdPrefix?: string;
		execute: (message: Message, args: string[]) => void;
	}

	export interface IInteractionCommand {
		buttonInteractionIdPrefix: string;
		buttonInteraction: (interaction: Interaction) => void;
	}
}
