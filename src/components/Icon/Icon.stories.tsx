import type { Meta, StoryObj } from '@storybook/react-vite'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: ['LikeFill', 'LikeLine'],
    },
    size: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const LikeFill: Story = {
  args: {
    name: 'LikeFill',
    size: 24,
  },
}

export const LikeLine: Story = {
  args: {
    name: 'LikeLine',
    size: 24,
  },
}

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="LikeFill" size={24} />
      <Icon name="LikeLine" size={24} />
    </div>
  ),
}
