import LotteriesImg from '../../assets/svg/Lotteries-bg.svg'
import Web3Status from '../Web3Status'

import styled from 'styled-components/macro'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import {
    useDecimalsToken,
    useLotteryCurrentSupply, 
    useLotteryEndTime, 
    useLotteryIndex, 
    useLotteryMaxSupply, 
    useLotteryName, 
    useLotteryPrice, 
    useTicketsBalance, } from 'hooks/useTicketsBalance'
import { WALES_ONLY_LOTTERY, MINI_CHADS_LOTTERY, BUSD_TEST, SELL_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, BUSD_ADDRESS, DAI_ADDRESS, REW_ADDRESS } from 'constants/addresses'
import { useMemo, useCallback, useState, useEffect, CSSProperties} from 'react'
import { useModalIsOpen, useToggleBuyModal, useToggleModal, useToggleWalletModal } from 'state/application/hooks'
import { ApprovalState, useApproval } from '../../lib/hooks/useApproval'
import { useHasPendingApproval, useTransactionAdder } from '../../state/transactions/hooks'
import { useBayRew } from 'hooks/useLotteryFunction'
import { getConnection } from 'connection/utils'
import { useAppDispatch } from 'state/hooks'
import { updateConnectionError } from 'state/connection/reducer'
import { switchChain } from 'utils/switchChain'
import { addPopup, ApplicationModal } from 'state/application/reducer'
import { Trans } from '@lingui/macro'
import { Button3dOrange, ButtonPrimary } from 'components/Button'
import Modal from 'components/Modal'
import { shortenAddress } from 'utils'
import Minus from '../../assets/svg/minus.svg'
import Tabl from '../../assets/images/tabl.jpg'
import Plus from '../../assets/svg/plus.svg'
import CloseIcon from '../../assets/svg/close-icon.svg'
import { ColLoader, Dots, PsLoader } from 'components/Loader'
import { ItemHistory } from './item'



const LotteryBoxWraper = styled.div`
width: 480px;
margin: auto;
height: 685px;
text-align: center;  
padding: 0px;
background-size: cover;
display: block;

background-repeat: no-repeat;
background-position: top;
background-image: url(${LotteriesImg});
z-index: 0;
`

const LotteryInfo = styled.div`
width: fit-content;
margin: auto;
max-height: 1000px;
max-width: 580px;
height: 100%;
text-align: start;  
padding: auto;
display: grid;
grid-gap: 5%;
z-index: 0;

text{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 700;
font-size: 60.9183px;
line-height: 81px;
color: #1F0D35;

}
span{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 26px;
color: #1F0D35;
}

`


const CardValue = styled.div`
width: 100%;
height: 100%;
text-align: center;  
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
max-height: 89px;
max-width: 157px;
// min-height: 89px;
// min-width: 89px;
margin: auto;
background: #1F0D35;
z-index: 5;
span{
    font-family: 'Segoe UI';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 18px;
color: #FFFFFF;
margin-bottom: 10px;
text-align: center;
display: block;
padding: 15px 0px 0px 0px;
p{
font-family: 'Segoe UI';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 18px;
color: #FFFFFF;
margin: auto;
}

}
`
const LotteryBody = styled.div`
width: 100%;
height: 100%;
padding: 0px 0px 0px 0px;
text-align: center;  
display: grid;
grid-gap: 2%;
`
const WraperContent = styled.div`
width: 380px;
height: max-content;
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
margin: auto;
margin-top: 35px;
// grid-auto-flow: column;
// grid-gap: 5%;
span{
    font-family: Segoe UI;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
cursor: pointer;


color: rgba(254, 189, 35, 0.64);
}
h1{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 45px;
    line-height: 60px;
    color: #FEBD23; 
    margin: auto;
    cursor: pointer;
}
h2{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    color: #FEBD23; 
    margin: auto;
}
img{
    margin: auto;
    padding: 20px 0px 20px 0px;
:hover{
    scale: 1.1;
    cursor: pointer;
}
:active{
    scale: 1;

}
}

`

const WraperContentHistory = styled.div`
width: 70%;
max-width: 800px;
height: max-content;
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
margin: auto;
margin-top: 35px;
// grid-auto-flow: column;
// grid-gap: 5%;
span{
    margin-top: auto;
    margin-bottom: auto;
    font-family: Segoe UI;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
cursor: pointer;


color: rgba(254, 189, 35, 0.64);
}
h1{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 60px;
    color: #FEBD23; 
    margin: auto;
    cursor: pointer;
}
h2{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: #FEBD23; 
    margin: auto;
}
img{
    margin: auto;
    padding: 20px 0px 20px 0px;
:hover{
    scale: 1.1;
    cursor: pointer;
}
:active{
    scale: 1;

}
}
`
const HistoryArray = styled.div`
width: 70%;
max-width: 800px;
height: 411px;
padding: 0px 0px 0px 0px;
text-align: center;  
display: block;
margin: auto;
margin-top: 35px;
overflow-y: scroll;
// grid-auto-flow: column;
// grid-gap: 5%;
span{
    margin-top: auto;
    margin-bottom: auto;
    font-family: Segoe UI;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
cursor: pointer;


color: rgba(254, 189, 35, 0.64);
}
h1{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 45px;
    line-height: 60px;
    color: #FEBD23; 
    margin: auto;
    cursor: pointer;
}
h2{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    color: #FEBD23; 
    margin: auto;
}
img{
    margin: auto;
    padding: 20px 0px 20px 0px;
:hover{
    scale: 1.1;
    cursor: pointer;
}
:active{
    scale: 1;
}
}
section:hover{
    cursor: pointer;
    border: 2px solid #F37A2D;
}
section:active{
    cursor: pointer;
    border: 3px solid #F37A2D;
}
`
interface usdToken{
   id: number 
   address: string
   simbol:  string
   name: string
  }


export  const Lottery = (props: any) => {
    const lotteryAddress = SELL_ADDRESS;
    const { account, chainId, connector } = useWeb3React();
    const [ticketAmount, setTicketAmount]  = useState(0); 
    const [usd, setUSD]  = useState([
     {id: 0, address: USDT_ADDRESS, simbol: "USDT", name: "Tether USD", decimals: 6, function: "depositUsdt"},
     {id: 1, address: USDC_ADDRESS, simbol: "USDC", name: "USD Coin", decimals: 6, function: "depositUsdc"},
     {id: 2, address: BUSD_ADDRESS, simbol: "BUSD", name: "Binance USD", decimals: 18, function: "depositBusd"},
     {id: 3, address: DAI_ADDRESS, simbol: "DAI", name: "DAI", decimals: 18, function: "depositDai"},
    ]); 
    // const currentLotteryNonce = useLotteryCurrentNonce(lotteryAddress)
    const [lotteryId, setLotteryId]  = useState(0); 
    // const [winningTickets, setWinningTickets]  = useState([0])
    // const lotterisHistory = useLotterisHistory(Number(currentLotteryNonce))
    const currentLotteryId = (id) =>  {
        setTicketAmount(0)
        setLotteryId(id)
    }
    
    // const [lotteryId, setLotteryId]  = useState(1);   
    const price = Number(useLotteryPrice(lotteryAddress));
    const totalAmount =  ticketAmount * price
    const currentSupply = useLotteryCurrentSupply(usd[lotteryId].address)
    const maxSupply = useLotteryMaxSupply(lotteryAddress)
    // const amountOfTokensPerLottery  = useAmountOfTokensPerLottery(lotteryAddress);
    // async function getWinningTickets (){
        
    //    // eslint-disable-next-line react-hooks/rules-of-hooks
    //    const  winningTicket = useWinningTicket(lotteryId.toString(), lotteryAddress)
    //    setWinningTickets([Number(winningTicket)])
    // }
    
    // const lotteryEndTime  = Number(useLotteryEndTime(lotteryAddress)) * 1000;
    // const lotteryEndTimeFormated = lotteryEndTime?   new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(lotteryEndTime) : undefined
    const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
    const [refundSubmitted, setRefundSubmitted] = useState<boolean>(false)
    // const lotteryName = useLotteryName(lotteryAddress)
    // const lotteryIndex = useLotteryIndex(lotteryAddress)
//    const tokensOfUserPerLottery = useTokensOfUserPerLottery( lotteryAddress, Number(lotteryIndex),  account,)
    const [isPendingApproval, approvalState, approveCallback] = useApproval(usd[lotteryId], totalAmount, SELL_ADDRESS, useHasPendingApproval)
    // const [winningState, refundCallback] = useRefundCallBack(lotteryAddress, lotteryId.toString())
    
    // const handleRefund = useCallback(async () => {
    //     await refundCallback()
    //   }, [refundCallback])

    const handleApprove = useCallback(async () => {   
          await approveCallback()
        }, [approveCallback])

    //     useEffect(() => {
    //         if (approvalState === ApprovalState.PENDING) {
    //           setApprovalSubmitted(true)
    //         }
           
    //       }, [approvalState, approvalSubmitted, refundSubmitted, winningState])

          
    
    const decimal = Number(useDecimalsToken(usd[lotteryId].address))

    const usdBalance = (Number(useTicketsBalance(usd[lotteryId].address, account)) / 10 ** decimal).toFixed(2)
    const louBalance = Number(usdBalance) < 50 ? true : false

        
    //  const currentLotterySupply = Number(amountOfTokensPerLottery) - (Number(maxSupply) - Number(currentSupply));
     const plusTicket = () => {
        if( ticketAmount < Number(usdBalance) && ticketAmount < 990){
            setTicketAmount(ticketAmount + 50)
        }else if(ticketAmount > Number(usdBalance) ){
          setTicketAmount(ticketAmount - 50)
        }
    }
     const minusTicket = () => {
            if(ticketAmount > 50){
                setTicketAmount(ticketAmount - 50)
            }
    }
    const selectUSDToken = (id) => {
      setLotteryId(id)
        setTicketAmount(0)
}
    const rewBalance = Number(useTicketsBalance(REW_ADDRESS, account)) / 10 ** 18
    const [ panding, balanceBusd, useBayTicketCallback] = useBayRew(
        ticketAmount,
        totalAmount,
        usd[lotteryId],
      );
    const approveTokenButtonDisabled =
    approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted 
    // const refundButtonDisabled =
    // winningState !== WinningState.NOT_WIN || approvalSubmitted 
    const dispatch = useAppDispatch()
    const onSelectChain = useCallback(
        async () => {
          if (!connector) return
    
          const connectionType = getConnection(connector).type
    
          try {
            dispatch(updateConnectionError({ connectionType, error: undefined }))
            await switchChain(connector, SupportedChainId.MAINNET)
          } catch (error) {
            console.error('Failed to switch networks', error)
    
            dispatch(updateConnectionError({ connectionType, error: error.message }))
            dispatch(addPopup({ content: { failedSwitchNetwork: SupportedChainId.MAINNET }, key: `failed-network-switch` }))
    
            // If we activate a chain and it fails, reset the query param to the current chainId
          }
    
        },
        [connector, dispatch]
       )
       const walletModalOpen = useModalIsOpen(ApplicationModal.WALLET)
        const toggleWalletModal = useToggleWalletModal()
       const bayModalOpen = useModalIsOpen(ApplicationModal.BUY)
    //    const toggleBuyModal = useToggleModal(ApplicationModal.BUY)

       const [isOpen, setIsOpen]  = useState(false)
       const [isOpenHistory, setIsOpenHistory]  = useState(false)
       const toggleBuyModal = () => {
        if (isOpen===true){
          if(panding){
            setIsOpen(true)

          } else{
            setIsOpen(false)
           setTicketAmount(0)
          }
        
       }else{
        setIsOpen(true)
       }
    }
    const toggleHistoryModal = () => {
        if (isOpenHistory===true){
            setIsOpenHistory(false)
       }else{
        setIsOpenHistory(true)
       }
    }
    // useEffect(()=>{
    //     getWinningTickets()
    // },[currentLotteryNonce, lotteryId ]
    // )
    const rewAmaunt = ticketAmount * price;
    const userAvatar = "https://avatars.dicebear.com/api/identicon/:" + account + ".svg"
    const lotteryIcon = "https://avatars.dicebear.com/api/identicon/:" + lotteryAddress + ".svg?colors=purple,orange,yellow"
    const isLoadingData = true;
   return(
   isLoadingData?
  <LotteryBody>
   {/* <LotteryBoxWraper>
  <img src={lotteryIcon} width={"300px"} style={{position: "relative", top: "30%"}} alt="" />
   </LotteryBoxWraper> */}
 
 
    <span style={{maxWidth: "1400px", width: '100%'}}>
        <img src={Tabl} style={{maxWidth: "1400px", width: '100%'}} />
      </span>
   <LotteryInfo>
      <text>Революционный Вексель</text>
      
   <div style={{ minHeight: "100px",  margin: "auto", width: "100%", display: "inline-flex", gridGap: '5%', gridAutoFlow: 'column' }}>
   
   <CardValue> <span> <Trans>  {usd[lotteryId].simbol} Баланс</Trans>{Number(usdBalance) >= 0?  <p style={{marginTop: "20px"}}>{usdBalance}</p> : <p style={{width: "90px", height: "90px"}}><ColLoader/> </p>}  </span>   </CardValue>
   <CardValue><span> <Trans>  Бланс REW</Trans>{rewBalance? <p style={{marginTop: "20px"}}> {rewBalance}</p> : <p style={{width: "90px", height: "90px"}}><ColLoader/></p>}</span>    </CardValue>
     <CardValue><span> <Trans> Цена </Trans>{price? <p style={{marginTop: "20px"}}>1 REW = {(price / 100) + " "} USD </p> : <p style={{width: "90px", height: "90px"}}><ColLoader/> </p> }</span>  </CardValue>
   
   </div> 
   
   <span> Баланс: {rewBalance? rewBalance : 0} REW 🎫 </span>
   <div style={{ margin: "auto", width: "100%", display: "grid", gridGap: '5%', gridAutoFlow: 'column' }}>
  
  
   {!account? 
   <>
   <ButtonPrimary width={"550px"}
                   onClick={toggleWalletModal}>
                
  <Trans>CONNECT WALLET</Trans>
  </ButtonPrimary> 
   </>
   :
   chainId && chainId !== SupportedChainId.MAINNET ? (
       <>
        <ButtonPrimary width={"550px"}
        onClick={onSelectChain}>
          <Trans>Переключить сеть на ETH</Trans>
          </ButtonPrimary>
          </>
     ) :
      <>
     <ButtonPrimary width={"230px"} height={"73px"}
     onClick={toggleBuyModal}>
           <Trans>Купить REW</Trans>
     </ButtonPrimary>
   </>
   }
   </div>
   
   </LotteryInfo>
   <Modal isOpen={isOpen} onDismiss={toggleBuyModal} minHeight={false} maxHeight={900} maxWidth={680}>
    
    <div style={{width: "680px", background: "#1F0D35", height: "950px" }} >
        <div style={{width: "95%", textAlign: "end", marginTop: "30px" }}>
     {!panding && <img src={CloseIcon} onClick={toggleBuyModal} style={{cursor: "pointer"}} alt="" />}
        </div>
        {panding?
        <div style={{margin: "auto", height: "460px", display: "grid", marginTop: "210px"}}>
            
            <div style={{width: "200px", height: "200px", margin: "auto"}}>
     <ColLoader/> </div>         <WraperContent style={{margin: "auto", position: "relative", bottom: "-30px"}}>
        <h2>Ожидание подтверждения</h2>
        <span>{"Покупка " + totalAmount +  " REW, на "  + ticketAmount + " " + usd[lotteryId].simbol}</span>
        <p></p>
        <span>Подтвердите эту транзакцию в вашем кошельке</span>
        </WraperContent>
        </div>
       :
       <>
        <WraperContent>
      <text style={{ fontWeight: "500", fontSize: "30px", lineHeight: "20px", color: "#FEBD23", WebkitTextStroke: "1px #1F0D35"}}>ВЫБЕРИТЕ ВАЛЮТУ</text> 
    </WraperContent>
    <HistoryArray style={{}}>
    {usd.map(item => (
  <div onClick={()=>selectUSDToken(item.id)}>
  <ItemHistory 
  key={item.id} 
  account={account}
   lotteryName={item.name}
    lotteryId={item.id}
     lotteryAddress={item.address}
     simbol={item.simbol}
      decimals={item.decimals}
      selectedId={lotteryId} />
</div>

))}
    </HistoryArray> 
    <WraperContent style={{textAlign: "start"}}>
        <span onClick={toggleWalletModal} > <img src={userAvatar} alt="" width={"20px"} style={{padding: "0 0 0 0"}} /> {account? shortenAddress(account): "Wallet adress" }</span>
    </WraperContent>
    <WraperContent style={{textAlign: "end", marginTop: "20px"}}>
        <span style={{fontSize: "17px", lineHeight: "20px", width: "80px", textAlign: "center", marginRight: "165px"}}>{usd[lotteryId].simbol}</span> 
        <span style={{fontSize: "17px", lineHeight: "20px", width: "80px", textAlign: "center", marginRight: "20px"}}>REW</span>
    </WraperContent>
    <WraperContent style={{marginTop: "2px"}}>
        <div style={{width: "380px", margin: "auto", display: "inline-grid", gridAutoFlow: "column", gap: "20px"}}>
        <div style={{width: "280px", height: "80px", display: "inline-grid", gridAutoFlow: "column", background: "#1F0D35", }}>
            <img src={Minus} onClick={minusTicket}  style={{margin: "auto"}} alt="" />
            <h1 onClick={()=>setTicketAmount(louBalance? 0 :  50)} >{ticketAmount} </h1>
            <img src={Plus} onClick={plusTicket}  alt="" />
         </div>
         <div style={{width: "80px", height: "80px", display: "flex", background: "#1F0D35"}}>
            <h2 >{rewAmaunt}</h2>
         </div>
         </div>
        
    </WraperContent> 
    </>}
    <p style={{width: "280px", margin: "auto", marginTop: "40px", height: "68px"}}>
    { louBalance ?
   <span style={{fontSize: "17px", lineHeight: "20px", color: "#FFFFFF"}}>НЕДОСТАТОЧНЫЙ БАЛАНС {usd[lotteryId].simbol} </span>
   :
   ticketAmount < 50?
   <span style={{fontSize: "17px", lineHeight: "20px", color: "#FFFFFF"}}>ВВЕДИТЕ СУММУ {usd[lotteryId].simbol} </span>
   :
    approvalState === ApprovalState.APPROVED?  
    <ButtonPrimary style={{margin: "auto"}} width={"230px"} height={"68px"}
                   onClick={!panding? useBayTicketCallback : toggleBuyModal }>           
  <Trans>{panding?<Dots>PENDING</Dots> :"Купить"}</Trans>
  </ButtonPrimary> 
  :
  <ButtonPrimary width={"230px"} height={"68px"} style={{margin: "auto"}}
  onClick={handleApprove}
  altDisabledStyle={approveTokenButtonDisabled}>
    <Trans> {isPendingApproval? <Dots> {"Approve " + usd[lotteryId].simbol}</Dots> :  "Approve " + usd[lotteryId].simbol}</Trans>
  </ButtonPrimary>
  }
 </p>
    </div>
    </Modal>
    <Modal isOpen={isOpenHistory} onDismiss={toggleHistoryModal} minHeight={false} maxHeight={921} maxWidth={1066}>
    
    <div style={{ width: "100%", background: "#492E8B", height: "920px" }} >
        <div style={{width: "95%", textAlign: "end", marginTop: "20px" }}>
      <img src={CloseIcon} onClick={toggleHistoryModal} style={{cursor: "pointer"}} alt="" />
        </div>
        <WraperContentHistory>
      <text style={{maxWidth: "600px", fontWeight: "400", fontSize: "70px", lineHeight: "51px", color: "#FEBD23", WebkitTextStroke: "1px #1F0D35"}}>LOTTERY HISTORY</text> 
    </WraperContentHistory>
    <WraperContentHistory style={{textAlign: "start"}}>
        <span style={{marginLeft: "20%"}}  onClick={toggleWalletModal} > <img src={userAvatar} alt="" width={"20px"} style={{padding: "0 0 0 0"}} /> {account? shortenAddress(account): "Wallet adress" }</span>
    </WraperContentHistory>
    <HistoryArray style={{}}>
    {usd.map(item => (
  <div onClick={()=>currentLotteryId(item.id)}>
  <ItemHistory 
  key={item.id} 
  account={account}
   lotteryName={item.name}
    lotteryId={item.id}
     lotteryAddress={item.address}
     simbol={item.simbol}
      decimals={item.decimals}
      selectedId={lotteryId} />
</div>

))}
    </HistoryArray> 
    <WraperContent>
    {!isLoadingData?
    <div style={{width: "400px", height: "400px"}}>
     <ColLoader/> </div> :
     <Button3dOrange width={"230px"} height={"68px"}
     onClick={toggleHistoryModal} 
     style={{margin: "auto"}}>
           <Trans>Ok, close</Trans>
     </Button3dOrange>
  }</WraperContent>
    </div>
    </Modal>
  </LotteryBody>
  : 
  <div style={{width: "100%", height: "700px", margin: "auto", display: "inline-grid", gridAutoFlow: "column"}}>
  <PsLoader isLoading={!isLoadingData} />
</div>
  )
}
  
