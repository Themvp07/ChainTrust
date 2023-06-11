import { Web3, Web3PluginBase, validator } from 'web3';
import { ChainId, IETHMainnet, IETHMainnetCustomERC20, IETHTestnet, IETHTestnetCustomERC20, } from './types';
import QRCode from 'qrcode';

export class QRCodePlugin extends Web3PluginBase {
  public pluginNamespace: string;

  public constructor(options?: {
    pluginNamespace?: string;
  }) {
    super();
    this.pluginNamespace = options?.pluginNamespace ?? 'qrcode';
  }

  /**
   * 
   * Generates a QR code according to EIP-681 ("URI Scheme to facilitate ERC20 token payments").
   * The QR code represents a URI for an Ethereum transaction on the mainnet.
   *
   * @returns A QR code as a string, which encodes a URI for an Ethereum transaction on the mainnet according to EIP-681.
   */
  public async getQrEthereumMainnet(ethMainnetParams: IETHMainnet) {
    try {
      const { to, value } = ethMainnetParams;

      if (!validator.isAddress(to)) {
        throw new Error(
          `Provided 'to' address is not a valid Ethereum address: ${to}`,
        );
      }

      if (typeof value !== 'string' || isNaN(Number(value)) || Number(value) < 0) {
        throw new Error(
          `Provided 'value' is not a valid amount of Ether: ${value}`,
        );
      }

      let valueWei = Web3.utils.toWei(value, 'ether');
      const qrData = `ethereum:${to}@${ChainId.MAINNET}?value=${valueWei}`;

      const qr = await QRCode.toDataURL(qrData);
      return qr;

    } catch (error) {
      throw error;
    }
  }


  /**
   * 
   * Generates a QR code according to EIP-681 ("URI Scheme to facilitate ERC20 token payments").
   * The QR code represents a URI for an Ethereum transaction on the testnet.
   *
   * @returns A QR code as a string, which encodes a URI for an Ethereum transaction on the testnet according to EIP-681.
   */
  public async getQrEthereumTestnet(ethTestnetParams: IETHTestnet) {
    try {
      const { to, value, chainId } = ethTestnetParams;

      if (!validator.isAddress(to)) {
        throw new Error(
          `Provided 'to' address is not a valid Ethereum address: ${to}`,
        );
      }

      if (typeof value !== 'string' || isNaN(Number(value)) || Number(value) < 0) {
        throw new Error(
          `Provided 'value' is not a valid amount of Ether: ${value}`,
        );
      }

      if (typeof chainId !== 'number' || chainId < 0) {
        throw new Error(
          `Provided 'chainId' is not a valid chainId: ${chainId}`,
        );
      }

      let valueWei = Web3.utils.toWei(value, 'ether');
      const qrData = `ethereum:${to}@${chainId}?value=${valueWei}`;

      const qr = await QRCode.toDataURL(qrData);
      return qr;

    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * Generates a QR code according to EIP-681 ("URI Scheme to facilitate ERC20 token payments").
   * The QR code represents a URI for an Ethereum transaction on the mainnet.
   *
   * @returns A QR code as a string, which encodes a URI for an Ethereum transaction on the mainnet for ERC20 according to EIP-681.
   */
  public async getQrEthereumMainnetCustomERC20(ethMainnetCustomERC20Params: IETHMainnetCustomERC20) {
    try {
      const { erc20, to, value } = ethMainnetCustomERC20Params;

      if (!validator.isAddress(erc20)) {
        throw new Error(
          `Provided 'erc20' address is not a valid ERC20 Contract address: ${erc20}`,
        );
      }

      if (!validator.isAddress(to)) {
        throw new Error(
          `Provided 'to' address is not a valid Ethereum address: ${to}`,
        );
      }

      if (typeof value !== 'string' || isNaN(Number(value)) || Number(value) < 0) {
        throw new Error(
          `Provided 'value' is not a valid amount of Ether: ${value}`,
        );
      }

      let valueWei = Web3.utils.toWei(value, 'ether');
      const qrData = `ethereum:${erc20}@${ChainId.MAINNET}/transfer?address=${to}&uint256=${valueWei}`;

      const qr = await QRCode.toDataURL(qrData);
      return qr;

    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * Generates a QR code according to EIP-681 ("URI Scheme to facilitate ERC20 token payments").
   * The QR code represents a URI for an Ethereum transaction on the testnet.
   *
   * @returns A QR code as a string, which encodes a URI for an Ethereum transaction on the testnet for ERC20 according to EIP-681.
   */
  public async getQrEthereumTestnetCustomERC20(ethTestnetCustomERC20Params: IETHTestnetCustomERC20) {
    try {
      const { erc20, to, value, chainId } = ethTestnetCustomERC20Params;

      if (!validator.isAddress(erc20)) {
        throw new Error(
          `Provided 'erc20' address is not a valid ERC20 Contract address: ${erc20}`,
        );
      }

      if (!validator.isAddress(to)) {
        throw new Error(
          `Provided 'to' address is not a valid Ethereum address: ${to}`,
        );
      }

      if (typeof value !== 'string' || isNaN(Number(value)) || Number(value) < 0) {
        throw new Error(
          `Provided 'value' is not a valid amount of Ether: ${value}`,
        );
      }

      if (typeof chainId !== 'number' || chainId < 0) {
        throw new Error(
          `Provided 'chainId' is not a valid chainId: ${chainId}`,
        );
      }

      let valueWei = Web3.utils.toWei(value, 'ether');
      const qrData = `ethereum:${erc20}@${chainId}/transfer?address=${to}&uint256=${valueWei}`;

      const qr = await QRCode.toDataURL(qrData);
      return qr;

    } catch (error) {
      throw error;
    }
  }

}

// Module Augmentation
declare module 'web3' {
  interface Web3Context {
    qrcode: QRCodePlugin;
  }
}