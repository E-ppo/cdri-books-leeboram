import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from './SearchBar';
import type {
  SearchBarClassNames,
  SearchHistoryItem,
  SearchParams,
  SearchBarSize,
  SearchBarVariant,
} from './SearchBar.types';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies SearchBarSize[],
      description: '검색바 크기',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'] satisfies SearchBarVariant[],
      description: '검색바 스타일',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

function InteractiveSearchBar({
  size,
  variant,
  initialHistory = [],
  classNames,
}: {
  size?: SearchBarSize;
  variant?: SearchBarVariant;
  initialHistory?: SearchHistoryItem[];
  classNames?: SearchBarClassNames;
}) {
  const [keyword, setKeyword] = useState('');
  const [history, setHistory] = useState<SearchHistoryItem[]>(initialHistory);

  const handleSearch = (params: SearchParams) => {
    setKeyword(params.keyword);

    const isDuplicate = history.some(
      h => h.keyword === params.keyword && h.category === params.category
    );
    if (isDuplicate) return;

    setHistory(prev => [
      {
        id: crypto.randomUUID(),
        keyword: params.keyword,
        category: params.category,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  return (
    <SearchBar
      keyword={keyword}
      onKeywordChange={setKeyword}
      onSearch={handleSearch}
      searchHistory={history}
      onDeleteHistory={handleDelete}
      size={size}
      variant={variant}
      classNames={classNames}
    />
  );
}

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'filled',
  },
  render: ({ size, variant }) => <InteractiveSearchBar size={size} variant={variant} />,
};

export const Outlined: Story = {
  args: {
    size: 'md',
    variant: 'outlined',
  },
  render: ({ size, variant }) => <InteractiveSearchBar size={size} variant={variant} />,
};

export const WithHistory: Story = {
  args: {
    size: 'md',
    variant: 'filled',
  },
  render: ({ size, variant }) => (
    <InteractiveSearchBar
      size={size}
      variant={variant}
      initialHistory={[
        { id: '1', keyword: '노르웨이 숲', category: '제목', timestamp: Date.now() },
        { id: '2', keyword: '무라카미 하루키', category: '저자명', timestamp: Date.now() - 1000 },
      ]}
    />
  ),
};

export const CustomClassNames: Story = {
  args: {
    size: 'md',
    variant: 'filled',
  },
  render: ({ size, variant }) => (
    <InteractiveSearchBar
      size={size}
      variant={variant}
      initialHistory={[
        { id: '1', keyword: '노르웨이 숲', category: '제목', timestamp: Date.now() },
      ]}
      classNames={{
        root: 'rounded-none',
        input: 'font-bold',
        history: 'italic',
      }}
    />
  ),
};
