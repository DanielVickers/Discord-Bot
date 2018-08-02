const Discord = require('discord.js');
exports.run = (client, message, args) => {

  message.delete();
  if(message.channel.id !== "466332994970583050") return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you cannot use this command in this channel please post it in <#466332994970583050>.`).then(msg => {
    msg.delete(10000)
  });

  let s = args.slice(0).join(' ');
  let logchannel = message.guild.channels.find('name', 'suggestions');
  if (!logchannel) return message.channel.send(`Cannot locate suggestions channel, ${message.author}`);
  if (s.length < 1) return message.reply('Please state a valid suggestion').then(message => {
    message.delete(10000);
  });

  const embed = new Discord.RichEmbed()
  .setColor("#fd3030")
  .setTimestamp()
  .setTitle(`:rocket: Suggested By: ${message.author.username} :rocket:`)
  .setDescription(`${s}`);
  message.delete().catch(O_o=>{});

  message.channel.send(`Thank you for your suggestion, ${message.author}`).then(msg => {
    msg.delete(5000);
  })
  return client.channels.get(`${logchannel.id}`).send(embed).then(function (message) {
    message.react('✅').then(() => message.react('❎'));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'suggest',
  description: 'Creates a suggestion.',
  usage: 'suggestion [suggestion]'
};
