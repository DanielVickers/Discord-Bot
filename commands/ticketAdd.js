const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
  //let ticketLog = message.guild.channels.find('name', 'ticket-logs');

  var channel = message.channel;
  message.delete();
  if(!channel.name.startsWith("ticket")) return;
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
  
  let name = message.guild.member(message.mentions.users.first());
  message.delete();
  if(!name) return message.reply("Please provide a user name");
  var server = message.guild;

  const addEmbed = new Discord.RichEmbed()
  .setColor("#fd3030")
  .setTimestamp()
  .setTitle(`:rocket: Staff Member Added :rocket:`)
  .setDescription(`${name} has landed!`);


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
  await channel.overwritePermissions(name, {
    READ_MESSAGES: true,
  });
  message.delete();
  message.channel.send(addEmbed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'add',
  description: 'Adds a mentioned user to the ticket.',
  usage: 'add [user]'
};
