const Discord = require("discord.js");
const ms = require("ms");
exports.run = async (client, message, args) => {
	let tempMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let tempmuteReason = args.join(" ").slice(25);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!tempMute) return message.reply("Couldn't find user.");
	if(tempMute.hasPermission("MANAGE_MESSAGES")) return message.delete();
	
	message.delete();
	if (tempmuteReason.length < 1) return message.reply('Please state a valid reason').then(message => {
    	message.delete(10000);
	});

	let muteRole = message.guild.roles.find(`name`, "Temp Mute");

	if(!muteRole){
		try{
			muteRole = await message.guild.createRole({
				name: "Temp Mute",
				color: "#000000",
				permissions: []
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muteRole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
			})
		} catch(e) {
			console.log(e.stack);
		}
	}

	let muteTime = args[1];
	if(!muteTime) return message.reply("That is not a time period.");

	await(tempMute.addRole(muteRole.id));
	let tempEmbed = new Discord.RichEmbed()
	.setDescription(":rocket: User Temp Muted :rocket:")
	.setColor("#15f153")
	.addField("Muted User", `${tempMute}`)
	.addField("Muted By", `${message.author}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", tempmuteReason)
	.addField("Length", `${muteTime}`);

	let tempchannel = message.guild.channels.find(`name`, "logs");
	if(!tempchannel) return message.channel.send("Couldn't find testing channel.");

	message.delete().catch(O_o=>{});

	tempchannel.send(tempEmbed);

	setTimeout(function(){
		tempMute.removeRole(muteRole.id);
		tempchannel.send(`${tempMute} mute has expired.`);
	}, ms(muteTime));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tempmute',
  description: 'Temporarily mutes a player.',
  usage: 'tempmute [@user] [s/m/d] [reason]'
};
