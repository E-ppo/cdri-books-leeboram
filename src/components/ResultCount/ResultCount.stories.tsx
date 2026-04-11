import type { Meta, StoryObj } from '@storybook/react-vite';
import ResultCount from './ResultCount';

const meta: Meta<typeof ResultCount> = {
  title: 'Components/ResultCount',
  component: ResultCount,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ResultCount>;

export const SearchResult: Story = {
  args: {
    title: '도서 검색 결과',
    count: 21,
  },
};

export const Bookmarks: Story = {
  args: {
    title: '내가 찜한 책',
    count: 5,
  },
};

export const Empty: Story = {
  args: {
    title: '도서 검색 결과',
    count: 0,
  },
};
