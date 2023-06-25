# Web3.js QR Code Plugin: Simplified Payment QR Code Generation

![ES Version](https://img.shields.io/badge/ES-2020-yellow)
![Node Version](https://img.shields.io/badge/node-18.x-green)

The Web3.js QR Code Plugin is a utility built for web3.js version `4.x` that enables developers to easily generate QR codes for Ethereum transactions. This simplifies the process of initiating payments in your decentralized applications.

## Prerequisites

Ensure you have the following installed:

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium or newer)

## Installation

Use npm to install the Web3.js QR Code Plugin:

```bash
npm i web3.js-qr-plugin
```

## Usage

### Ensuring the Correct web3 Version

Check your `package.json` file under the `dependencies` section. You should see a `4.x` version of web3:

```json
"dependencies": {
	"web3": "4.0.2-dev.af57eae.0"
}
```

### Registering the Plugin

After importing `QRCodePlugin` from `web3.js-qr-plugin` and `Web3` from `web3`, you can register an instance of `QRCodePlugin` with an instance of `Web3`:

```typescript
import { QRCodePlugin } from 'web3.js-qr-plugin';
import { Web3 } from 'web3';

const web3 = new Web3('YOUR_PROVIDER_URL');
const qrCodePlugin = new QRCodePlugin();

web3.registerPlugin(qrCodePlugin);
```

### Plugin Methods

The plugin provides methods for creating QR codes:

Ethereum Mainnet Transfers: `getQrEthereumMainnet`

```typescript
async getQrEthereumMainnet(ethMainnetParams: IETHMainnet): QRCodeString // QR code in base64 format as string
```

Ethereum Testnet Transfers: `getQrEthereumTestnet`

```typescript
async getQrEthereumTestnet(ethTestnetParams: IETHTestnet): QRCodeString // QR code in base64 format as string
```

Custom ERC20 Token Transfers on Ethereum Mainnet: `getQrEthereumMainnetCustomERC20`

```typescript
async getQrEthereumMainnetCustomERC20(ethMainnetCustomERC20Params: IETHMainnetCustomERC20): QRCodeString // QR code in base64 format as string
```

Custom ERC20 Token Transfers on Ethereum Testnet: `getQrEthereumTestnetCustomERC20`

```typescript
async getQrEthereumMainnet(ethTestnetCustomERC20Params: IETHTestnetCustomERC20): QRCodeString // QR code in base64 format as string
```

## Examples

### QR Code for transfer ETH in Testnet
```typescript
import { QRCodePlugin, IETHTestnet, ChainId } from 'web3.js-qr-plugin';
import { Web3 } from 'web3';

const web3 = new Web3('YOUR_PROVIDER_URL');
const qrCodePlugin = new QRCodePlugin();

web3.registerPlugin(qrCodePlugin);

const qrData: IETHTestnet = {
	to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4', // some address to transfer
	value: '0.1', // some value 0.1 eth
	chainId: ChainId.SEPOLIA, // Sepolia testnet chain id
};

const qr = await web3Context.qrcode.getQrEthereumTestnet(qrData);
console.log(qr);
```

### QR Code for transfer Custom ERC20 token in Testnet
```typescript
import { QRCodePlugin, IETHTestnetCustomERC20, ChainId } from 'web3.js-qr-plugin';
import { Web3 } from 'web3';

const web3 = new Web3('YOUR_PROVIDER_URL');
const qrCodePlugin = new QRCodePlugin();

web3.registerPlugin(qrCodePlugin);

const qrData: IETHTestnetCustomERC20 = {
	erc20: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Link Token Contract in Sepolia
	to: '0xA8D54c204127177d7b6C9156F7caD31894455607', // Simon's Custom Contract
	value: '1',	// some value 1 Link Token
	chainId: ChainId.SEPOLIA, // Sepolia testnet chain id
};

const qr = await web3Context.qrcode.getQrEthereumTestnetCustomERC20(qrData);
console.log(qr);
```

## Converting Base64 to Image

The QR codes are returned in base64 format. To convert them into images, you can use an online converter like this [base64-to-image-converter](https://codebeautify.org/base64-to-image-converter).
