import type { Meta, StoryObj } from '@storybook/react';
import { Wallet, ethers } from "ethers";
import { GatewayProtocolPortal } from '../index';

const foundryDefaultPKWithToken = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6"; // One of the 10 default addresses created by foundry. This address has a gateway token
const publicRPC =  new ethers.providers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com	");

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


export const WalletWithToken: Story = {
    args: {
      userWallet: new Wallet(foundryDefaultPKWithToken, publicRPC),
  },
};

export const WalletWithoutToken: Story = {
  args: {
    userWallet: Wallet.createRandom().connect(publicRPC),
  },
};

  