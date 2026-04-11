import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import type { BookItemProps } from './BookList.types';

export default function BookListRow({ book }: BookItemProps) {
  const formattedPrice =
    book.sale_price > 0 ? book.sale_price.toLocaleString() : book.price.toLocaleString();

  return (
    <article className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 md:pl-12 md:pr-4 py-4">
      <div className="flex items-center gap-4 md:gap-12 min-w-0 flex-1">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-10 h-14 xl:w-12 xl:h-17 object-cover shrink-0"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 min-w-0 flex-1">
          <h3 className="body2-bold xl:title3 text-primary truncate min-w-0">{book.title}</h3>
          <span className="text-xs xl:body2 text-secondary shrink-0">
            {book.authors.join(', ')}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 md:gap-14">
        <span className="body2-bold xl:title3 text-primary shrink-0">{formattedPrice}원</span>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="xl:px-7 xl:py-4"
            onClick={() => window.open(book.url, '_blank')}
          >
            구매하기
          </Button>
          <Accordion.Trigger className="flex items-center gap-1 body2 text-subtitle shrink-0">
            <Button
              variant="secondary"
              size="sm"
              className="xl:px-5 xl:py-4"
              rightSection={<Icon name="ChevronDown" size={16} color="gray" />}
            >
              상세보기
            </Button>
          </Accordion.Trigger>
        </div>
      </div>
    </article>
  );
}
