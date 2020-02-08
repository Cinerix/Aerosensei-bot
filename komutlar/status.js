const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username)
            .setTitle("**BOTUN ÇALIŞTIĞI BİLGİSAYARIN ÖZELLİKLERİ**")
            .setColor("RANDOM")
            .addField("• Ram Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("• Çalışma Süresi ", `${duration}`, true)
            .addField("• Kullanıcılar", `${bot.users.size.toLocaleString()}`, true)
            .addField("• Serverlar", `${bot.guilds.size.toLocaleString()}`, true)
            .addField("• Kanallar ", `${bot.channels.size.toLocaleString()}`, true)
            .addField("• Discord.js", `v${version}`, true)
            .addField("• Node", `${process.version}`, true)
            .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("• Kullanılan CPU", `\`${percent.toFixed(2)}%\``, true)
            .addField("• Bit", `\`${os.arch()}\``, true)
            .addField("• Platform", `\`\`${os.platform()}\`\``, true)
            .addField("• Gecikme", `${Math.round(bot.ping)}ms`, true)  
            .addField("Tüm Haklarımız Saklıdır Herhangi Bir Çalınma Vb. Eylemlerde Mahkemeye Verilicektir! ©")
        message.channel.send(embedStats)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bot',
    description: 'Botun Açık Olduğu Bilgisayarı Gösterir!',
    usage: 'bot'
  };
