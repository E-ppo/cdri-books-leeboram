import ResultCount from '@/components/ResultCount/ResultCount';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
import BookList from '@/components/BookList/BookList';
import { useWishlistStore } from '@/stores/wishlistStore/wishlistStore';
import iconBook from '@/assets/imgs/icon_book.png';

const bookIcon = (
  <img src={iconBook} alt="book" className="w-20 h-20" fetchPriority="high" />
);

export default function WishlistPage() {
  const books = useWishlistStore(state => state.books);

  return (
    <>
      <h2 className="body1-bold sm:title2 font-bold text-black h-7 sm:h-9 mt-10 lg:mt-20">
        내가 찜한 책
      </h2>
      <section className="mt-6 flex flex-col gap-5 xl:gap-9">
        <ResultCount title="찜한 책" count={books.length} />
        {books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <StatusMessage icon={bookIcon} message="찜한 책이 없습니다." className="py-40" />
        )}
      </section>
    </>
  );
}
