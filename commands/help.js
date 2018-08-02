const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let bicon = client.user.displayAvatarURL;
  let commandList = new Discord.RichEmbed()
  .setTitle(`:rocket: Rocket Raids Commands! :rocket:`)
  .setDescription(`${message.author}, below you can find a list of all the Rocket Raids bot commands.`)
  .addField(`!suggest {your suggestion}`, `This will create a suggestion in the #suggestions channel.`)
  .addField(`!new [optionl: subject]`,`This will create a support ticket, this can be used to solve issues with/on the server.`)
  .addField(`!notify`, `This will toggle your Notification role, this is used instead of @everyone.`)
  .addField(`!report {user} {reason}`, `This will report a user to the staff team.`)
  .addField(`!help`,`This will DM you this list of commands at any point in time.`)
  .setColor("#15f153")
  .setFooter('© Rocket Raids 2018', bicon)
  .setTimestamp();

  let slideDMS = new Discord.RichEmbed()
  .setDescription(`:rocket: ${message.author}, a list of commands has been sent to your inbox. :rocket:`)
  .setColor("#15f153")
  .setFooter('© Rocket Raids 2018', bicon)
  .setTimestamp();

  let botspam = message.guild.channels.find(`name`, "bot-spam");

  message.delete()
  message.author.send(commandList);

  botspam.send(slideDMS);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Sends a list of server commands to a player.',
  usage: 'help'
};