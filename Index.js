const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  let staff_role = message.guild.roles.find('name', settings.staff);
  if (staff_role && message.member.roles.has(staff_role.id)) permlvl = 2;
  if (message.author.id === settings.ownerID) permlvl = 3;
  return permlvl;
};

client.on('guildMemberAdd', (guildMember) => {
  let bicon = client.user.displayAvatarURL;
  let welcomeEmbed = new Discord.RichEmbed()
  .setTitle(`:rocket: Welcome to Rocket Raids! :rocket:`)
  .setThumbnail(guildMember.user.displayAvatarURL)
  .setDescription(`${guildMember}, make sure to check out the servers commands and have an amzing time here.`)
  .addField(`Server IP`, `play.rocketraids.com`, true)
  .addField(`Store Address:`,`store.rocketraids.com`, true)
  .addField(`Forum Address:`,`rocketraids.com`, true)
  .addField(`Need A Hand?`, `Use !help for a full list of commands sent straight to your DMs.`, true)
  .setColor("#15f153")
  .setFooter('© Rocket Raids 2018', bicon)
  .setTimestamp();

   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Astronauts"));
   guildMember.guild.channels.get('455690214980190220').send(welcomeEmbed); 
});

client.login(settings.token);