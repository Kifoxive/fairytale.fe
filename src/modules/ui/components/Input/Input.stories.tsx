import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from 'assets/icons';

import { Input } from './Input';

const meta = {
    title: 'Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: 'Name' },
};

export const Search: Story = {
    args: { placeholder: 'Search', endIcon: <SearchIcon /> },
};
