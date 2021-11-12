export const embedTemplate = (title, description, url = null) => {
  return {
    embeds: [{
      title,
      description,
      thumbnail: { url },
      color: 0x9d2235,
    }],
    allowedMentions: { 'users': [] }
  }
}