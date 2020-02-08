const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("Bu komudu kullanmak için **KICK_MEMBERS** sende yetkisi olmalı.")
    const modlog = message.guild.channels.find(channel => channel.name === 'logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Böyle bir kullanıcı bulamıyorum.")
    let reason = args.join(" ").slice(22)
    if (!user.roles.find(`name`, "Muteli")) return message.channel.send('Bu kullanıcı muteli değil.')
    let muterole = message.guild.roles.find(`name`, "Muteli");
    if(args[0] == "help"){
      message.reply("Kullanımı: c!unmute <kullanıcı> <sebebi>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "logs");
  if (!muteChannel) return message.channel.send('**Lütfen `logs` adında bir yazı kanalı oluşturun**')

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muteli",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  

    let mutetime = args[1];

    await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' EYLEM | Susturmayı Kaldırma', `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`)
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField("Sebep", reason ? reason : "Belirtilmemiş")
            .addField('Yetkili', `${mod}`)
            .setColor('#00FF80')
        modlog.send(muteembed)
  
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["susturaç", "muteaç", "mute aç", "susturma aç"],
    permLevel: 3
  };
  
  exports.help = {
    name: 'unmute',
    description: 'İstediğiniz Kişiye Mute Atarsınız Kaldırmak İçin c!unmute @user',
    usage: 'mute @user '
  };
