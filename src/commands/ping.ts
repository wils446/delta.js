import { IMessageCommand } from "discord.js";

const command: IMessageCommand = {
	name: "ping",
	description: "Ping!",
	execute: async (message) => {
		await message.reply({ content: "Pong!", allowedMentions: { repliedUser: false } });
	},
};

export default command;
