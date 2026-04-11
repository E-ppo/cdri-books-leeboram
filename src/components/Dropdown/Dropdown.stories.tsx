import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Dropdown from './Dropdown';

const SAMPLE_OPTIONS = ['제목', '저자명', '출판사'] as const;

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

function InteractiveDropdown({ options }: { options: readonly string[] }) {
  const [value, setValue] = useState(options[0]);

  return <Dropdown value={value} options={options} onChange={setValue} />;
}

export const Default: Story = {
  render: () => <InteractiveDropdown options={SAMPLE_OPTIONS} />,
};
