import { useWeb3React } from '@web3-react/core'
import { errors } from 'ethers'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import { MINI_CHADS_LOTTERY } from '../constants/addresses'

import { useLotteryMiniContract, useLotteryWalesContract, useREWContract, useTokenContract } from './useContract'

export function useTicketsBalance(lottery?: string, owner?: string): string | undefined {
  const contract = useREWContract(lottery) 

  const inputs = useMemo(() => [owner], [owner])
    const ticketBalance = useSingleCallResult(contract, 'balanceOf', inputs).result

  return useMemo(
    () => ( 
       ticketBalance ? ticketBalance.toString() : undefined),
    [ticketBalance]
  )
}
export function useDecimalsToken(token?: string): string | undefined {
  const contract = useTokenContract(token)

    const decimals = useSingleCallResult(contract, 'decimals').result

  return useMemo(
    () => ( 
      decimals ? decimals.toString() : undefined),
    [decimals]
  )
}

export function useLotteryPrice(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const ticketPrice = useSingleCallResult(contract, 'exchangeRate').result

  return useMemo(
    () => ( 
      ticketPrice ? ticketPrice.toString() : undefined),
    [ticketPrice]
  )
}

export function useLotteryMaxSupply(lottery?: string): string | undefined {
  const contract = useREWContract(lottery)

    const maxSupply = useSingleCallResult(contract, 'totalSupply').result

  return useMemo(
    () => ( 
      maxSupply ? maxSupply.toString() : undefined),
    [maxSupply]
  )
}

export function useLotteryEndTime(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const lotteryEndTime = useSingleCallResult(contract, 'lotteryEndTime').result

  return useMemo(
    () => ( 
      lotteryEndTime ? lotteryEndTime.toString() : undefined),
    [lotteryEndTime]
  )
}
export function useLotteryCurrentSupply(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const currentSupply = useSingleCallResult(contract, 'totalMinted').result

  return useMemo(
    () => ( 
      currentSupply ? currentSupply.toString() : undefined),
    [currentSupply]
  )
}
export function useLotteryCurrentNonce(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const currentNonce = useSingleCallResult(contract, 'nonce').result
  return useMemo(
    () => ( 
      currentNonce ? currentNonce.toString() : undefined),
    [currentNonce]
  )
}

export function useAmountOfTokensPerLottery(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const amountOfTokensPerLottery = useSingleCallResult(contract, 'amountOfTokensPerLottery').result

  return useMemo(
    () => ( 
      amountOfTokensPerLottery ? amountOfTokensPerLottery.toString() : undefined),
    [amountOfTokensPerLottery]
  )
}
export function useLotteryName(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const lotteryName = useSingleCallResult(contract, 'name').result

  return useMemo(
    () => ( 
      lotteryName ? lotteryName.toString() : undefined),
    [lotteryName]
  )
}

export function useLotteryIndex(lottery?: string): string | undefined {
  const contract = useLotteryWalesContract(lottery)

    const lotteryIndex = useSingleCallResult(contract, 'nonce').result

  return useMemo(
    () => ( 
      lotteryIndex ? lotteryIndex.toString() : undefined),
    [lotteryIndex]
  )
}

export function useTokensOfUserPerLottery(owner: string | undefined, lotteryIndex: number, lottery?: string   ): string | undefined {
  const contract = useLotteryWalesContract(lottery)
  const inputs = useMemo(() => [owner, lotteryIndex], [owner, lotteryIndex])

    const tokensOfUserPerLottery = useSingleCallResult(contract, 'tokensOfUserPerLottery', inputs).result

  return useMemo(
    () => ( 
      tokensOfUserPerLottery ? tokensOfUserPerLottery.toString() : undefined),
    [tokensOfUserPerLottery]
  )
}


export function useWinningTicket(lotteryIndex?: string, lottery?: string   ): string | undefined {
  const contract = useLotteryWalesContract(lottery)
  const inputs = useMemo(() => [lotteryIndex], [lotteryIndex])
  
    const winningTicket = useSingleCallResult(contract, 'getWinningToken', inputs).result
  return useMemo(
    () => ( 
      winningTicket ? winningTicket.toString() : undefined),
    [winningTicket]
  )
}

export function useStatePerLottery(lotteryIndex?: number, lottery?: string   ): string | undefined {
  const contract = useLotteryWalesContract(lottery)
  const inputs = useMemo(() => [lotteryIndex], [lotteryIndex])
  
    const statePerLottery  = useSingleCallResult(contract, 'statePerLottery', inputs).result
  return useMemo(
    () => ( 
      statePerLottery ? statePerLottery.toString() : undefined),
    [statePerLottery]
  )
}


