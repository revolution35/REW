import { useWeb3React } from "@web3-react/core"
import { sendAnalyticsEvent } from "components/AmplitudeAnalytics"
import { EventName } from 'components/AmplitudeAnalytics/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useLotteryWalesContract } from "hooks/useContract"
import { useCallback, useMemo } from "react"
import { calculateGasMargin } from "utils/calculateGasMargin"
import { useSingleCallResult } from "./multicall"
import { useIsTransactionPending, useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

export enum WinningState {
    UNKNOWN = 'UNKNOWN',
    NOT_WIN = 'NOT_WIN',
    PENDING = 'PENDING',
    WIN = 'WIN',
  }

  export function useWinningState(
    lotteryAddress: string | undefined,
    lotteryId: string | undefined,
    account: string | undefined,
  ): WinningState {
      const contract = useLotteryWalesContract(lotteryAddress)
      const inputs = useMemo(() => [lotteryId], [lotteryId])
      const currentWinningTicket = useSingleCallResult(contract, 'getWinningToken', inputs).result?.toString()
      const winnerTicketId = useMemo(() => [currentWinningTicket], [currentWinningTicket])
      const ownerOfWinningTicket = useSingleCallResult(contract, 'ownerOf', winnerTicketId).result?.toString()
    console.log(currentWinningTicket, ownerOfWinningTicket)
    return useMemo(() => {
  
      if (!lotteryAddress || !lotteryId || !currentWinningTicket || !ownerOfWinningTicket ) return WinningState.UNKNOWN
      if (!currentWinningTicket) return WinningState.UNKNOWN   
      return ownerOfWinningTicket  === account
        ?  WinningState.WIN
          : WinningState.NOT_WIN
    }, [lotteryAddress, lotteryId, currentWinningTicket, ownerOfWinningTicket, account])
  }
  
//   export function useRefund(
//     lotteryAddress: string | undefined,
//     lotteryId: string | undefined,
//     // useIsPendingWinner: (lotteryAddress?: string, lotteryId?: number) => boolean
//   ): [
//     WinningState,
//     () => Promise<{ response: TransactionResponse; lottery_id: string; lotteryAddress: string } | undefined>
//   ] {
//     const { chainId, account } = useWeb3React()
//     console.log(useWeb3React())
//     // check the current approval status
//     const winningState = useWinningState(lotteryAddress, lotteryId, account)
  
//     const lotteryContract = useLotteryWalesContract(lotteryAddress, true)
//       const addTransaction = useTransactionAdder()

//     const refund  = async function () {

//      console.log("REFUND", winningState, chainId, lotteryId, lotteryContract, account)

//       function logFailure(error: Error | string): undefined {
//         return
//       }
  
//       // Bail early if there is an issue.
//       if (winningState !== WinningState.NOT_WIN) {
//         return logFailure('not win')
//       } else if (!chainId) {
//         return logFailure('no chainId')
//       } else if (!lotteryId) {
//         return logFailure('no lottery ID')
//       } else if (!lotteryContract) {
//         return logFailure('missing lottery contract')
//       } else if (!account) {
//         return logFailure('no account')
//       } 
//       const args = [lotteryId]
     
//       return lotteryContract.estimateGas['refund'](...args, {}).then((estimatedGasLimit) => {
//         return lotteryContract
//           .refund(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
//           .then((response: TransactionResponse) => {
//             addTransaction(response, {
//               type: TransactionType.REFUND,
//               account: account,
//               lotteryContract: lotteryAddress?? account,
//             })
//             return response.hash
//           })
//       })
//   }  

//   return [winningState, refund]

// }


export function  useRefundCallBack(
    lotteryAddress: string | undefined,
    lotteryId: string | undefined,
  ):  [WinningState, () => Promise<void>] {
    const isPendingRefund = useIsTransactionPending()
    const { chainId, account } = useWeb3React()
    const lotteryContract = useLotteryWalesContract(lotteryAddress)
    const winningState = useWinningState(lotteryAddress, lotteryId, account)

    const addTransaction = useTransactionAdder();
      const refund = useCallback(async (): Promise<void> => {
        if (winningState === WinningState.NOT_WIN) {
          console.error('refund was called unnecessarily');
          return;
        }
        if (!lotteryAddress) {
          console.error('no lottery address');
          return;
        }
    
        if (!lotteryContract) {
          console.error('lotteryContract is null');
          return;
        }
    
        if (!account) {
          console.error('missing amount');
          return;
        } if (!lotteryId) {
            console.error('missing lottery ID');
            return;
          }
        const estimatedGas = await lotteryContract.estimateGas.refund(lotteryId).catch(() => {
          // general fallback for tokens who restrict approval amounts
          
          return lotteryContract.estimateGas.refund(lotteryId);
        });

        return lotteryContract
          .refund(lotteryId, {
            gasLimit: calculateGasMargin(estimatedGas),
          })
         .then((response: TransactionResponse) => {
                        addTransaction(response, {
                          type: TransactionType.REFUND,
                          account: account,
                          lotteryContract: lotteryAddress?? account,
                        })
                        return response.hash
                      })
          .catch((error: Error) => {
            console.debug('Failed to refund', error);
            throw error;
          });
      }, [winningState, lotteryAddress, lotteryContract, account, lotteryId, addTransaction]);
      return [winningState, refund];
    }    