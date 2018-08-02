const Discord = require("discord.js");
const ticketAuthors = require('../ticket-authors.json');

exports.run = async (bot, message, args) => {
  var channel = message.channel;
  let authorID = message.guild.member(ticketAuthors[message.channel.name].authorID);
  let ticketName = ticketAuthors[message.channel.name].channel;

  const errorEmbed = new Discord.RichEmbed()
  .setColor("#fd3030")
  .setTimestamp()
  .setTitle(`:rocket: Error :rocket:`)
  .setDescription(`This is not a ticket channel!`)

  message.delete();
  if(!channel.name.startsWith("ticket")) return;

  let staffClose = message.author.username;
  let closeReason = args.slice(0).join(' ');
  if (!closeReason) return message.reply(`Please specify a reason`);

  let closedEmbed = new Discord.RichEmbed()
  .setTitle(`:rocket: ${ticketName} Closed :rocket:`)
  .setColor("#fd3030")
  .setDescription(`${authorID} your support ticket has recently been closed`)
  .addField("Ticket Closed By:", staffClose)
  .addField("Reason For Closing:", closeReason);

  await channel.delete()
 .then(m => {
  authorID.send(closedEmbed)
 })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'close',
  description: 'Closes a ticket.',
  usage: 'closes [(optional) subject]'
};
