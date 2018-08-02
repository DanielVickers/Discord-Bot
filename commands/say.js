const Discord = require("discord.js");

exports.run = async (client, message, args) => {

	let postChannel = args[0].replace(/[#<>]/g, "");;
	let messagePost = args.join(" ").slice(22);
	let general = message.guild.channels.find(`id`, `${postChannel}`);
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
  	if(!general) return message.channel.send("Couldn't find bot testing channel.");

  	message.delete();
	general.send(`${messagePost}`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Makes the bot send a message',
  usage: 'say [channel] [message]'
};
