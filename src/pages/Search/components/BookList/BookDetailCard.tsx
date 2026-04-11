import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import type { BookItemProps } from './BookList.types';

export default function BookDetailCard({ book }: BookItemProps) {
  const hasDiscount = book.sale_price > 0 && book.sale_price < book.price;
  const bookContents = book.contents || '준비중입니다';

  return (
    <div className="relative flex flex-col md:flex-row px-4 pt-4 pb-6 gap-4 md:gap-0 lg:pl-13.5 lg:pr-4 lg:pt-6 lg:pb-10">
      {/* 상세보기 */}
      <Accordion.Trigger as="div" className="self-end md:absolute md:top-4 md:right-4 lg:top-6">
        <Button
          variant="secondary"
          size="sm"
          className="lg:px-5 lg:py-4"
          rightSection={<Icon name="ChevronDown" className="rotate-180" size={16} color="gray" />}
        >
          상세보기
        </Button>
      </Accordion.Trigger>

      {/* 1. 이미지 + 책 정보 */}
      <div className="flex md:flex-5 lg:flex-none">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-24 h-32 md:w-36 md:h-48 lg:w-52.5 lg:h-70 object-cover shrink-0 rounded mr-4 lg:mr-8"
          />
        ) : (
          <div className="w-24 h-32 md:w-36 md:h-48 lg:w-52.5 lg:h-70 shrink-0 rounded mr-4 lg:mr-8 bg-gray flex items-center justify-center text-subtitle text-sm">
            No Image
          </div>
        )}
        <div className="flex flex-col flex-1 lg:flex-none lg:w-90 min-w-0 gap-4 md:mr-6 lg:mr-12 pt-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <h3 className="title3 text-primary break-keep-all">{book.title}</h3>
            <span className="body2 text-secondary shrink-0">{book.authors.join(', ')}</span>
          </div>
          {/* 책 소개 - md 이상에서만 표시 */}
          <div className="hidden md:flex flex-col gap-3">
            <p className="body2-bold text-primary">책 소개</p>
            <p className="small leading-4 text-secondary">{bookContents}</p>
          </div>
        </div>
      </div>

      {/* 책 소개 - 모바일에서만 표시 */}
      <div className="flex flex-col gap-2 md:hidden">
        <p className="body2-bold text-primary">책 소개</p>
        <p className="small leading-4 text-secondary">{bookContents}</p>
      </div>

      {/* 2. 가격 및 구매 */}
      <div className="flex flex-col items-end md:flex-2 lg:flex-none lg:w-60 md:justify-end">
        <div className="flex items-center gap-2 md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-x-2 md:gap-y-1">
          {hasDiscount && (
            <>
              <span className="small text-subtitle text-right">원가</span>
              <span className="text-sm md:text-lg md:leading-6.5 md:font-[350] text-subtitle line-through text-right">
                {book.price.toLocaleString()}원
              </span>
            </>
          )}
          <span className="small text-subtitle text-right">{hasDiscount ? '할인가' : ''}</span>
          <span className="body2-bold md:title3 text-primary text-right">
            {(hasDiscount ? book.sale_price : book.price).toLocaleString()}원
          </span>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="mt-7"
          onClick={() => window.open(book.url, '_blank')}
        >
          구매하기
        </Button>
      </div>
    </div>
  );
}
