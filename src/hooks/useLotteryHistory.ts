import { number } from "@lingui/core/cjs/formats";
import { useMemo, useState } from "react";


interface LotterisHistory {
    id: number
    nonce: number
    }

export function useLotterisHistory(currentNonce: number | undefined) 
  {
    const [lotteryId, setLotteryId] = useState(4)

    const [lotterisHistory, setLotterisHistory] = useState([{id: 0, nonce: 0},{id: 1, nonce: 1},{id: 2, nonce: 2},{id: 3, nonce: 3},])

    if (currentNonce && currentNonce > 3) {
     if(lotteryId <= currentNonce){
        setLotterisHistory([...lotterisHistory, {id: lotteryId, nonce: lotteryId} ])
        setLotteryId((lotteryId+1))
     }   
     

    }
    
    return lotterisHistory
      }
    

  