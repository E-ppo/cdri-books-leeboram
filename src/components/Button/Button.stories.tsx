import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import Icon from '@/components/Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '버튼',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: '버튼',
    variant: 'outline',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 w-80">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

type WithIconArgs = {
  children: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  iconName: string;
  iconPosition: 'left' | 'right';
};

export const WithIcon: StoryObj<WithIconArgs> = {
  argTypes: {
    iconName: {
      control: 'select',
      options: ['Search', 'Close', 'ChevronDown', 'LikeFill', 'LikeLine'],
      description: '아이콘 종류',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconName: 'Search',
    iconPosition: 'left',
  },
  render: ({ children, variant, size, disabled, iconName, iconPosition }) => {
    const icon = <Icon name={iconName as 'Search'} size={size === 'sm' ? 14 : 16} />;

    return (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        leftSection={iconPosition === 'left' ? icon : undefined}
        rightSection={iconPosition === 'right' ? icon : undefined}
      >
        {children}
      </Button>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};
