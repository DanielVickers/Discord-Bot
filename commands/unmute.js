const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let unmuteMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let unmuteReason = args.join(" ").slice(22);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!unmuteMute) return message.reply("Couldn't find user.");
	if(unmuteMute.hasPermission("MANAGE_MESSAGES")) return message.delete();
	
	message.delete();
	if (unmuteReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	let logchannel = message.guild.channels.find(`name`, "logs");
	let unmutePermRole = unmuteMute.roles.find(`name`, "Perm Muted");
	let unmuteTempRole = unmuteMute.roles.find(`name`, "Temp Mute");
	message.delete();
	if (unmutePermRole) {
		try {
			unmuteMute.removeRole(unmutePermRole.id);
			logchannel.send(`${unmuteMute} has had their perm mute revoked for ${unmuteReason}.`);
		} catch(e) {
			console.log(e.stack);
		}
	} else if (unmuteTempRole) {
		try{
			unmuteMute.removeRole(unmuteTempRole.id);
			logchannel.send(`${unmuteMute} has had their temp mute revoked for ${unmuteReason}.`);
		} catch(e) {
			console.log(e.stack);
		}
	}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unmute',
  description: 'Unmutes a previously muted player.',
  usage: 'unmute [@user] [reason]'
};
