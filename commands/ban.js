const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let bReason = args.join(" ").slice(22);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!bUser) return message.channel.send("Couldn't find user.");
	if(bUser.hasPermission("MANAGE_MESSAGES")) return message.delete();

	message.delete();
	if (bReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	let banEmbed = new Discord.RichEmbed()
	.setDescription(":rocket: User Banned :rocket:")
	.setColor("#15f153")
	.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
	.addField("Banned By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", bReason);

	let banchannel = message.guild.channels.find(`name`, "logs");
	if(!banchannel) return message.channel.send("Couldn't find testing channel.");

	message.guild.member(bUser).ban(bReason);

	message.delete().catch(O_o=>{});

	banchannel.send(banEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Bans a player from the server.',
  usage: 'ban [@user] [reason]'
};
