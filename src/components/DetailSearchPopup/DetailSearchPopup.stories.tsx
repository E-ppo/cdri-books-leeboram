import type { Meta, StoryObj } from '@storybook/react-vite';
import DetailSearchPopup from './DetailSearchPopup';
import { SEARCH_CATEGORIES } from '@/components/SearchBar/SearchBar.types';
import type { DetailSearchPopupPlacement } from './DetailSearchPopup.types';

const meta: Meta<typeof DetailSearchPopup> = {
  title: 'Components/DetailSearchPopup',
  component: DetailSearchPopup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'bottom',
        'bottom-left',
        'bottom-right',
        'top',
        'top-left',
        'top-right',
        'left',
        'right',
      ] satisfies DetailSearchPopupPlacement[],
      description: '팝업 위치',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailSearchPopup>;

export const Default: Story = {
  args: {
    categories: SEARCH_CATEGORIES,
    onSearch: params => console.log('onSearch', params),
    placement: 'bottom-left',
  },
};

export const Placements: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-16" style={{ minHeight: 500 }}>
      <DetailSearchPopup placement="bottom-left" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
      <DetailSearchPopup placement="bottom-right" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
      <DetailSearchPopup placement="top-left" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
      <DetailSearchPopup placement="top-right" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
      <DetailSearchPopup placement="left" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
      <DetailSearchPopup placement="right" categories={SEARCH_CATEGORIES} onSearch={params => console.log('onSearch', params)} />
    </div>
  ),
};
