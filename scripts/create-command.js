/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const commandName = process.argv[2];
const commandNameCamalized = camalize(commandName);
const commandDescription = process.argv[3];

const newCommand = `./src/commands/${commandNameCamalized}`;
const newCommandFile = `${newCommand}/index.ts`;

if (fs.existsSync(newCommand))
	throw new Error(`${commandNameCamalized} already exists`);

fs.mkdirSync(newCommand, { recursive: true });

copyTemplate(
	"./templates/command.ts",
	newCommandFile,
	commandNameCamalized,
	commandDescription
);

function copyTemplate(src, path, commandName = "", description = "") {
	fs.readFile(src, "utf8", (err, data) => {
		if (err) throw err;
		if (commandName) data = data.replace("[command name]", commandName);
		if (description) data = data.replace("[command description]", description);
		fs.writeFile(path, data, "utf8", (err) => {
			if (err) throw err;
		});
	});
}

function camalize(str) {
	const words = str.split("-");
	const camalizedWord = words.map((item, index) =>
		index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item
	);
	return camalizedWord.join("");
}
