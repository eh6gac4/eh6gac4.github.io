export interface Work {
  slug: string;
  title: string;
  date?: string;        // yyyy.MM 形式
  image?: string;       // TOPのサムネイル
  tags?: string[];      // カテゴリタグ
  images?: string[];    // 詳細ページのサブ画像
}

export const works: Work[] = [
  { slug: 'milk-no51', title: 'MilK MAGAZINE japon No.51' },
  { slug: 'milk-no50', title: 'MilK MAGAZINE japon No.50' },
  { slug: 'milk-no49', title: 'MilK MAGAZINE japon No.49' },
  { slug: 'milk-no48', title: 'MilK MAGAZINE japon No.48' },
  { slug: 'milk-no44', title: 'MilK MAGAZINE japon No.44' },
  { slug: 'milk-no43', title: 'MilK MAGAZINE japon No.43' },
  {
    slug: 'milk-no42',
    title: 'MilK MAGAZINE japon no.42',
    date: '2021.04',
    image: '/images/milk-no42/cover.jpg',
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
  { slug: 'milk-web',  title: 'MilK MAGAZINE japon Web' },
  { slug: 'udg',       title: 'UDG.,co.ltd' },
  { slug: 'milk-no41', title: 'MilK MAGAZINE japon No.41' },
  { slug: 'milk-no40', title: 'MilK MAGAZINE japon No.40' },
  { slug: 'milk-no39', title: 'MilK MAGAZINE japon No.39' },
];
