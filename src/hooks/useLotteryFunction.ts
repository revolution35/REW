import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { sendAnalyticsEvent } from 'components/AmplitudeAnalytics'
import { EventName } from 'components/AmplitudeAnalytics/constants'
import { BUSD_TEST, SELL_ADDRESS } from 'constants/addresses'
import { useLotteryWalesContract, useTokenContract } from 'hooks/useContract'
import { useCallback, useMemo, useState } from 'react'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { BigNumber } from 'ethers'
import { useIsTransactionPending, useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

export enum BalanceState {
  UNKNOWN = 'UNKNOWN',
  LOW_BALANCE = 'LOW_BALANCE',
  PENDING = 'PENDING',
  BALANCE = 'BALANCE',
}

interface usdToken{
  id: number 
  address: string
  simbol:  string
  name: string
  decimals: number
  function: string

 }

export function useBalanceState(
  amount: number,
  token: usdToken ,
  isPendingBay : boolean
) : BalanceState {

  const { account } = useWeb3React()

const tokenContract = useTokenContract(token.address)
const inputs = useMemo(() => [account], [account])
  // check the current approval status
  const currentBalance = useSingleCallResult(tokenContract, 'balanceOf', inputs).result?.toString()
  
   return useMemo(() => {
  if ( !amount || !token ) return BalanceState.UNKNOWN
  if ( !currentBalance) return BalanceState.UNKNOWN
   if (Number(currentBalance) / 10 ** token.decimals < amount  ) return BalanceState.LOW_BALANCE
   
   return Number(currentBalance) / 10 ** token.decimals >= amount
   ? isPendingBay
     ? BalanceState.PENDING
     : BalanceState.BALANCE
   : BalanceState.LOW_BALANCE
}, [token, currentBalance, isPendingBay, amount])
}

export function useBayRew(
    _amount: number,
    totalAmount: number,
    token: usdToken,
    
  ):  [ boolean, BalanceState, () => Promise<void>] {
    const isPendingBay = useIsTransactionPending()
    const { chainId } = useWeb3React();
    const amount = _amount * (10 ** token.decimals)
    const lotteryContract = useLotteryWalesContract(SELL_ADDRESS, true)
    const [pending, setPending] = useState(false);
    const balanceState = useBalanceState(_amount, token, isPendingBay)
    const addTransaction = useTransactionAdder();
            const contractFunction = token.function

      const Bay = useCallback(async (): Promise<void> => {  
         setPending(true); 
        if (balanceState === BalanceState.LOW_BALANCE) {
          console.error('approve was called unnecessarily');
          return;
        }
        if (!token) {
          console.error('no token');
          return;
        }
    
        if (!lotteryContract) {
          console.error('lotteryContract is null');
          return;
        }
        if (!_amount) {
          console.error('missing amount');
          return;
        }   

        const estimatedGas = await lotteryContract[contractFunction](amount).catch(() => {

          return lotteryContract.estimateGas[contractFunction](amount);
        });

        return lotteryContract[contractFunction](amount, {
            gasLimit: calculateGasMargin(estimatedGas),
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              type: TransactionType.BUYTICKETS,
              totalAmount: amount.toString(),
              ticketsAmount: totalAmount?.toString(),
              lotteryName: token.simbol,
            })
            setPending(false);
            return response.hash
          })
          .catch((error: Error) => {
            setPending(false);
            console.debug('Failed to buy REW', error);
            throw error;
          });
      }, [balanceState, token, lotteryContract, _amount, contractFunction, amount, addTransaction, totalAmount]);
      return [pending, balanceState, Bay];
    }    