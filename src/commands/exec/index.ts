import { Command, Message } from "discord.js";
import { getCode } from "./getCode";
import { getLang } from "./getLang";
import axios from "axios";

const command: Command = {
	name: "exec",
	description: "[command description]",
	execute: async (message: Message) => {
		const messageTemplate = "```\n[output]\n```\nExecution time : `[time]`\nMemory usage : `[memory]`";

		const { code, lang } = getCode(message);

		const apiLang = getLang(lang!);

		if (!apiLang) throw new Error("Language not supported");

		try {
			const response = await axios.post("https://api.jdoodle.com/v1/execute", {
				script: code,
				language: apiLang.name,
				versionIndex: apiLang.version,
				clientId: process.env.JDOODLE_CLIENT_ID!,
				clientSecret: process.env.JDOODLE_CLIENT_SECRET!,
			});

			const { output, memory, cpuTime } = response.data;

			if (output.length > 1950) {
				await message.reply({
					content: `Output too long \`${output.length}\``,
					allowedMentions: { repliedUser: false },
				});
				return;
			}

			await message.reply({
				content: messageTemplate.replace("[output]", output).replace("[time]", cpuTime).replace("[memory]", memory),
				allowedMentions: { repliedUser: false },
			});
		} catch (err: any) {
			if (err) throw new Error(err.message);
		}
	},
};

export default command;
