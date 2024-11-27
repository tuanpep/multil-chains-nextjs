'use client'

import { FC, PropsWithChildren } from 'react'
import WalletProvider from './WalletProvider'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>
}

export default Providers
