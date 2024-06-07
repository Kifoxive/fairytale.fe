import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup } from './RadioGroup';

const meta = {
    title: 'RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        options: [
            { label: 'Foo', value: 'foo' },
            { label: 'Bar', value: 'bar' },
            { label: 'Alice', value: 'alice' },
            { label: 'Bob', value: 'bob' },
        ],
    },
};
