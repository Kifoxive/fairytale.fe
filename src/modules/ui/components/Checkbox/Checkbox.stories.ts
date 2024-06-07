import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
    title: 'Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseUnchecked: Story = {
    args: {
        id: 'whatsApp',
        checked: false,
    },
};

export const BaseChecked: Story = {
    args: {
        id: 'whatsApp',
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        id: 'whatsApp',
        checked: 'indeterminate',
    },
};
