import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { sendAnalyticsEvent } from 'components/AmplitudeAnalytics'
import { EventName } from 'components/AmplitudeAnalytics/constants'
import { getTokenAddress } from 'components/AmplitudeAnalytics/utils'
import { BUSD_TEST } from 'constants/addresses'
import { useLotteryWalesContract, useTokenContract } from 'hooks/useContract'
import { useTokenAllowance } from 'hooks/useTokenAllowance'
import { useCallback, useMemo, useState } from 'react'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useSingleCallResult } from 'lib/hooks/multicall'



export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

interface usdToken{
  id: number 
  address: string
  simbol:  string
  name: string
 }



export function useApprovalStateForSpender(
  token: usdToken,
  amountToApprove: number | undefined,
  spender: string | undefined,
  useIsPendingApproval: (token?: string, spender?: string) => boolean
): ApprovalState {
   const { account } = useWeb3React()
    const contract = useTokenContract(token.address, false)
   
  
    const inputs = useMemo(() => [account, spender], [account, spender])
    
      const currentAllowance = useSingleCallResult(contract, 'allowance', inputs).result?.toString()
  const pendingApproval = useIsPendingApproval(token.address, spender)
  return useMemo(() => {

    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
   
    return Number(currentAllowance)   < amountToApprove
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])
}

export function useApproval(
  token: usdToken,
  amountToApprove: number | undefined,
  spender: string | undefined,
  useIsPendingApproval: (token?: string, spender?: string) => boolean
): [
  boolean,
  ApprovalState,
  () => Promise<{ response: TransactionResponse; tokenAddress: string; spenderAddress: string } | undefined>
] {
  const { chainId } = useWeb3React()
  const [isPendingApproval, setisPendingApproval] = useState(false)
  // check the current approval status
  const approvalState = useApprovalStateForSpender(token, amountToApprove, spender, useIsPendingApproval)

  const tokenContract = useTokenContract(token.address)

  const approve = useCallback(async () => {
    setisPendingApproval(true)
    function logFailure(error: Error | string): undefined {
      console.warn(`${token || 'Token'} approval failed:`, error)
      return
    }

    // Bail early if there is an issue.
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      return logFailure('approve was called unnecessarily')
    } else if (!chainId) {
      return logFailure('no chainId')
    } else if (!token) {
      return logFailure('no token')
    } else if (!tokenContract) {
      return logFailure('tokenContract is null')
    } else if (!amountToApprove) {
      return logFailure('missing amount to approve')
    } else if (!spender) {
      return logFailure('no spender')
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens which restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove)
    })

    return tokenContract
      .approve(spender, useExact ? amountToApprove : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response) => {
        const eventProperties = {
          chain_id: chainId,
          token_symbol: token.simbol,
          token_address: token.address,
        }
        sendAnalyticsEvent(EventName.APPROVE_TOKEN_TXN_SUBMITTED, eventProperties)
        return {
          response,
          tokenAddress: token.address,
          spenderAddress: spender,
        }
      })
      .catch((error: Error) => {
        setisPendingApproval(false)

        logFailure(error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, chainId])

  return [isPendingApproval, approvalState, approve]
}




