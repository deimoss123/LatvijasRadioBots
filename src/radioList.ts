const radioList = {
  'Latvijas Radio 1': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr1.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR1/mp4:LR1/playlist.m3u8',
    color: '#e00008',
  },
  'Latvijas Radio 2': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr2.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr2a.stream/playlist.m3u8',
    color: '#ffcc00',
  },
  'Latvijas Radio 3': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr3.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR3/mp4:klasika/playlist.m3u8',
    color: '#000000',
  },
  'Latvijas Radio 4': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr4.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr4a.stream/playlist.m3u8',
    color: '#307fe2',
  },
  'Latvijas Radio 5': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr5.png',
    url: 'https://5a44e5b800a41.streamlock.net/pieci/mp4:k2/chunklist_w379784304.m3u8',
    color: '#9464fa',
  },
  // 'EHR Ziemassvētki': {
  //   img: 'https://www.ulmanbots.lv/images/radio/ehr.png',
  //   url: 'http://stream.europeanhitradio.com:8000/Stream_34.mp3',
  //   color: '#ed1c24',
  // },
  'LR Vecās Plates': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/lr-vecas-plates.jpg',
    url: 'https://5a44e5b800a41.streamlock.net/pieci/mp4:k4/chunklist_w1071824452.m3u8',
    color: '#dfcead',
  },
  'Radio SWH': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/swh.jpg',
    url: 'https://live.radioswh.lv:8443/swhmp3',
    color: '#f67f21',
  },
  'Radio SWH Rock': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/swh-rock.png',
    url: 'https://live.radioswh.lv:8443/rockmp3',
    color: '#c93440',
  },
  'Radio Skonto': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/skonto.jpg',
    url: 'http://stream.radioskonto.lv:8002/stereo',
    color: '#ef3e36',
  },
  'Latgolys Radeja': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/latgales.png',
    url: 'http://195.13.253.51:8000/128_mp3',
    color: '#155f0a',
  },
  // 'Latvijas Kristigais Radio': {
  //   img: 'https://www.ulmanbots.lv/images/radio/kristigais.jpg',
  //   url: 'http://91.228.7.124:7007/;?type=http&nocache=905',
  //   color: '#643c78',
  // },
  'Kurzemes Radio': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/kurzemes.png',
    url: 'http://31.170.16.6:8000/;?type=http&nocache=457',
    color: '#771464',
  },
  'European Hit Radio': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/ehr.png',
    url: 'https://stream2.superfm.lv:8000/ehr.aac',
    color: '#ed1c24',
  },
  'Star FM': {
    img: 'https://raw.githubusercontent.com/deimoss123/LatvijasRadioBots/dev/assets/full/starfm.png',
    url: 'http://starfm.live.advailo.com/audio/mp3/icecast.audio',
    color: '#ffffff',
  },
} as const satisfies Record<string, { img: string; url: string; color: string }>;

export type RadioName = keyof typeof radioList;

export default radioList;
