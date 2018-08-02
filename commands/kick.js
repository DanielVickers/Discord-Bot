const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let kReason = args.join(" ").slice(22);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!kUser) return message.channel.send("Couldn't find user.");
	if(kUser.hasPermission("MANAGE_MESSAGES")) return message.delete();

	message.delete();
	if (kReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	let kickEmbed = new Discord.RichEmbed()
	.setDescription(":rocket: User Kicked :rocket:")
	.setColor("#15f153")
	.addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
	.addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", kReason);

	let kickchannel = message.guild.channels.find(`name`, "logs");
	if(!kickchannel) return message.channel.send("Couldn't find testing channel.");

	message.guild.member(kUser).kick(kReason);

	message.delete().catch(O_o=>{});

	kickchannel.send(kickEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kicks a player from the server.',
  usage: 'kick [@user] [reason]'
};
