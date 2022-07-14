import { Command, Message } from "discord.js";

class MessageHandler {
	constructor(private commands: Command[], private prefix: string) {}

	async execute(message: Message) {
		if (message.author.bot || !message.cleanContent.startsWith(this.prefix)) return;

		const args = message.cleanContent.slice(this.prefix.length).split(/ +/);
		const commandName = (args.shift() as string).toLowerCase();

		const command = this.commands.find(
			(c) => c.messageCommand.name === commandName || c.messageCommand.aliases?.includes(commandName)
		);

		if (!command) return;

		try {
			await command.messageCommand.execute(message, args);
		} catch (err) {
			await message.reply({
				content: `Failed to execute the command, Error : ${(err as Error).message}`,
				allowedMentions: { repliedUser: false },
			});
		}
	}
}

export default MessageHandler;
