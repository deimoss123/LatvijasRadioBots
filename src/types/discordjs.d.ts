import '@discordjs/voice';

declare module '@discordjs/voice' {
  interface VoiceConnection {
    player: AudioPlayer;
  }
  interface AudioPlayer {
    radioUrl: string;
  }
}
