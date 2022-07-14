/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Intents } from "discord.js";
import { MessageHandler } from "./handlers";
import fs from "fs";
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

	const TOKEN = process.env.TOKEN as string;
	const PREFIX = process.env.PREFIX as string;

	client.commands = [];
	const commandFiles = fs.readdirSync("./src/commands");
	for (const file of commandFiles) {
		const { default: command } = require(`./commands/${file.replace(".ts", "")}`);

		try {
			const { default: interaction } = require(`./interactions/${file}Interaction`);
			client.commands.push({
				messageCommand: command,
				interactionCommand: interaction,
			});
		} catch (err) {
			client.commands.push({
				messageCommand: command,
			});
		}
	}

	client.once("ready", () => {
		console.log("Ready!");
	});

	const messageHandler = new MessageHandler(client.commands, PREFIX);

	client.on("messageCreate", async (message) => await messageHandler.execute(message));

	client.login(TOKEN);
}

main();
