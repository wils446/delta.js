import Discord, { Intents, Command } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const TOKEN = process.env.TOKEN!;
const PREFIX = process.env.PREFIX!;

const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});

const commands: Command[] = [];
const commandsFolder = fs.readdirSync("./dist/commands");

for (const folder of commandsFolder) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { default: command } = require(`./commands/${folder}/index.js`);
	commands.push(command);
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("messageCreate", async (msg) => {
	if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift()!.toLowerCase();

	const command = commands.find(
		(cmd) => cmd.name === commandName || cmd.aliases!.includes(commandName)
	);

	if (!command) return;

	try {
		await command.execute(msg, args);
	} catch (err) {
		await msg.reply(`Failed to execute command: ${(err as Error).message}`);
	}
});

client.login(TOKEN);
