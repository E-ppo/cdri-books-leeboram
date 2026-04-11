import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion className="w-80 divide-y divide-gray">
      <Accordion.Item value="1" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 1</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 1의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="2" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 2</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 2의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="3" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 3</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 3의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple className="w-80 divide-y divide-gray">
      <Accordion.Item value="1" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 1</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 1의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="2" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 2</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 2의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="3" className="py-4">
        <div className="flex items-center justify-between">
          <span className="body2-bold">아이템 3</span>
          <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
        </div>
        <Accordion.Content className="mt-3 text-sm text-secondary">
          아이템 3의 상세 내용입니다.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const RenderProp: Story = {
  render: () => (
    <Accordion className="w-80 divide-y divide-gray">
      <Accordion.Item value="1">
        {(isOpen) =>
          isOpen ? (
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="body2-bold">아이템 1 상세</span>
                <Accordion.Trigger className="text-sm text-subtitle">닫기</Accordion.Trigger>
              </div>
              <p className="text-sm text-secondary">상세 내용이 보입니다.</p>
            </div>
          ) : (
            <div className="flex items-center justify-between py-4">
              <span className="body2-bold">아이템 1</span>
              <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
            </div>
          )
        }
      </Accordion.Item>

      <Accordion.Item value="2">
        {(isOpen) =>
          isOpen ? (
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="body2-bold">아이템 2 상세</span>
                <Accordion.Trigger className="text-sm text-subtitle">닫기</Accordion.Trigger>
              </div>
              <p className="text-sm text-secondary">상세 내용이 보입니다.</p>
            </div>
          ) : (
            <div className="flex items-center justify-between py-4">
              <span className="body2-bold">아이템 2</span>
              <Accordion.Trigger className="text-sm text-subtitle">상세보기</Accordion.Trigger>
            </div>
          )
        }
      </Accordion.Item>
    </Accordion>
  ),
};
