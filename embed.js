export const embedTemplate = (title, description, url = null, color = 0x000000) => {
  return {
    embeds: [{
      title,
      description,
      thumbnail: { url },
      color,
    }],
    allowedMentions: { 'users': [] }
  }
}