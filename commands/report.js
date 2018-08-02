const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
	let rReason = args.join(" ").slice(22);

	message.delete();
	if (rReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	message.delete().catch(O_o=>{});
	let reportEmbed = new Discord.RichEmbed()
	.setDescription(":rocket: User Reported :rocket:")
	.setColor("#15f153")
	.addField("Reported User", `${rUser}`)
	.addField("Reported By", `${message.author}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", rReason);

	let reportschannel = message.guild.channels.find(`name`, "logs");
	if(!reportschannel) return message.channel.send("Couldn't find testing channel.");

	message.delete().catch(O_o=>{});

	reportschannel.send(reportEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'report',
  description: 'Reports a user to the staff team.',
  usage: 'report [@user] [reason]'
};
