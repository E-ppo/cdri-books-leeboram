import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import type { BookItemProps } from './BookList.types';

export default function BookDetailCard({ book }: BookItemProps) {
  const hasDiscount = book.sale_price > 0 && book.sale_price < book.price;

  return (
    <div className="flex gap-6 pl-13.5 pr-4 pt-6 pb-10">
      {/* 1. 이미지 */}
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-[210px] h-[280px] object-cover shrink-0 rounded"
      />

      {/* 2. 책 정보 */}
      <div className="flex flex-col flex-1 min-w-0 gap-3">
        <div className="flex items-center gap-4">
          <h3 className="body1-bold text-primary break-keep-all">{book.title}</h3>
          <span className="body2 text-secondary shrink-0">{book.authors.join(', ')}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="body2-bold text-primary">책 소개</p>
          <p className="text-sm text-secondary line-clamp-3">{book.contents}</p>
        </div>
      </div>

      {/* 3. 가격 및 구매 */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <Accordion.Trigger>
          <Button
            variant="secondary"
            size="sm"
            className="xl:px-5 xl:py-4"
            rightSection={
              <Icon name="ChevronDown" className="rotate-180" size={16} color="gray" />
            }
          >
            상세보기
          </Button>
        </Accordion.Trigger>
        <div className="flex flex-col items-end gap-2">
          {hasDiscount && (
            <span className="text-sm text-subtitle line-through">
              {book.price.toLocaleString()}원
            </span>
          )}
          <span className="body1-bold text-primary">
            {(hasDiscount ? book.sale_price : book.price).toLocaleString()}원
          </span>
          <Button variant="primary" size="sm" onClick={() => window.open(book.url, '_blank')}>
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
