import { Command, Message } from "discord.js";
import translate from "./translate";

const command: Command = {
	name: "translate",
	aliases: ["tr"],
	description: "[command description]",
	execute: async (message: Message, args: string[]) => {
		const lang = args.shift()?.toLowerCase();
		const text = args.join(" ");

		try {
			const translatedText = await translate(text, lang);
			if (!translatedText) throw new Error("No Translation found");
			await message.reply({ content: translatedText, allowedMentions: { repliedUser: false } });
		} catch (err: any) {
			if (err.code === 400) {
				throw new Error("invalid language");
			} else {
				throw new Error("Failed to translate");
			}
		}
	},
};

export default command;
