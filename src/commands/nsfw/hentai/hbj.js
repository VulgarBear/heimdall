const { Command } = require('discord-akairo')
const nekoAPI = require('../../../helpers/nekoAPIs')

class HBJCommand extends Command {
  constructor () {
    super('hbj', {
      aliases: ['hentai-blowjob', 'blowjob'],
      category: 'nsfw',
      description: {
        content: 'Returns a random hentai fellatio.'
      },
      cooldown: 3000,
      ratelimit: 2
    })
  }

  async exec (msg) {
    const nsfwMode = this.client.settings.get(msg.guild.id, 'nsfw', [])
    if (nsfwMode !== true || !msg.channel.nsfw) return msg.util.reply(':underage: We gotta go someplace NSFW for this sorta thing.')

    const loading = await this.client.emojis.resolve(process.env.LOADING)
    const m = await msg.channel.send(`${loading} **Anime sucky sucky.**`)

    const searchData = await nekoAPI.nekoLife('bj')

    const embed = this.client.util.embed()
      .setTitle('Image didn\'t load click here.')
      .setURL(searchData.url)
      .setColor(process.env.EMBED)
      .setTimestamp()
      .setImage(searchData.url)
      .setFooter(`Requested by ${msg.author.tag} | NekoBot API`, `${msg.author.displayAvatarURL()}`)

    msg.channel.send({ embed })
      .then(msg.delete())
      .then(m.delete())
  }
}
module.exports = HBJCommand
