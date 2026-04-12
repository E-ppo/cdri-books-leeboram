import type { BookDocument } from '@/types/books';
import book1Thumbnail from './thumbnails/book1.jpg';
import book2Thumbnail from './thumbnails/book2.jpg';
import book3Thumbnail from './thumbnails/book3.jpg';
import book4Thumbnail from './thumbnails/book4.jpg';

export const sampleBooks: BookDocument[] = [
  {
    authors: ['이보람'],
    contents:
      '『행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를』은 저자의 글을 모아엮은 에세이집이다. 저자의 주옥 같은 작품을 만나볼 수 있다.',
    datetime: '2025-03-05T00:00:00.000+09:00',
    isbn: '1193282217 9791193282212',
    price: 17500,
    publisher: '물결',
    sale_price: 15750,
    status: '정상판매',
    thumbnail: book1Thumbnail,
    title: '행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를',
    translators: [],
    url: 'https://search.daum.net/search?w=bookpage&bookId=6866195',
  },
  {
    authors: ['이보람'],
    contents:
      '섬세한 글귀와 개성 가득한 일상으로 사랑받는 인스타그램 스타 이보람의 첫 에세이『어디쯤인지 모르겠는 오늘』. 이 책은 저자 이보람이 어른으로 가는 길목에서 마주친 섬세한 감정들의 조각이자, 사사로운 일상의 고백이다.',
    datetime: '2017-03-08T00:00:00.000+09:00',
    isbn: '8965962064 9788965962069',
    price: 13000,
    publisher: 'my',
    sale_price: 11700,
    status: '정상판매',
    thumbnail: book2Thumbnail,
    title: '어디쯤인지 모르겠는 오늘',
    translators: [],
    url: 'https://search.daum.net/search?w=bookpage&bookId=921118',
  },
  {
    authors: ['이보람'],
    contents:
      '『교사와 학부모를 위한 학교 폭력 대처법』의 저자 이보람 변호사는 이미 발생한 학교 폭력에 초점을 맞춘다. 학교 폭력이 사라지는 ‘그날’이 오기 전까지 이 문제는 우리 사회가 안고 가야 할 ‘숙제’임이 분명하기 때문이다.',
    datetime: '2017-11-01T00:00:00.000+09:00',
    isbn: '8959406554 9788959406555',
    price: 15000,
    publisher: '시대의창',
    sale_price: 13500,
    status: '정상판매',
    thumbnail: book3Thumbnail,
    title: '교사와 학부모를 위한 학교 폭력 대처법',
    translators: [],
    url: 'https://search.daum.net/search?w=bookpage&bookId=803916',
  },
  {
    authors: ['김찬휘', '김형진', '정치영'],
    contents:
      '대한민국의 장소, 건물, 유적지 등 과거와 현대 모습을 비교할 수 있는 사진이 담겨 있다. 책에 실린 과거 사진은 1971년에 출간된 故 조성봉 선생의 『이것이 한국이다』라는 사진집에서 발췌하였다.',
    datetime: '2024-06-12T00:00:00.000+09:00',
    isbn: '1192373332 9791192373331',
    price: 23000,
    publisher: '인라우드',
    sale_price: 20700,
    status: '정상판매',
    thumbnail: book4Thumbnail,
    title: '같은 장소 다른 추억',
    translators: [],
    url: 'https://search.daum.net/search?w=bookpage&bookId=6653059',
  },
];
