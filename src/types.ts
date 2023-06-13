export interface IETHMainnet {
	to: string;
	value: string;
}

export interface IETHMainnetCustomERC20 {
	erc20: string;
	to: string;
	value: string;
}

export interface IETHTestnet {
	to: string;
	value: string;
	chainId: number;
}

export interface IETHTestnetCustomERC20 {
	erc20: string;
	to: string;
	value: string;
	chainId: number;
}

export enum ChainId {
	MAINNET=1,
	SEPOLIA=11155111,
}