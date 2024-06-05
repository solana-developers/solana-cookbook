import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { provideWalletAdapter, WalletStore } from "@heavy-duty/wallet-adapter";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

@Component({
  standalone: true,
  selector: "hd-root",
  template: `
    <main>
      <header>
        <h1>Wallet Adapter Example (Raw)</h1>
      </header>

      <section>
        <div>
          <p>
            Wallet:
            <ng-container *ngIf="wallet$ | async as wallet; else noneWallet">
              {{ wallet.adapter.name }}
            </ng-container>
            <ng-template #noneWallet> None </ng-template>
          </p>

          <p *ngIf="publicKey$ | async as publicKey">
            Public Key: {{ publicKey.toBase58() }}
          </p>

          <p>
            Status: {{ (connected$ | async) ? "connected" : "disconnected" }}
          </p>
        </div>
      </section>
    </main>
  `,
  imports: [NgIf, AsyncPipe],
  providers: [
    provideWalletAdapter({
      autoConnect: false,
      adapters: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    }),
  ],
})
export class AppComponent {
  private readonly _walletStore = inject(WalletStore);

  readonly connected$ = this._walletStore.connected$;
  readonly publicKey$ = this._walletStore.publicKey$;
  readonly wallet$ = this._walletStore.wallet$;
}
