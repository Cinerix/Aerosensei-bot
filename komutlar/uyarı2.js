const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("Bu komudu kullanmak için **KICK_MEMBERS** sende yetkisi olmalı.")
    const modlog = message.guild.channels.find(channel => channel.name === 'logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Böyle bir kullanıcı bulamıyorum.")
    let reason = args.join(" ").slice(22)
    let muterole = message.guild.roles.find(`name`, "Uyarı 2");
    if(args[0] == "help"){
      message.reply("Kullanımı: c!uyarı1 <kullanıcı> <sebebi>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "logs");
  if (!muteChannel) return message.channel.send('**Lütfen `logs` adında bir yazı kanalı oluşturun**')
  if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Uyarı 2",
                color: "#1aff00",
                permissions: []
            })
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];

    await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Uyarı 2', `https://cdn.pixabay.com/photo/2012/04/14/17/05/warning-34621_960_720.png`)
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField("Sebep", reason ? reason : "Belirtilmemiş")
            .addField('Yetkili', `${mod}`)
            .addField('Uyarı İşlemi', `Tamamlanmıştır`)
            .setColor('#D9D900')
        modlog.send(muteembed)
  
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["Uyarı2", "uyarı2", "uyar2", "Uyarı2"],
    permLevel: 3
  };
  
  exports.help = {
    name: 'uyarı2',
    description: 'Uyarı 2',
    usage: 'Uyarı2'
  };
