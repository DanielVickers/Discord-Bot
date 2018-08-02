const Discord = require("discord.js");
const fs = require('fs');
const ticketAuthors = require('../ticket-authors.json');
exports.run = (bot, message, args) => {

  let hTeam = message.guild.roles.find('name', "Helper");
  let mTeam = message.guild.roles.find('name', "Moderator");
  let davi = message.guild.roles.find('name', 'Owner');
  let ticketCat = message.guild.channels.find(`name`, 'ticket-creation');


  message.delete();
  if(message.channel.id !== "466728211481362452") return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you cannot use this command in this channel please post it in <#466728211481362452>.`).then(msg => {
    msg.delete(10000)
  });

  var ticketID = Math.floor(Math.random() * 150000) + 500;
  var name = message.author;
  var server = message.guild;

  const ticketMessage = new Discord.RichEmbed()
  .setColor("#fd3030")
  .setTimestamp()
  .setTitle(`:rocket: New Ticket! :rocket:`)
  .setDescription(`Hello ${name}, \n\nThank you for opening a ticket, one of our staff team will be along to assist you shortly. Please make sure that you have your IGN ready and in the case of a buycraft issue, evidence of purchase. \n\nPlease note that <#455691673813385219> still apply to our tickets and we would appreciate if you followed them as our staff are only trying to help. \n\nThank you for your patience.`);

  const embed = new Discord.RichEmbed()
      .setColor("#fd3030")
      .setTimestamp()
      .setTitle(`:rocket: Ticket Created :rocket:`)
      .setDescription(`${name} your ticket has been created. Your ticket ID is (ticket-${ticketID})`);

  server.createChannel(`Ticket-${ticketID}`, 'text', [
    {
    id: server.id,
    deny: ['READ_MESSAGES'],
    },
    {
      id: name.id,
      allow: ['READ_MESSAGES'],
    },
    {
      id: hTeam.id,
      allow: ['READ_MESSAGES'],
    },
    {
      id: mTeam.id,
      allow: ['READ_MESSAGES'],
    },
    {
      id: davi.id,
      allow: ['READ_MESSAGES'],
    }
  ]).then(message => {
    message.send(ticketMessage).then(message => {
      message.channel.setParent(`${ticketCat.id}`);
    })
  });

  let ticketName = `ticket-${ticketID}`;

  message.channel.send(embed)
  .then(i => {
    ticketAuthors [ticketName] = {
      authorID: message.author.id,
      author: message.author.username,
      channel: ticketName
    }
    fs.writeFile ("./ticket-authors.json", JSON.stringify (ticketAuthors, null, 4)), err => {
      if (err) console.log("File Writing Error");
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'new',
  description: 'Opens a ticket.',
  usage: 'new [(optional) subject]'
};
