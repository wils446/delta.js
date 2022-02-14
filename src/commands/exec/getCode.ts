import { Message } from "discord.js";

export const getCode = (message: Message) => {
	const codeSplit = message.content.split("```")[1].split("\n");
	const lang = codeSplit.shift();
	codeSplit.pop();
	const code = codeSplit.join("\n").trim();

	return { code, lang };
};
