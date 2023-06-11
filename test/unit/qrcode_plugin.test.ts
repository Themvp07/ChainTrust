import { Web3, Web3Context, Web3Eth } from 'web3';
import { QRCodePlugin } from '../../src/qrcode_plugin';

describe('QRCodePlugin Tests', () => {
	it('should register QRCodePlugin plugin on Web3Context instance', () => {
		const web3Context = new Web3Context('http://127.0.0.1:8545');
		web3Context.registerPlugin(new QRCodePlugin());
		expect(web3Context.qrcode).toBeDefined();
	})

	it('should register QRCodePlugin plugin on Web3Eth instance', () => {
		const web3Eth = new Web3Eth('http://127.0.0.1:8545');
		web3Eth.registerPlugin(new QRCodePlugin());
		expect(web3Eth.qrcode).toBeDefined();
	});

	describe('QRCodePlugin method tests', () => {
		const requestManagerSendSpy = jest.fn();

		let web3Context: Web3;

		beforeAll(() => {
			web3Context = new Web3('http://127.0.0.1:8545');
			web3Context.registerPlugin(new QRCodePlugin());
			web3Context.qrcode.requestManager.send = requestManagerSendSpy;
		});

		it('should call QRCodePlugin.getQrEthMainnet', async () => {
			const qrData = {
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: '0.1'
			};

			const qr = await web3Context.qrcode.getQrEthereumMainnet(qrData);
			expect(qr).toEqual(expect.stringMatching(/^data:image\/png;base64,/));
		});

		it('should throw an error when calling QRCodePlugin.getQrEthMainnet with incorrect value parameter', async () => {
			const qrData = {
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: 'some ether'
			};

			await expect(web3Context.qrcode.getQrEthereumMainnet(qrData))
				.rejects.toThrow('Provided \'value\' is not a valid amount of Ether: some ether');
		});

		it('should throw an error when calling QRCodePlugin.getQrEthMainnet with incorrect address parameter', async () => {
			const qrData = {
				to: '0xADDRESS7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: '0.1'
			};

			await expect(web3Context.qrcode.getQrEthereumMainnet(qrData))
				.rejects.toThrow('Provided \'to\' address is not a valid Ethereum address');
		});

		it('should call QRCodePlugin.getQrEthereumTestnet', async () => {
			const qrData = {
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: '0.1',
				chainId: 11155111,
			};

			const qr = await web3Context.qrcode.getQrEthereumTestnet(qrData);
			expect(qr).toEqual(expect.stringMatching(/^data:image\/png;base64,/));
		});

		it('should call QRCodePlugin.getQrEthereumMainnetCustomERC20', async () => {
			const qrData = {
				erc20: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // Link Token
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: '0.1'
			};

			const qr = await web3Context.qrcode.getQrEthereumMainnetCustomERC20(qrData);
			expect(qr).toEqual(expect.stringMatching(/^data:image\/png;base64,/));
		});

		it('should throw an error when calling QRCodePlugin.getQrEthereumMainnetCustomERC20 with incorrect erc20 parameter', async () => {
			const qrData = {
				erc20: '0xCHAINLINK514910771AF9Ca656af840dff83E8264EcF986CA', // Link Token
				to: '0x7772fb5804c9C60B76C56aBEEb79f2F6d54519C4',
				value: '0.1'
			};

			await expect(web3Context.qrcode.getQrEthereumMainnetCustomERC20(qrData))
				.rejects.toThrow('Provided \'erc20\' address is not a valid ERC20 Contract address');
		});

		it('should call QRCodePlugin.getQrEthereumTestnetCustomERC20', async () => {
			const qrData = {
				erc20: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Link Token
				to: '0xA8D54c204127177d7b6C9156F7caD31894455607', // Simon's Custom Contract
				value: '1',
				chainId: 11155111,
			};

			const qr = await web3Context.qrcode.getQrEthereumTestnetCustomERC20(qrData);
			console.log (qr);
			expect(qr).toEqual(expect.stringMatching(/^data:image\/png;base64,/));
		});
	});

});