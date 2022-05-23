export default function ephemeralReply(description) {
  return {
    embeds: [{
      description,
      color: '#ffffff'
    }],
    ephemeral: true
  }
}