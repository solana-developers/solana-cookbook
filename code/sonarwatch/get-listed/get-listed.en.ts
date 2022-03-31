import {
  Platform, BaseAdapter, NetworkId, Asset, AssetCategory, AssetDataGeneric,
} from '@sonarwatch/dashboard-adapter-base';

/**
   * Foo platform
   */
export const FooPlatform:Platform = {
  id: 'foo',
  name: 'Foo Protocol',
  description: 'Foo Protocol is ...',
  logoURI: 'https://foo.io/img/logo.png',
  twitter: 'https://twitter.com/FooProtocol',
  discord: 'https://discord.gg/fooprotocol',
  website: 'https://foo.io/',
};

/**
   * Foo protocol dashboard adapter
   */
export class FooAdapter extends BaseAdapter {
  platform:Platform = FooPlatform;

  async fetchDashboard(address: string): Promise<Asset[]> {
    const assets:Asset[] = [];

    // Your logic here
    // Async stuff...
    await new Promise((r) => { setTimeout(r, 2000); });

    const nftAsset:Asset = {
      owner: address,
      networkId: NetworkId.solana,
      platformId: this.platform.id,
      value: 1,
      category: AssetCategory.deposits,
      data: {
        type: 'generic',
        name: 'Foo asset',
      } as AssetDataGeneric,
    };
    assets.push(nftAsset);

    return assets;
  }
}