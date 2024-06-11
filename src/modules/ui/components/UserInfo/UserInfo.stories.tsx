import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from 'modules/common';

const meta = {
    title: 'UserInfo',
    component: UserInfo,
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={{ background: '#243C53', padding: '2rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        firstName: 'Jindřich',
        lastName: 'Machan',
        email: 'jindra.machan@qapline.com',
        imgSrc: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2776&q=80',
    },
};

export const WithFallbackImage: Story = {
    args: {
        firstName: 'Jindřich',
        lastName: 'Machan',
        email: 'jindra.machan@qapline.com',
    },
};
