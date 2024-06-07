import type { Meta, StoryObj } from '@storybook/react';

import { UnixDatePicker } from './UnixDatePicker';

const meta = {
    title: 'UnixDatePicker',
    component: UnixDatePicker,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof UnixDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        value: '1617879746453',
        onChange(value) {
            console.log('Call me');
            console.log(value);
        },
    },
};
