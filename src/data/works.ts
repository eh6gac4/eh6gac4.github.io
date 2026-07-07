export interface Work {
  slug: string;
  title: string;
  date?: string;        // yyyy.MM 形式
  thumbnail?: string;   // TOPのサムネイル
  cover?: string;       // 詳細ページのメイン画像
  tags?: string[];      // カテゴリタグ
  images?: string[];    // 詳細ページのサブ画像
  desktop?: string;     // webレイアウト: デスクトップスクリーンショット
  mobile?: string;      // webレイアウト: モバイルスクリーンショット
}

export const works: Work[] = [
  {
    slug: 'milk-no51',
    title: 'MilK MAGAZINE japon No.51',
    thumbnail: '/images/top/milk_no51.jpg',
    cover: '/images/milk-no51/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no51/spread_01.png',
      '/images/milk-no51/spread_02.png',
      '/images/milk-no51/spread_03.png',
      '/images/milk-no51/spread_04.png',
      '/images/milk-no51/spread_05.png',
      '/images/milk-no51/spread_06.png',
    ],
  },
  {
    slug: 'milk-no50',
    title: 'MilK MAGAZINE japon No.50',
    thumbnail: '/images/top/milk_no50.jpg',
    cover: '/images/milk-no50/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no50/spread_01.png',
      '/images/milk-no50/spread_02.png',
    ],
  },
  {
    slug: 'milk-no49',
    title: 'MilK MAGAZINE japon No.49',
    thumbnail: '/images/top/milk_no49.jpg',
    cover: '/images/milk-no49/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no49/spread_01.png',
      '/images/milk-no49/spread_02.png',
      '/images/milk-no49/spread_03.png',
      '/images/milk-no49/spread_04.png',
      '/images/milk-no49/spread_05.png',
      '/images/milk-no49/spread_06.png',
    ],
  },
  {
    slug: 'milk-no48',
    title: 'MilK MAGAZINE japon No.48',
    thumbnail: '/images/top/milk_no48.jpg',
    cover: '/images/milk-no48/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no48/spread_01.png',
      '/images/milk-no48/spread_02.png',
      '/images/milk-no48/spread_03.png',
    ],
  },
  {
    slug: 'milk-no44',
    title: 'MilK MAGAZINE japon No.44',
    thumbnail: '/images/top/milk_no44.jpg',
    cover: '/images/milk-no44/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no44/spread_01.png',
      '/images/milk-no44/spread_02.png',
      '/images/milk-no44/spread_03.png',
      '/images/milk-no44/spread_04.png',
      '/images/milk-no44/spread_05.png',
      '/images/milk-no44/spread_06.png',
    ],
  },
  {
    slug: 'milk-no43',
    title: 'MilK MAGAZINE japon No.43',
    thumbnail: '/images/top/milk_no43.jpg',
    cover: '/images/milk-no43/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no43/spread_01.png',
      '/images/milk-no43/spread_02.png',
      '/images/milk-no43/spread_03.png',
      '/images/milk-no43/spread_04.png',
      '/images/milk-no43/spread_05.png',
      '/images/milk-no43/spread_06.png',
    ],
  },
  {
    slug: 'milk-no42',
    title: 'MilK MAGAZINE | japon no.42',
    date: '2021.04',
    thumbnail: '/images/top/milk_no42.jpg',
    cover: '/images/milk-no42/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no42/spread_01.jpg',
      '/images/milk-no42/spread_02.jpg',
      '/images/milk-no42/spread_03.jpg',
      '/images/milk-no42/spread_04.jpg',
      '/images/milk-no42/spread_05.jpg',
      '/images/milk-no42/spread_06.jpg',
      '/images/milk-no42/spread_07.jpg',
      '/images/milk-no42/spread_08.jpg',
    ],
  },
  {
    slug: 'milk-web',
    title: 'MilK MAGAZINE japon Web',
    thumbnail: '/images/top/milk_web.jpg',
    tags: ['Web Design'],
    desktop: '/images/milk-web/desktop.jpg',
    mobile: '/images/milk-web/mobile.jpg',
    images: [],
  },
  {
    slug: 'udg',
    title: 'UDG.,co.ltd',
    date: '2021.04',
    thumbnail: '/images/top/udg_co_ltd.jpg',
    cover: '/images/udg/hero.png',
    tags: ['Art Direction', 'Web Design'],
    desktop: '/images/udg/desktop.jpg',
    mobile: '/images/udg/mobile.jpg',
  },
  {
    slug: 'milk-no41',
    title: 'MilK MAGAZINE japon No.41',
    thumbnail: '/images/top/milk_no41.jpg',
    cover: '/images/milk-no41/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no41/spread_01.png',
      '/images/milk-no41/spread_02.png',
      '/images/milk-no41/spread_03.png',
      '/images/milk-no41/spread_04.png',
      '/images/milk-no41/spread_05.png',
      '/images/milk-no41/spread_06.png',
    ],
  },
  {
    slug: 'milk-no40',
    title: 'MilK MAGAZINE japon No.40',
    thumbnail: '/images/top/milk_no40.jpg',
    cover: '/images/milk-no40/cover.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no40/spread_01.png',
      '/images/milk-no40/spread_02.png',
      '/images/milk-no40/spread_03.png',
      '/images/milk-no40/spread_04.png',
      '/images/milk-no40/spread_05.png',
      '/images/milk-no40/spread_06.png',
    ],
  },
  {
    slug: 'milk-no39',
    title: 'MilK MAGAZINE japon No.39',
    thumbnail: '/images/top/milk_no39.jpg',
    tags: ['Editorial Design'],
    images: [
      '/images/milk-no39/spread_01.png',
      '/images/milk-no39/spread_02.png',
      '/images/milk-no39/spread_03.png',
    ],
  },
];
