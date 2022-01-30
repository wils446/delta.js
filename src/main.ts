import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user!.tag}!`);
});

client.login(TOKEN);
