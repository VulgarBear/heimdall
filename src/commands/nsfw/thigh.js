const { Command } = require('discord-akairo')
const { get } = require('superagent')

class ThighCommand extends Command {
  constructor () {
    super('thigh', {
      aliases: ['thigh'],
      category: 'nsfw',
      description: {
        content: 'Returns a random result with thighs as the focus.'
      },
      cooldown: 3000,
      ratelimit: 2
    })
  }

  async exec (msg) {
    const nsfwMode = this.client.settings.get(msg.guild.id, 'nsfw', [])
    if (nsfwMode != true || !msg.channel.nsfw) return msg.util.reply(':underage: We gotta go someplace NSFW for this sorta thing.')

    const loading = await this.client.emojis.resolve('541151509946171402')
    const m = await msg.channel.send(`${loading} **You know what I'll take two and a biscuit!**`)

    const { body } = await get('https://nekobot.xyz/api/image?type=thigh')

    const embed = this.client.util.embed()
      .setTitle('Image didn\'t load click here.')
      .setURL(body.message)
      .setColor(process.env.EMBED)
      .setTimestamp()
      .setImage(body.message)
      .setFooter(`Requested by ${msg.author.tag} | NekoBot API`, `${msg.author.displayAvatarURL()}`)

    m.edit({ embed }).then(msg.delete())
  }
}
module.exports = ThighCommand
