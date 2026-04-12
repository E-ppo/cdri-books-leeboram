import type { Meta, StoryObj } from '@storybook/react-vite';
import BookList from './BookList';
import { useWishlistStore } from '@/stores/wishlistStore';
import { sampleBooks } from './__fixtures__/books';

const meta: Meta<typeof BookList> = {
  title: 'Components/BookList',
  component: BookList,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div className="mx-auto max-w-240">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookList>;

const resetWishlist = (isbns: string[] = []) => {
  useWishlistStore.setState({
    books: sampleBooks.filter(b => isbns.includes(b.isbn)),
  });
};

export const Default: Story = {
  decorators: [
    Story => {
      resetWishlist();
      return <Story />;
    },
  ],
  args: {
    books: sampleBooks,
  },
};

export const Single: Story = {
  decorators: [
    Story => {
      resetWishlist();
      return <Story />;
    },
  ],
  args: {
    books: [sampleBooks[0]],
  },
};

export const Empty: Story = {
  decorators: [
    Story => {
      resetWishlist();
      return <Story />;
    },
  ],
  args: {
    books: [],
  },
};

export const WithWishlisted: Story = {
  decorators: [
    Story => {
      resetWishlist([sampleBooks[0].isbn, sampleBooks[2].isbn]);
      return <Story />;
    },
  ],
  args: {
    books: sampleBooks,
  },
};
