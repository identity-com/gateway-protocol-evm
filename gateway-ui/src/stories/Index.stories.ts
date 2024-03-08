import type { Meta, StoryObj } from '@storybook/react';
import { Wallet } from "ethers";
import { GatewayProtocolPortal } from '../index';

const meta: Meta<typeof GatewayProtocolPortal> = {
    title: 'Example protocol UI',
    component: GatewayProtocolPortal,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      networkName: { defaultValue: 'test', name: "networkName", type: "string" },
    },
};

export default meta;
type Story = StoryObj<typeof GatewayProtocolPortal>;


export const Primary: Story = {
    args: {
      userWallet: Wallet.createRandom(),
    },
  };
  