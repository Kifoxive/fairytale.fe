import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './Typography';

const meta = {
    title: 'Typography',
    component: Typography,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        variant: 'h1',
        children: 'Lorem Ipsum',
    },
};

export const H2: Story = {
    args: {
        variant: 'h2',
        children: 'Lorem Ipsum',
    },
};

export const H3: Story = {
    args: {
        variant: 'h3',
        children: 'Lorem Ipsum',
    },
};

export const H4: Story = {
    args: {
        variant: 'h4',
        children: 'Lorem Ipsum',
    },
};

export const H6: Story = {
    args: {
        variant: 'h6',
        children: 'Lorem Ipsum',
    },
};

export const Subheading: Story = {
    args: {
        variant: 'subheading',
        children: 'Lorem Ipsum',
    },
};

export const P: Story = {
    args: {
        variant: 'p',
        children: 'Lorem Ipsum',
    },
};
