const okddInv = 'https://discord.gg/8dssPHVR3Z'

export const embedTemplate = config => {
  const {
    title = '',
    description,
    url = null,
    color = 0xffffff,
    fields = []
  } = config

  return {
    embeds: [{
      title,
      //url: okddInv,
      description,
      thumbnail: { url },
      color,
      fields
    }],
    allowedMentions: { 'users': [] }
  }
}