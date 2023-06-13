# Web3.js QR Code Plugin

![ES Version](https://img.shields.io/badge/ES-2020-yellow)
![Node Version](https://img.shields.io/badge/node-18.x-green)

This is a [web3.js](https://github.com/web3/web3.js) `4.x` plugin to generate payable QR Codes.

## Prerequisites

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium)

## Installation

```bash
npm i @Themvp07/qr-web3
```
## Using this plugin

### Installing Version `4.x` of `web3`

When adding the `web3` package to your project, make sure to use version `4.x`. You can append `@4.0.2-dev.af57eae.0` tag to install the latest version of 4 that this plugin was tested with:

-   `npm i -S web3@4.0.2-dev.af57eae.0`
-   `yarn add web3@4.0.2-dev.af57eae.0`

> **_NOTE_**  
> If 4.x was already released, you are good to just use `web3` without appending anything to it.

To verify you have the correct `web3` version installed, after adding the package to your project (the above commands), look at the versions listed in your project's `package.json` under the `dependencies` section, it should contain version 4.x similar to:

```json
"dependencies": {
	"web3": "4.0.2-dev.af57eae.0"
}
```
### Registering the Plugin with a web3.js Instance

After importing `QRCodePlugin` from `@Themvp07/qr-web3` and `Web3` from `web3`, register an instance of `QRCodePlugin` with an instance of `Web3` like so:

```typescript
import { QRCodePlugin } from '@Themvp07/qr-web3';
import { Web3 } from 'web3';

const web3 = new Web3('YOUR_PROVIDER_URL');
const qrCodePlugin = new QRCodePlugin();

web3.registerPlugin(qrCodePlugin);
```

More information about registering web3.js plugins can be found [here](https://docs.web3js.org/docs/guides/web3_plugin_guide/plugin_users#registering-the-plugin).

### Plugin Methods

#### Get QR Code to transfer ETH in Ethereum Mainnet

#### `getQrEthereumMainnet`

```typescript
async getQrEthereumMainnet(
		ethMainnetParams: IETHMainnet
	): {
        QRCode // In base64 format
    }
```

#### Get QR Code to transfer ETH in Ethereum Testnet

#### `getQrEthereumTestnet`

```typescript
async getQrEthereumTestnet(
		ethTestnetParams: IETHTestnet
	): {
        QRCode // In base64 format
    }
```

#### Get QR Code for transfer Custom ERC20 Token in Ethereum Mainnet

#### `getQrEthereumMainnetCustomERC20`

```typescript
async getQrEthereumMainnetCustomERC20(
		ethMainnetCustomERC20Params: IETHMainnetCustomERC20
	): {
        QRCode // In base64 format
    }
```

#### Get QR Code for transfer Custom ERC20 Token in Ethereum Mainnet

#### `getQrEthereumTestnetCustomERC20`

```typescript
async getQrEthereumTestnetCustomERC20(
		ethTestnetCustomERC20Params: IETHTestnetCustomERC20
	): {
        QRCode // In base64 format
    }
```

## Example
```typescript
import { QRCodePlugin } from '@Themvp07/qr-web3';
import { Web3 } from 'web3';

const web3 = new Web3('YOUR_PROVIDER_URL');
const qrCodePlugin = new QRCodePlugin();

web3.registerPlugin(qrCodePlugin);

const qrData = {
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4', // SOME ADDRESS TO TRANSFER
				value: '0.1' // SOME VALUE 0.1 ETH
			};

const qr = await web3.qrcode.getQrEthereumMainnet(qrData);
console.log(qr);
```
## Useful links

[base64-to-image-converter](https://codebeautify.org/base64-to-image-converter)
