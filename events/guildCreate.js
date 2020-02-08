const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  '**ST CHAT GÖREVLİSİ sunucunuza eklendi!**',
  '**ST CHAT  GÖREVLİSİ** sunucunuzdaki insanlara kolaylıklar sağlar.',
  'Bot Mert B. tarafından geliştirilmektedir.',
  'Botumuzun özelliklerini öğrenmek için yardım komutunu kullanabilirsin.',
  '**ÖNEMLİ:** Botun kullanması için mod-log kanalı açın ve deneme için',
  'uyarı komutunu kullanın.',
  '',
  `**ST Resmî Discord Sunucusu** https://discord.gg/Dsg6q7Q`,
]

client.on('guildCreate', guild => {
    generalChannel.sendMessage(yeni-gelenler)
	client.user.setGame(prefix + 'yardım | ' + client.guilds.size + ' sunucu | ' + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ' kullanıcı');
})
