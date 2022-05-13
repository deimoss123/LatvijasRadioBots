export default function embedTemplate(config) {
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
      description,
      thumbnail: { url },
      color,
      fields
    }],
    allowedMentions: { 'users': [] }
  }
}