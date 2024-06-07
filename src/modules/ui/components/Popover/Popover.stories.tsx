import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from 'assets/icons';

import { Popover } from './Popover';

const meta = {
    title: 'Popover',
    component: Popover,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        label: 'search popover',
        Icon: <SearchIcon />,
        children: <div>Example Popover</div>,
    },
};
