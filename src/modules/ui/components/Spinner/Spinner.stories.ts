import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta = {
    title: 'Spinner',
    component: Spinner,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {},
};

export const FullScreen: Story = {
    args: {
        fullScreen: true,
    },
};
