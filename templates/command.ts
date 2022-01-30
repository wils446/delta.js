import { Command, Message } from "discord.js";

const command: Command = {
	name: "[command name]",
	description: "[command description]",
	execute: async (message: Message, args: string[]) => {
		//code here
	},
};

export default command;
