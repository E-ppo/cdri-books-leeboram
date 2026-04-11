import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusMessage from './StatusMessage';
import Icon from '@/components/Icon/Icon';

const meta: Meta<typeof StatusMessage> = {
  title: 'Components/StatusMessage',
  component: StatusMessage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const MessageOnly: Story = {
  args: {
    message: '검색결과가 없습니다.',
  },
};

export const WithTitle: Story = {
  args: {
    title: '페이지를 찾을 수 없습니다',
    message: '요청하신 페이지가 존재하지 않습니다.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon name="Search" size={48} />,
    message: '검색결과가 없습니다.',
  },
};

export const WithIconAndTitle: Story = {
  args: {
    icon: <Icon name="Search" size={48} />,
    title: '서버 오류',
    message: '잠시 후 다시 시도해주세요.',
  },
};

export const WithImage: Story = {
  args: {
    icon: <img src="/src/assets/imgs/icon_book.png" alt="book" className="w-20 h-20" />,
    message: '검색결과가 없습니다.',
  },
};
