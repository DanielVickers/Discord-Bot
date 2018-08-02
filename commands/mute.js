const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let permMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let permReason = args.join(" ").slice(22);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!permMute) return message.reply("Couldn't find user.");
	if(permMute.hasPermission("MANAGE_MESSAGES")) return message.delete();
	
	message.delete();
	if (permReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	let permRole = message.guild.roles.find(`name`, "Perm Muted");

	if(!permRole){
		try{
			permRole = await message.guild.createRole({
				name: "Perm Muted",
				color: "#000000",
				permissions: []
			})
			await message.guild.channels.forEach(async (channel, id) => {
				channel.overwritePermissions(permRole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
			})
		} catch(e) {
			console.log(e.stack);
		}
	}

	await (permMute.addRole(permRole.id));
	let permEmbed = new Discord.RichEmbed()
	.setDescription(":rocket: User Perm Muted :rocket:")
	.setColor("#15f153")
	.addField("Muted User", `${permMute}`)
	.addField("Muted By", `${message.author}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", permReason);

	let permchannel = message.guild.channels.find(`name`, "logs");
	if(!permchannel) return message.channel.send("Couldn't find testing channel.");

	message.delete().catch(O_o=>{});

	permchannel.send(permEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Permanently mutes a player.',
  usage: 'mute [@user] [reason]'
};