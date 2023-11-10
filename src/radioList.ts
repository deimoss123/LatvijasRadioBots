const radioList = {
  'Latvijas Radio 1': {
    img: 'https://www.ulmanbots.lv/images/radio/lr1.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR1/mp4:LR1/playlist.m3u8',
    // url: 'http://lr1mp1.latvijasradio.lv:8012/listen.pls',
    // url: 'http://lr1mp1.latvijasradio.lv:8012/;stream.mp3',
    color: '#e00008',
  },
  'Latvijas Radio 2': {
    img: 'https://www.ulmanbots.lv/images/radio/lr2.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr2a.stream/playlist.m3u8',
    color: '#ffcc00',
  },
  'Latvijas Radio 3': {
    img: 'https://www.ulmanbots.lv/images/radio/lr3.png',
    url: 'https://60766ff53d5e6.streamlock.net/liveALR3/mp4:klasika/playlist.m3u8',
    color: '#000000',
  },
  'Latvijas Radio 4': {
    img: 'https://www.ulmanbots.lv/images/radio/lr4.png',
    url: 'https://5a44e5b800a41.streamlock.net/shoutcast/mp4:lr4a.stream/playlist.m3u8',
    color: '#307fe2',
  },
  'Latvijas Radio 5': {
    img: 'https://www.ulmanbots.lv/images/radio/lr5.png',
    url: 'https://5a44e5b800a41.streamlock.net/pieci/mp4:k2/chunklist_w379784304.m3u8',
    color: '#9464fa',
  },
  'LR Vecās Plates': {
    img: 'https://live.latvijasradio.lv/_next/image?url=https%3A%2F%2Fcdn.pieci.lv%2Fmedia%2Fbranding%2F640%2Fvecas-plates_l.jpg&w=640&q=75',
    url: 'https://5a44e5b800a41.streamlock.net/pieci/mp4:k4/chunklist_w1071824452.m3u8',
    color: '#dfcead',
  },
  'Radio SWH': {
    img: 'https://www.ulmanbots.lv/images/radio/swh.jpg',
    url: 'https://live.radioswh.lv:8443/swhmp3',
    color: '#f67f21',
  },
  'Radio Skonto': {
    img: 'https://www.ulmanbots.lv/images/radio/skonto.jpg',
    url: 'http://stream.radioskonto.lv:8002/stereo',
    color: '#ef3e36',
  },
  'Latgolys Radeja': {
    img: 'https://www.ulmanbots.lv/images/radio/latgales.png',
    url: 'http://195.13.253.51:8000/128_mp3',
    color: '#155f0a',
  },
  'Latvijas Kristigais Radio': {
    img: 'https://www.ulmanbots.lv/images/radio/kristigais.jpg',
    url: 'http://91.228.7.124:7007/;?type=http&nocache=905',
    color: '#643c78',
  },
  'Kurzemes Radio': {
    img: 'https://www.ulmanbots.lv/images/radio/kurzemes.png',
    url: 'http://31.170.16.6:8000/;?type=http&nocache=457',
    color: '#771464',
  },
  'European Hit Radio': {
    img: 'https://www.ulmanbots.lv/images/radio/ehr.png',
    url: 'https://stream2.superfm.lv:8000/ehr.aac',
    color: '#ed1c24',
  },
  'Star FM': {
    img: 'https://www.ulmanbots.lv/images/radio/starfm.png',
    url: 'http://starfm.live.advailo.com/audio/mp3/icecast.audio',
    color: '#ffffff',
  },
  // 'EHR Ziemassvētki': {
  //   img: 'https://www.ulmanbots.lv/images/radio/ehr.png',
  //   url: 'http://stream.europeanhitradio.com:8000/Stream_34.mp3',
  //   color: '#ed1c24',
  // },
} as const satisfies Record<string, { img: string; url: string; color: string }>;

export type RadioName = keyof typeof radioList;

export default radioList;
