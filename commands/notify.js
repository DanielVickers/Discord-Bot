const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  let notifyRole = message.guild.roles.find("name", "Notifications");
  let bicon = client.user.displayAvatarURL;
  let botspam = message.guild.channels.find(`name`, "bot-spam");

  let optIn = new Discord.RichEmbed()
  .setDescription(`${message.author}, you have been opt-ed ***in*** to receive notifcations.`)
  .setColor("#15f153")
  .setFooter('© Rocket Raids 2018', bicon)
  .setTimestamp();

  let optOut = new Discord.RichEmbed()
  .setDescription(`${message.author}, you have been opt-ed ***out*** to receive notifcations.`)
  .setColor("#15f153")
  .setFooter('© Rocket Raids 2018', bicon)
  .setTimestamp();

  message.delete()
  if(!message.member.roles.has(notifyRole.id))
    {
      message.member.addRole(notifyRole.id);
      botspam.send(optIn);
    }
  else if (message.member.roles.has(notifyRole.id))
    {
      message.member.removeRole(notifyRole.id);
      botspam.send(optOut);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'notify',
  description: 'Toggle the notifications role',
  usage: 'notify'
};
