
  const serverUrl = "https://cfwkoognqtom.usemoralis.com:2053/server"; //Server url from moralis.io
  const appId = "BgQ6S4bMln5dfMrSV43JiOtncK3OTvLEY3G6bXFf"; // Application id from moralis.io
  Moralis.start({ serverUrl, appId });
  

  let ethAddress;
let network = '';
const chainToQuery = 'matic'

// // Smooth scrolling for browsers that don't support CSS smooth scrolling 
// if (window.getComputedStyle(document.documentElement).scrollBehavior !== 'smooth') { 
//     document.querySelectorAll('a[href^="#"]').forEach(internalLink => { 
//         const targetElement = document.querySelector(internalLink.getAttribute('href')); 
//         if (targetElement) { 
//             internalLink.addEventListener('click', (e) => { 
//                 targetElement.scrollIntoView({ 
//                     behavior: 'smooth', 
//                 }); 
//                 e.preventDefault(); 
//             }); 
//         } 
//     }); 
// }

// var options = {
//         root: document.querySelector('#DOMContentLoaded'),
//         rootMargin: '0px',
//         threshold: 0.50
//     }
// async function defultParm() {
//     document.getElementById("h1_").style.transform="scale(1)";
//     document.getElementById("h1_").style.opacity=1;
//   }
//   document.getElementById("home_btn").onclick = defultParm();

// var swiper = new Swiper(".image-slider", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   coverflowEffect: {
//       rotate: 0,
//       stretch: 0,
//       depth: 100,
//       modifier: 2,
//       slideShadows: true,
//   },
//   loop:true,
//   autoplay: {
//         delay: 7000,
//         disableOnInteraction: true,
//   },
// });    

// let menu = document.querySelector('#menu-bar');
// let navbar = document.querySelector('.navbar');

// menu.addEventListener('click', () =>{
//   menu.classList.toggle('fa-times');
//   navbar.classList.toggle('nav-toggle');
// });

// window.onscroll = () =>{
//   menu.classList.remove('fa-times');
//   navbar.classList.remove('nav-toggle');
// }

// var acc = document.getElementsByClassName("accordion");
// var i;
  

// for (i = 0; i < acc.length; i++) {

 


//     acc[i].addEventListener("click", function() {
//         var panel = document.getElementsByClassName("active_");
// var panelActive = this.nextElementSibling;
//        if (panel.length > 0 ){
//         var panelOpen =  panel[0].nextElementSibling;


//         if( panelActive.style.display === "block"  ){
//             panelActive.style.display = "none";
//             this.classList.remove("active_");


//         }else{
//             if(panelActive.style.display === "none" ||  panelOpen.style.display === "block"){
//               panel[0].classList.remove("active_");
//               this.classList.add("active_"); 
//               panelActive.style.display = "block";
//               panelOpen.style.display = "none"
//       }
//         }
//         /* Toggle between adding and removing the "active" class,
//         to highlight the button that controls the panel */

//         /* Toggle between hiding and showing the active panel */
       
//     }else{ /* Toggle between adding and removing the "active" class,
//         to highlight the button that controls the panel */
//         this.classList.toggle("active_");

//         /* Toggle between hiding and showing the active panel */
        
//         if (panelActive.style.display === "block") {
//             panelActive.style.display = "none";

//         } else {
//             panelActive.style.display = "block";

//         }}
//     });
// }


// window.addEventListener('scroll', ()=> { 
//   // var opacity = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
//   // var scale = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
//   // document.documentElement.style.setProperty('--viewportheaderOpacity', opacity);
//   // document.documentElement.style.setProperty('--viewportheaderScale', scale);
//   // const output = document.querySelector("#contact_");
//   var int =document.documentElement.scrollTop;
//   var cint= 100/int;
  
//   if(int>10){
//     document.getElementById("h1_").style.transform="scale("+cint+")";
//     document.getElementById("h1_").style.opacity = cint;
//   }else{
//     document.getElementById("h1_").style.transform="scale(1)";
//     document.getElementById("h1_").style.opacity=1;
//  }
//   const observer = new IntersectionObserver(entries => { 
     
//     entries.forEach(entry => { 
         
//       const id = entry.target.getAttribute('id');
//       var opacity = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
//   var scale = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
//       if (entry.intersectionRatio > 0 ) { 
//         // document.querySelector(`[href="#${id}"]`).style.color = "var(--red)"; 
//         document.querySelector(`[href="#${id}"]`).classList.add("active");
//       } else { 
//         // document.querySelector(`[href="#${id}"]`).style.color = ""; 
//         document.querySelector(`[href="#${id}"]`).classList.remove("active");  

//         // console.log(entry);
//       }  
//     }); 
//   }); 
 
//   // Track all sections that have an id applied 
//   document.querySelectorAll('section[id]').forEach((section) => { 
//     observer.observe(section); 
//   }); 
  
// });

var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");
var openButton = document.querySelector("#open-button");

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

openButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  getBalance();
});

async function openBtn(){
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  getBalance();

}

modalOverlay.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});
 
active = document.getElementsByClassName("active__");
selectUsd = document.getElementsByName("selectusd"); 
for (i = 0; i < selectUsd.length; i++) {
selectUsd[i].addEventListener("click", function() {
  active[0].classList.remove("active__");
  this.classList.add("active__");
  if( this.id==="usdt"){
    selectedUsd=usdt;
    selectedUsdString="USDT"
    functionNameDeposit="depositUsdt";
  }else if( this.id==="usdc"){
    selectedUsd=usdc;
    selectedUsdString="USDC"
    functionNameDeposit="depositUsdc";
  }else if( this.id==="busd"){
    selectedUsd=busd;
    selectedUsdString="BUSD"
    functionNameDeposit="depositBusd";
  }else if( this.id==="dai"){
    selectedUsd=dai;
    functionNameDeposit="depositDai";
    selectedUsdString="DAI"
  }else{ console.log('err usd selrcted');}
  getAllowace();
  getTokenBalance();
});
}


// 
// Когда пользователь прокручивает страницу, выполнить myFunction 
// window.onscroll = function() {myFunction()};

// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("h1_").style.transform="scale(0.5)";
// }

// var $links = $('#myBar a');
// $links.on('click',function(e) {
//   e.preventDefault();
//   $links.removeClass('active');
//   $(this).addClass('active');
// })

// document.querySelectorAll('.accordion_btn').forEach(button =>{
// button.addEventListener('click', ()=>{
//   const accordionContent=button.nextElementSibling;
//   button.classList.toggle('accordion__btn--active');
//   if (button.classList.contains('accordion__btn--active')){
//     accordionContent.style.display="block";
//   }
//   else{
//     accordionContent.style.display="none";

//   }
// } )
// })
async function openAddress(){
  window.open('https://etherscan.io/address/'+ ethAddress);
}

async function login() {
  try {
    // let currentUser = Moralis.User.current();
    
        if (typeof screen.orientation === 'undefined') { 
            
            await Moralis.authenticate({ provider: "walletconnect" })
            
            const user = await Moralis.authenticate({ 
                provider: "walletconnect", 
                signingMessage: "Крипто лев",
                mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
                ] 
            })

            getAddress();
            document.getElementById("modal_guts").style.display = "block";
            document.getElementById("connectt_metamask").style.display = "none";
            user.save();
            getNetwork();
            getAddress();
            getBalance();
        }else{
             getNetwork();

            let user = await Moralis.authenticate();
            const web3 = await Moralis.enableWeb3();
            getAddress();
            document.getElementById("modal_guts").style.display = "block";
            document.getElementById("connectt_metamask").style.display = "none";
            document.getElementById('_address').onclick = openAddress;
            ethAddress = Moralis.User.current().get('ethAddress');
        

          //  document.getElementById("user_chip").style.display = "block";
            // document.getElementById("switch_network_eth").innerHTML = "Смени мрежа";
            // document.getElementById("switch_network_eth").onclick = switchNetworkEth;        
    user.save();
    getAddress();
    getBalance();
    // populate();
    // getBalanceBgnt();
    document.getElementById('_address').onclick = openAddress;
    ethAddress = Moralis.User.current().get('ethAddress');


  
    // document.getElementById("_address").onclick = copyAddress;  
      caonsole.log(error);
        }
    }
   catch (error) {
    console.log(error);
  }
}

function getAddress(){
   ethAddress = Moralis.User.current().get('ethAddress');
    let firstFive = ethAddress.substring(0, 6);
    let lastFive = ethAddress.slice(ethAddress.length - 4);
    let _address = `${firstFive}...${lastFive}`;
    document.getElementById('_address').textContent = "  "+_address;
    // document.getElementById('address_wollett').innerHTML = "💳 "+_address;
    // document.getElementById('address_wollett').style.cursor = "pointer";
    // document.getElementById('address_wollett').onclick = copyAddress;
    
}

// function returnChainId(chainId){
//   switch (chainId) {
//       case 1: return "Eth";
//       case 3: return "Ropsten";
//       case 4: return "Rinkeby";
//       case 5: return "Goerli";
//       case 42: return "Kovan";
//       case 56: return "BSC";
//       case 97: return "BSC Testnet";
//       case 137: return "Matic";
//       case 1337: return "Local Dev Chain";
//       case 80001: return "Mumbai";
//     }
// }

async function getNetwork(){

  const chainId = await Moralis.chainId;
  console.log(chainId);
  // document.getElementById('currentNetwork').textContent = `Network: ${_id}`;

  if(chainId == "0x1" ){
    // document.getElementById('btn_deposit').innerHTML = "Купить REW";
    // document.getElementById("btn_deposit").className = "btn";
    document.getElementById('switch_network').onclick = switchNetworkETH;
    document.getElementById('btn_deposit').style.display = "inline-block";
    document.getElementById('switch_network').style.display = "none";
    // document.getElementById('switch_network_').style.display = "none";
    // document.getElementById('sand_btn').style.display = "none";
    // document.getElementById('switch_network_eth').style.display = "table-cell";
    // document.getElementById('add_network_mumbai').style.display = "table-cell";
    // document.getElementById('sand_btn').style.display = "block";
    // document.getElementById('switch_network_eth').style.display = "none";
    // document.getElementById('add_network_mumbai').style.display = "none";

    // document.getElementById('chain').innerHTML = "вярна мрежа";
  }else{ 

  document.getElementById('switch_network').onclick = switchNetworkETH;
  document.getElementById('switch_network').style.display = "inline-block";
  document.getElementById('btn_deposit').style.display = "none";

    // document.getElementById("btn_deposit").className = "btn_n";
    // document.getElementById('btn_deposit').innerHTML = "Переключить сеть";
    // document.getElementById('btn_deposit').onclick = "Переключить сеть";



    // document.getElementById('chain').innerHTML = "Преключи мрежата";
    // document.getElementById('btn_deposit').style.display = "none";
    // document.getElementById('btn_deposit_bgnt').style.display = "none";
    // document.getElementById('switch_network').style.display = "block";
    // document.getElementById('switch_network_').style.display = "block";
    // document.getElementById('sand_btn').style.display = "none";
    // document.getElementById('switch_network_eth').style.display = "table-cell";
    // document.getElementById('add_network_mumbai').style.display = "table-cell";
    // document.getElementById('btn_deposit').style.display = "none";
    // document.getElementById('btn_deposit_bgnt').style.display = "none";
    // document.getElementById('switch_network').style.display = "block";
    // document.getElementById('switch_network_').style.display = "block";
  }
}

// getNetworkText = async () => {
//     let web3 = new Web3(window.ethereum);
//     chainId = await web3.eth.net.getId();
//     let _id = returnChainId(chainId);
//     return (_id.toLowerCase());
// }

(async function (){
    if (Moralis.User.current() != null) {
      const web3 = await Moralis.enableWeb3();
    
            document.getElementById("modal_guts").style.display = "block";
            document.getElementById("connectt_metamask").style.display = "none";
            // document.getElementById("btn-auth").style.display = "none";
            // document.getElementById("connect_wallet").style.display = "none";
            // document.getElementById("_address_").style.display = "block";
            // document.getElementById("btn-logout").style.display = "block";
            // document.getElementById("switch_network_eth").innerHTML = "Смени мрежа";
            // document.getElementById("switch_network_eth").onclick = switchNetworkEth;
            // document.getElementById("currentNetwork").style.display = "block";
            document.getElementById('_address').onclick = openAddress;

          getBalance();
          getNetwork();
          getAddress(); 
        }else{
          // document.getElementById("connect_wallet").style.display = "block";
          // document.getElementById("_address_").style.display = "none";
          // document.getElementById("switch_network_eth").innerHTML = "Connect Wallett 🦊";
          // document.getElementById("switch_network_eth").onclick = function () { document.getElementById("connect_wallet").click();
          // document.getElementById("currentNetwork").style.display = "none";
          document.getElementById("modal_guts").style.display = "none";
          document.getElementById("connectt_metamask").style.display = "block";

         


            
          // };
  
          
        }
         
})();  

// Moralis.onChainChanged((chain) => {
//   getNetwork();

// });

// const unsubscribe = Moralis.onAccountChanged((address) => {
//   console.log(address)
//   getAddress(); 

//   // returns the new account --> ex. "0x1a2b3c4d..."
// });
 amountdep = 0;
async function plusAmount(){
   if(amountdep<1000){ 
    amountdep+=50;

  document.getElementById("amout_deposit").value= amountdep;
  var amount = document.getElementById("amout_deposit").value;
  var amount_rew = (amount * 10);
  document.getElementById("amount_rew").innerHTML = ("Получаете: " + amount_rew.toFixed(2) + " REW");
  if (amount >= 50 ){
    getAllowace();
  }else{
    document.getElementById("btn_deposit").className = "btn_n";
    document.getElementById("btn_deposit").disabled = true;
  }
}else{
  document.getElementById("minus").disabled=false;
  document.getElementById("plus").disabled=true;
}
}

async function minusAmount(){
   
  if(amountdep>=50){ 
  
  amountdep-=50;

  document.getElementById("amout_deposit").value= amountdep;
  var amount = document.getElementById("amout_deposit").value;
  var amount_rew = (amount * 10);
  document.getElementById("amount_rew").innerHTML = ("Получаете: " + amount_rew.toFixed(2) + " REW");
  
    getAllowace();
  
    
  
}else{
  document.getElementById("minus").disabled=true;
  document.getElementById("plus").disabled=false;
  document.getElementById("btn_deposit").className = "btn_n";
  document.getElementById("btn_deposit").innerHTML = "Купить REW";
    document.getElementById("btn_deposit").disabled = true;
}
}
document.getElementById("plus").onclick=plusAmount;
document.getElementById("minus").onclick=minusAmount;
document.getElementById("amout_deposit").value= amountdep;




document.addEventListener("keyup", function (evt) {
  var amount = document.getElementById("amout_deposit").value;
  var amount_rew = (amount * 10);
  document.getElementById("amount_rew").innerHTML = ("Получаете: " + amount_rew.toFixed(2) + " REW");
  if (amount > 0 ){
    getAllowace();
  }else{
    document.getElementById("btn_deposit").className = "btn_n";
    document.getElementById("btn_deposit").disabled = true;
  }
  


}, false);

// document.getElementById('amout_deposit').addEventListener("keyup", function (evt) {
//   var amount = document.getElementById("amout_deposit").value;
//   var amount_bgnt = (amount * 1.95583);
//   document.getElementById("convert_bgnt_").innerHTML = ("≈" +  amount_bgnt.toFixed(2) + " BGNt");
//   if (amount > 0 ){
//     document.getElementById("btn_deposit").disabled = false;
//   }else{
//     document.getElementById("btn_deposit").disabled = true;
//   }
//   getAllowace();
//   getEurtBalance();
// }, false);

async function switchNetworkETH(){
  try { const chainId = "0x1"; //Ethereum 
  const chainIdHex = await Moralis.switchNetwork(chainId); 
  
  getNetwork();

}catch{
  getNetwork();
  }

}

// async function switchNetworkEth(){
//   const chainId = "0x89";//Matic
//   const chainIdHex = await Moralis.switchNetwork(chainId); 
//   unsubscribe();
// }

// async function addNetworkPolygon(){
//   const chainId = 137;
//   const chainName = "Polygon";
//   const currencyName = "MATIC";
//   const currencySymbol = "MATIC";
//   const rpcUrl = "https://rpc-mainnet.matic.network";
//   const blockExplorerUrl = "https://polygonscan.com/";

//   await Moralis.addNetwork(
//   chainId, 
//   chainName, 
//   currencyName, 
//   currencySymbol, 
//   rpcUrl,
//   blockExplorerUrl
//   );
// }

// Subscribe to onChainChanged events
const unsubscribe = Moralis.onChainChanged((chain) => {
  console.log(chain);
  curentNetworkId=chain;


  // returns the new chain --> ex. "0x1"
  if(chain == "0x1" ){
    document.getElementById('switch_network').style.display = "none";
    document.getElementById('btn_deposit').style.display = "inline-block";
  }else{ 
        document.getElementById('switch_network').onclick = switchNetworkETH;
    document.getElementById('switch_network').style.display = "inline-block";
 document.getElementById('btn_deposit').style.display = "none";
  }
});

async function addRewToken(){
  const tokenAddress = '0xfe65ED7288823272Aba220b441C96bCEf4576b7b';
  const tokenSymbol = 'REW';
  const tokenDecimals = 18;
  const tokenImage = 'https://github.com/revolution35/REW/blob/main/images/REWsmall.png?raw=true';

 try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
 } catch (error) {
  console.log(error);
 }
}

// function onBridge() {
//   document.getElementById("overlay_bridge").style.display = "block";
// }
 
// function offBridge() {
//   document.getElementById("overlay_bridge").style.display = "none";
// }

const usdt= "0xdac17f958d2ee523a2206206994597c13d831ec7";
const usdc= "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const dai= "0x6b175474e89094c44da98b954eedeac495271d0f";
const busd= "0x4fabb145d64652a948d72533023f6e7a623c7c53";
var selectedUsd ="0xdac17f958d2ee523a2206206994597c13d831ec7";
var selectedUsdString ="USDT"
var token_meta;
const addressSale = "0x757435d7fdE85e988Bc3b7ED49767d16c44F0633";
const rew = "0xfe65ED7288823272Aba220b441C96bCEf4576b7b";
const addressFond= "0x88eD81189a5e1a69B712843335aA47255681ADc8";
var functionNameDeposit ="depositUsdt"; 
var tokenBalance = 0;
var balances_ = "";
var curentNetworkId = "";




//Get token allowace on ETH
async function getAllowace(){
  let address = Moralis.User.current().get('ethAddress');
    const options = {
    chain: "0x1",
    owner_address: address,
    spender_address: addressSale,
    address: selectedUsd
    };
    
    const allowance = await Moralis.Web3API.token.getTokenAllowance(options);
    if(token_meta == undefined){
      
    }else{  
      var value_allowance = allowance.allowance / (10 ** token_meta.decimals);
    var amount = document.getElementById("amout_deposit").value;
    if(amount <= value_allowance){
      document.getElementById("btn_deposit").innerHTML = "Купить REW";
      document.getElementById("btn_deposit").onclick = depositUsdToken;
      document.getElementById("btn_deposit").className = "btn";
      document.getElementById("btn_deposit").disabled = false;
 
    }else{
    document.getElementById("btn_deposit").onclick = approveTokenEth;
    document.getElementById("btn_deposit").innerHTML = "Разрешить";
    document.getElementById("btn_deposit").disabled = false;
  }
 }
    getTokenBalance();
}

async function getBalance() {
  const options = { chain: '0x1'}
  const balances = await Moralis.Web3API.account.getTokenBalances(options);
  balances_= balances;
  console.log(balances_);
  getTokenBalance();
	getEthPrice();

}


async function getTokenBalance() {
  rew_balance = balances_.find(item => item.token_address == rew);
  token_meta = balances_.find(item => item.token_address == selectedUsd);
  if (rew_balance== undefined){
    document.getElementById("rew_balance").innerHTML = "Ваш Баланс: 0.00 REW"; 

  }else{
    document.getElementById("rew_balance").innerHTML = "Ваш баланс: "+rew_balance.balance / (10 ** rew_balance.decimals)+" REW";
  }
  if (token_meta ==  undefined ){
    document.getElementById("btn_deposit").disabled = true;
    document.getElementById("btn_deposit").className = "btn_n";
    var amount = document.getElementById("amout_deposit").value;
    document.getElementById("token_balance").innerHTML = "Баланс: 0.00";
    if (amount > 0){
      document.getElementById("btn_deposit").disabled = true;
     document.getElementById("btn_deposit").className = "btn_n";
     document.getElementById("btn_deposit").innerHTML = "Недостаточно средств";

    }
  }else{
   
  let token_balance = token_meta.balance / (10 ** token_meta.decimals)
  tokenBalance = token_balance;
   document.getElementById("token_balance").innerHTML ='Баланс: ' + token_balance.toFixed(2) + " "+selectedUsdString;
 
   async function setMax () {
    if(tokenBalance>50){
    document.getElementById("amout_deposit").value = token_balance.toFixed(2);
    document.getElementById("btn_deposit").disabled = false;
    document.getElementById("btn_deposit").className = "btn";
    var amount = document.getElementById("amout_deposit").value;
    var amount_rew = (amount * 10);
    document.getElementById("amount_rew").innerHTML = (amount_rew.toFixed(2) + " REW");
    getAllowace();
   }if(tokenBalance>1000){
    document.getElementById("amout_deposit").value = 1000;
    document.getElementById("btn_deposit").disabled = false;
    document.getElementById("btn_deposit").className = "btn";
    var amount = document.getElementById("amout_deposit").value;
    var amount_rew = (amount * 10);
    document.getElementById("amount_rew").innerHTML = (amount_rew.toFixed(2) + " REW");
    getAllowace();
   }
   else{    document.getElementById("amout_deposit").value = 0;
   }
  }
   document.getElementById("max").onclick = setMax;
   document.getElementById("token_balance").onclick = setMax;
   document.getElementById("btn_deposit").className = "btn";
   
   var amount = document.getElementById("amout_deposit").value;
   if (amount > token_balance){
     document.getElementById("btn_deposit").disabled = true;
     document.getElementById("btn_deposit").className = "btn_n";
     document.getElementById("btn_deposit").innerHTML = "Недостаточно средств";

   } 
  }
}

//  async function getEurtInBgnt() {

//   const options = { chain: 'matic', address: "0x25555d94b299f373037bffB68bDd322E21A806Ef"}
//   const balances = await Moralis.Web3API.account.getTokenBalances(options);
//   console.log(balances)
 
//   token_meta = balances.find(item => item.token_address == "0x7bdf330f423ea880ff95fc41a280fd5ecfd3d09f");
//   console.log(token_meta)
//   if (token_meta ==  undefined ){
//     document.getElementById("eurt_bgnt").innerHTML = "0.00"; 
  
 
//   }else{
//    let token_balance = token_meta.balance / (10 ** token_meta.decimals)
//    document.getElementById("eurt_bgnt").innerHTML = token_balance.toFixed(2)+ ' EURT Заключени в смартконтракта за момента'
//  }
// }


async function depositUsdToken() {
  try {
  document.getElementById("btn_deposit").innerHTML = "";
  document.getElementById("btn_deposit").className = "loader";
  document.getElementById("btn_deposit").disabled = true;


  var amount = document.getElementById("amout_deposit").value;
  // var amout_rew = (amount / 1.95583).toFixed(6);
  const ABI = [
		{
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositUsdt",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },{
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositDai",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },{
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositBusd",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositUsdc",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
      ];  
 const options = {
  contractAddress: addressSale,
  functionName: functionNameDeposit,
  abi: ABI,
  params: {
    _amount: Moralis.Units.Token(amount, token_meta.decimals)
     },
  };
 // 0x8Dcb65b333C35f8CFf2F7330F19E933ba0492EE9
  const receipt = await Moralis.executeFunction(options);
  //  console.log(receipt)
  document.getElementById("btn_deposit").className = "btn";
  document.getElementById("btn_deposit").innerHTML = "Tранзакция отправлена";
  document.getElementById("btn_deposit").disabled = true;
  getTokenBalance();
  }catch (error) {
    console.log(error);
    document.getElementById("btn_deposit").className = "btn";
    document.getElementById("btn_deposit").innerHTML = "Купить REW";
    document.getElementById("btn_deposit").disabled = false;
    getTokenBalance();
  }
}

async function approveTokenEth() {
  try { 
  document.getElementById("btn_deposit").innerHTML = "";
  document.getElementById("btn_deposit").className = "loader";
  document.getElementById("btn_deposit").disabled = true;

  var amount = document.getElementById("amout_deposit").value;

  const ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
  ];


  const options = {
  contractAddress: selectedUsd,
  functionName: "approve",
  abi: ABI,
  params: {
    spender: addressSale,
    amount: Moralis.Units.Token(amount, token_meta.decimals)
    
  },
 };
   const receipt = await Moralis.executeFunction(options);
   document.getElementById("btn_deposit").className = "btn";
   document.getElementById("btn_deposit").onclick = depositUsdToken;
   document.getElementById("btn_deposit").innerHTML = "Купить REW";
   document.getElementById("btn_deposit").disabled = false;

  } catch (error) {
    console.log(error);
    document.getElementById("btn_deposit").className = "btn";
   document.getElementById("btn_deposit").onclick = approveTokenEth;
   document.getElementById("btn_deposit").innerHTML = "Разрешить";
   document.getElementById("btn_deposit").disabled = false;
   }
}

// async function openAddress(){
//   let  receiver = document.getElementById("receiver").value;
//   window.open('https://polygonscan.com/address/'+ receiver);
// }

// document.getElementById('amount_bgnt_sand').addEventListener("keyup", function (evt) {
  
//   var amount = document.getElementById("amount_bgnt_sand").value;
//   if (amount > 0 ){
//     getBalanceBgnt();
//     onWeb3Enabled();
//     initAddress();
//   } 
  
//   else {
//     document.getElementById("sand_btn").disabled = true;
//   }
//  getBalanceBgnt();
// }, false);

// async function getBalanceBgnt() {
//   const options = { chain: 'matic'}
//   const balances = await Moralis.Web3API.account.getTokenBalances(options);
 
//   bgnt_meta = balances.find(item => item.token_address == "0x25555d94b299f373037bffb68bdd322e21a806ef");
//   if (bgnt_meta ==  undefined ){
//   //  document.getElementById("bgnt_balance").innerHTML = "0.00"
//   //  document.getElementById("bgnt_balance_").innerHTML = "0.00"
//   //  document.getElementById("btn_deposit_bgnt").disabled = true;
 
 
//   }else{
//    bgnt_balance = bgnt_meta.balance / (10 ** bgnt_meta.decimals)
//   //  document.getElementById("bgnt_balance").innerHTML = bgnt_balance.toFixed(2)+ ' BGNT'
//   //  document.getElementById("bgnt_balance_").innerHTML = bgnt_balance.toFixed(2)+ ' BGNT'
 
 
//    async function setMax () {
//     document.getElementById("amount_bgnt_sand").value = bgnt_balance;
//     initAddress();
 
//    }
//    async function setMaxContract () {
//     //  document.getElementById("amout_deposit_").value = bgnt_balance;
//     //  var amount = document.getElementById("amout_deposit_").value;
//     //  var amount_bgnt = (amount / 1.95);
//     //  document.getElementById("convert_bgnt").innerHTML = ("≈" + amount_bgnt.toFixed(2) + " EURT");
//     //  document.getElementById("btn_deposit_bgnt").disabled = false;
//    }
 
//   //  document.getElementById("max_bgnt").onclick = setMax;
//   //  document.getElementById("bgnt_balance").onclick = setMax;
//   //  document.getElementById("bgnt_balance_").onclick = setMaxContract;
 
   
//   //  let amount = document.getElementById("amount_bgnt_sand").value;
//   //  let amout_deposit_=document.getElementById("amout_deposit_").value;
 
//   //  if (amount > bgnt_balance){
//   //    document.getElementById("sand_btn").disabled = true;
//   //    console.log(bgnt_balance)
//   //    setMax();
//   //    alert("Недостатъчен баланс");   
//   //  } 
//   //  if (amout_deposit_ > bgnt_balance){
//   //    // document.getElementById("sand_btn").disabled = true;
//   //    setMaxContract();
//   //    alert("Недостатъчен баланс"); 
//   //  } 
//   }
// }

// async function copyAddress() {
//   var str = Moralis.User.current().get('ethAddress');
//   // Create new element
//   var el = document.createElement('textarea');
//   // Set value (string to be copied)
//   el.value = str;
//   // Set non-editable to avoid focus and move outside of view
//   el.setAttribute('readonly', '');
//   el.style = {position: 'absolute', left: '-9999px'};
//   document.body.appendChild(el);
//   // Select text inside element
//   el.select();
//   // Copy text to clipboard
//   document.execCommand('copy');
//   // Remove temporary element
//   document.body.removeChild(el);
//     var toastElList = [].slice.call(document.querySelectorAll('.toast'))
//     var toastList = toastElList.map(function(toastEl) {
//       return new bootstrap.Toast(toastEl)
//     })
//     toastList.forEach(toast => toast.show()) 
// //   var toastElList = [].slice.call(document.querySelectorAll('.toast'))
// //   var toastList = toastElList.map(function (toastEl) {
// //  return new bootstrap.Toast(toastEl)
// //  });
// //  document.getElementById("toast_copy_address").toast('show');
// }

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  // document.getElementById("btn-logout").style.display = "none";
  // document.getElementById("user_chip").style.display = "none";
  // document.getElementById("btn-login").style.display = "block";
  //       document.getElementById("btn-auth").style.display = "block";
  //       document.getElementById("connect_wallet").style.display = "block";
  //       document.getElementById("_address_").style.display = "none";
  //       document.getElementById("currentNetwork").style.display = "none";
  //       document.getElementById('address_wollett').innerHTML = "💳";
        getAddress();

  try {
    await Moralis.User.logOut();
  } catch (error) {
    console.log('logOut failed', error);
  }
  result = '';
  renderApp();
  
}

var ethPrice=0;
async function getEthPrice(){

 const price = await Moralis.Web3API.token.getTokenPrice({address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"});
 console.log(price.usdPrice)
  ethPrice = price.usdPrice;
}

async function getGasPrice(){
  var averangeGasPrice =0;

   const now=Date.now();      
  const options_ = {
    chain: "eth",
    date: now 
  };
  const blockNumder = await Moralis.Web3API.native.getDateToBlock(options_);
  
  const options = { chain: "eth", block_number_or_hash: blockNumder.block };

  // get block content
  const transactions = await Moralis.Web3API.native.getBlock(options);   
  
 
  for (i = 0; i < transactions.transactions.length; i++){
      
      var gasPrice = transactions.transactions[i].gas_price;
      averangeGasPrice += (Number(gasPrice) / transactions.transactions.length);
      
  }
 document.getElementById("gas_price").innerHTML = " " + (averangeGasPrice / 10**9).toFixed(0)   + " Gwai (≈ " + (((averangeGasPrice / 10**9).toFixed(0) * 0.0000242  ) * ethPrice).toFixed(2) + " USD)  "; 
      if((averangeGasPrice / 10**9).toFixed(0)>50){
        document.getElementById("gas_price").style.color="red";
      }else{
        document.getElementById("gas_price").style.color="green";
      }
}
setTimeout(getGasPrice, 3000);

setInterval(getGasPrice, 15000);


