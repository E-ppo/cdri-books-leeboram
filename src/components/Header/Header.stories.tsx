import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'CERTICOS BOOKS',
    navItems: [
      { to: '/', label: '도서 검색' },
      { to: '/wishlist', label: '내가 찜한 책' },
    ],
  },
};
