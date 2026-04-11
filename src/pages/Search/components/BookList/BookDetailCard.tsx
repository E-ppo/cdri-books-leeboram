import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import type { BookItemProps } from './BookList.types';

export default function BookDetailCard({ book }: BookItemProps) {
  const hasDiscount = book.sale_price > 0 && book.sale_price < book.price;

  return (
    <div className="flex gap-6 bg-light-gray rounded-lg p-6">
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-28 h-40 object-cover shrink-0 rounded"
      />
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="body1-bold text-primary">{book.title}</h3>
            <span className="body2 text-secondary">{book.authors.join(', ')}</span>
          </div>
          <Accordion.Trigger className="flex items-center gap-1 body2 text-subtitle shrink-0">
            상세보기
            <Icon name="ChevronDown" size={16} className="rotate-180" />
          </Accordion.Trigger>
        </div>

        <div className="mt-1">
          <p className="body2-bold text-primary mb-1">책 소개</p>
          <p className="text-sm text-secondary line-clamp-3">{book.contents}</p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-auto">
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-sm text-subtitle line-through">
                {book.price.toLocaleString()}원
              </span>
            )}
            <span className="body1-bold text-primary">
              {(hasDiscount ? book.sale_price : book.price).toLocaleString()}원
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(book.url, '_blank')}
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
