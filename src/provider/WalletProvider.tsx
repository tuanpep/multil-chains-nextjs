'use client'
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { defaultEndpoint, defaultNetWork, useAppStore } from '@/store/useAppStore'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ExodusWalletAdapter } from '@solana/wallet-adapter-exodus'
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { SlopeWalletAdapter } from '@solana/wallet-adapter-slope'
import {
  BitgetWalletAdapter,
  BitpieWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolongWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { SolflareWalletAdapter, initialize } from '@solflare-wallet/wallet-adapter'
import { WalletConnectWalletAdapter } from '@walletconnect/solana-adapter'

import { type Adapter, type WalletError } from '@solana/wallet-adapter-base'
import { LedgerWalletAdapter } from './Ledger/LedgerWalletAdapter'

initialize()

const App: FC<PropsWithChildren<any>> = ({ children }) => {
  const [network] = useState<WalletAdapterNetwork>(defaultNetWork)
  const rpcNodeUrl = useAppStore((s: any) => s.rpcNodeUrl)
  const wsNodeUrl = useAppStore((s: any) => s.wsNodeUrl)
  // const [endpoint] = useState<string>(defaultEndpoint)
  const [endpoint, setEndpoint] = useState<string>(rpcNodeUrl || defaultEndpoint)

  const _walletConnect = useMemo(() => {
    const connectWallet: WalletConnectWalletAdapter[] = []
    try {
      connectWallet.push(
        new WalletConnectWalletAdapter({
          network: network as WalletAdapterNetwork.Mainnet,
          options: {
            projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID,
            metadata: {
              name: 'Raydium',
              description: 'Raydium',
              url: 'https://raydium.io/',
              icons: ['https://raydium.io/logo/logo-only-icon.svg']
            }
          }
        })
      )
    } catch (e) {
      // console.error('WalletConnect error', e)
    }
    return connectWallet
  }, [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter({ endpoint }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      ..._walletConnect,
      new GlowWalletAdapter(),
      new TrustWalletAdapter(),
      new MathWalletAdapter({ endpoint }),
      new TokenPocketWalletAdapter(),
      new CoinbaseWalletAdapter({ endpoint }),
      new SolongWalletAdapter({ endpoint }),
      new Coin98WalletAdapter({ endpoint }),
      new SafePalWalletAdapter({ endpoint }),
      new BitpieWalletAdapter({ endpoint }),
      new BitgetWalletAdapter({ endpoint }),
      new ExodusWalletAdapter({ endpoint })
    ],
    [network, endpoint]
  )

  useEffect(() => {
    if (rpcNodeUrl) setEndpoint(rpcNodeUrl)
  }, [rpcNodeUrl])

  const onWalletError = (error: WalletError, adapter?: Adapter) => {
    console.error('Wallet error', error, adapter)
  }

  return (
    <ConnectionProvider endpoint={endpoint} config={{ disableRetryOnRateLimit: true, wsEndpoint: wsNodeUrl }}>
      <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
