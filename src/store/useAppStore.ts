import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import createStore from './createStore'

export const defaultNetWork = WalletAdapterNetwork.Mainnet // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
export const defaultEndpoint = clusterApiUrl(defaultNetWork) // You can also provide a custom RPC endpoint

export const supportedExplorers = [
  {
    name: 'Solscan',
    icon: '/images/explorer-solscan.png',
    host: 'https://solscan.io'
  },
  {
    name: 'Explorer',
    icon: '/images/explorer-solana.png',
    host: 'https://explorer.solana.com'
  },
  {
    name: 'SolanaFM',
    icon: '/images/explorer-solanaFM.png',
    host: 'https://solana.fm'
  }
]

export type Explorer = (typeof supportedExplorers)[number]

interface AppStore {
  explorer: Explorer
  setExplorer: (explorer: Explorer) => void
}

const initialState: AppStore = {
  explorer: supportedExplorers[0],
  setExplorer: (explorer: Explorer) => {}
}

export const useAppStore = createStore<AppStore>(
  (set) => ({
    ...initialState
  }),
  { name: 'useAppStore' }
)
