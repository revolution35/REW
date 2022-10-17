import { useWeb3React } from "@web3-react/core"
import { useStatePerLottery, useTicketsBalance, useWinningTicket } from "hooks/useTicketsBalance"
import { useState } from "react"



export const ItemHistory = (props: any) => {    
    const tokenName = props.name
    const tokenSimbol = props.simbol
    const lotteryId = props.lotteryId
    const isSelected = props.selectedId === lotteryId? true : false
    const tokenBalance = (Number(useTicketsBalance(props.lotteryAddress, props.account)) / 10 ** props.decimals).toFixed(2)


    // const statePerLottery = useStatePerLottery(props.lotteryId, props.lotteryAddress)
    // const winningTicket = useWinningTicket(props.lotteryId, props.lotteryAddress)
    // const stateLottery = () => {
    //     switch (statePerLottery) {
    //         case '0':
    //           return "non active"
    //         case '1':
    //             return "Win " + winningTicket
    //         case '2':
    //             return "failed"
    //         default:
    //           return "non active"
    //       }
    // }

   

    return(
    <section style={{maxWidth: "800px", width: "80%", paddingLeft: "52px", paddingRight: "37px", height: "80px", margin: "auto", marginBottom: "30px", background: "#1F0D35", display: "flex", justifyContent: "space-between", border: isSelected? "3px inset #F37A2D": "none" }}>
        <span style={{maxWidth: "600px", fontWeight: "400", fontSize: "31px", lineHeight: "41px", color: "#FEBD23"}}>{tokenSimbol}</span> 
       <span style={{color: Number(tokenBalance) < 20 ? "#F37A2D": "rgba(254, 189, 35, 0.64)" }}>{tokenBalance }</span>
        </section>
        )
}