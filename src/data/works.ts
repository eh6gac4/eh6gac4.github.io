export interface Work {
  slug: string;
  title: string;
  date?: string;        // yyyy.MM 形式
  thumbnail?: string;   // TOPのサムネイル
  cover?: string;       // 詳細ページのメイン画像
  tags?: string[];      // カテゴリタグ
  images?: string[];    // 詳細ページのサブ画像
}

export const works: Work[] = [
  { slug: 'milk-no51', title: 'MilK MAGAZINE japon No.51' },
  { slug: 'milk-no50', title: 'MilK MAGAZINE japon No.50', thumbnail: '/images/top/milk_no50.jpg' },
  { slug: 'milk-no49', title: 'MilK MAGAZINE japon No.49', thumbnail: '/images/top/milk_no49.jpg' },
  { slug: 'milk-no48', title: 'MilK MAGAZINE japon No.48', thumbnail: '/images/top/milk_no48.jpg' },
  { slug: 'milk-no44', title: 'MilK MAGAZINE japon No.44', thumbnail: '/images/top/milk_no44.jpg' },
  { slug: 'milk-no43', title: 'MilK MAGAZINE japon No.43', thumbnail: '/images/top/milk_no43.jpg' },
  {
    slug: 'milk-no42',
    title: 'MilK MAGAZINE japon no.42',
    date: '2021.04',
    thumbnail: '/images/top/milk_no42.jpg',
    cover: '/images/milk-no42/cover.jpg',
    tags: ['Editorial Design', 'Web Design'],
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
  { slug: 'milk-web',  title: 'MilK MAGAZINE japon Web',  thumbnail: '/images/top/milk_web.jpg' },
  { slug: 'udg',       title: 'UDG.,co.ltd',              thumbnail: '/images/top/udg_co_ltd.jpg' },
  { slug: 'milk-no41', title: 'MilK MAGAZINE japon No.41', thumbnail: '/images/top/milk_no41.jpg' },
  { slug: 'milk-no40', title: 'MilK MAGAZINE japon No.40', thumbnail: '/images/top/milk_no40.jpg' },
  { slug: 'milk-no39', title: 'MilK MAGAZINE japon No.39', thumbnail: '/images/top/milk_no39.jpg' },
];
