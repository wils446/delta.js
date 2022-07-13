import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

function main() {
	dotenv.config({ path: ".env" });

	const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_TYPING,
		],
	});

	const TOKEN = process.env.TOKEN;
	const PREFIX = process.env.PREFIX;

	client.once("ready", () => {
		console.log("Ready!");
	});

	client.login(TOKEN);
}

main();
