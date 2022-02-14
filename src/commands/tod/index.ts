import { Command, Message, MessageEmbed } from "discord.js";

const command: Command = {
	name: "tod",
	description: "[command description]",
	execute: async (message: Message, args: string[], gameConfig) => {
		if (!message.guild!.id) {
			await message.reply("This command is not available in DMs.");
			return;
		}

		let todConfig = gameConfig.get(message.guild!.id);

		if (!todConfig) {
			gameConfig.set(message.guild!.id, {
				isPlaying: false,
				isStarting: false,
				playerIsPlaying: false,
				player: [],
				playerListInText: "Player List : \r\n",
			});

			todConfig = gameConfig.get(message.guild!.id);
		}

		if (!todConfig) {
			message.reply("something went wrong");
			return;
		}

		if (args[0] === "start") {
			if (todConfig.isPlaying) {
				await message.reply("There is already a game in progress.");
				return;
			}

			todConfig?.player.push(message.author.id);
			const embed = new MessageEmbed()
				.setDescription(
					`Game TOD telah dimulai, ${message.author.username} telah ditambahkan dalam permainan, pemain yang ingin berganbung silahkan mengetik \`=tod\` untuk bergabung dalam game, game akan dimulai dalam waktu 30 detik lagi!`
				)
				.setTitle("Truth or Dare")
				.setColor("#FF0000");
			await message.channel.send({ embeds: [embed] });
			todConfig.isPlaying = true;
			setTimeout(async () => {
				todConfig!.isStarting = true;
				await message.channel.send(playerList());
				await message.channel.send("Pemain akan ditentukan dalam waktu 10 detik lagi!");
				const random = Math.floor(Math.random() * todConfig!.player.length);
				const challengeRandom = Math.floor(Math.random() * 2);
				const choosedPlayer = `<@!${todConfig!.player[random]}>`;
				const challenge = challengeRandom === 0 ? "Truth" : "Dare";
				setTimeout(async () => {
					await message.channel.send(
						`Selamat kepada ${choosedPlayer} karena anda terpilih untuk melakukan ${challenge}!`
					);
					resetConfig();
				}, 10000);
			}, 30000);
		} else if (todConfig.isPlaying) {
			if (!todConfig.isStarting) {
				if (todConfig.player.indexOf(message.author.id) >= 0) {
					todConfig.playerIsPlaying = true;
				}

				if (todConfig.playerIsPlaying) {
					await message.reply("Anda telah bergabung dalam game TOD!");
				} else {
					todConfig.player.push(message.author.id);
					await message.reply("Anda telah bergabung dalam game TOD!");
				}
			}
		} else await message.reply("TOD belum dimulai!");

		const playerList = () => {
			todConfig!.player.map((player, index) => {
				todConfig!.playerListInText += `${index + 1}. <@!${player}>\r\n`;
			});
			return todConfig!.playerListInText;
		};

		const resetConfig = () => {
			todConfig!.player = [];
			todConfig!.playerListInText = "Player List : \r\n";
			todConfig!.isPlaying = false;
			todConfig!.isStarting = false;
			todConfig!.playerIsPlaying = false;
		};
	},
};

export default command;
