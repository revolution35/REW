
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import  Logo  from '../../assets/images/flag.png'
import  InstagramIcon  from '../../assets/svg/instagram-icon.svg'
import  DiscordIcon  from '../../assets/svg/discord-icon.svg'
import  TelegramIcon  from '../../assets/svg/telegram-icon.svg'
import  TwitterIcon  from '../../assets/svg/twitter-icon.svg'
import { PsiIcon, StyledNavLink, StyledNavLinkHome } from 'components/Header';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';



const FooterWraper= styled.div`
width: 100%;
height: 490px;
display: inline-flex;
padding: 0px;
padding: 0px;
margin: 0px;
z-index: 0;
position: relative;
top: -2px;
text-align: start;
background-color: #1F0D35;
// background-image: url();
// background-repeat: no-repeat;
// background-position: bottom;
`

const SocialLink= styled.div`
width: 310px;
height: 160px; 
text-align: center;

img{
  :hover{
    cursor: pointer;
    scale: 1.1;
    position: relative;
    top: -5px;
  }
  :active{
    scale: 1;
    top: 0px;
  }
}
`



export function Footer (){

    const { pathname } = useLocation()

  const isLending = pathname ==="/home" ? true : false; 
    return(
      <FooterWraper>  
    <div style={{width: "100%",  maxWidth: "960px", textAlign: "start", margin: "auto", display: "inline-grid", gridAutoFlow: "column", gridGap: "auto" }} >
    
  <PsiIcon style={{ display: "block"}}>
            <img  src={Logo} width="120px" title="logo" />
   </PsiIcon>
  
 <SocialLink >
 
      <div  style={{fontSize: "30px",  color: "#F37A2D", fontFamily: 'Segoe UI', fontWeight: "700", margin: "auto", paddingTop: "30px", lineHeight: "0px"}}>
        Мы <p></p> в <span style={{color: "#FEBD23", fontFamily: 'Segoe UI', fontWeight: "700", lineHeight: "5px"}}>социальных</span> сетях
        <p style={{ textAlign: "center", display: "inline-flex", justifyContent: "space-between", gridAutoFlow: "column", gridGap: "30px" }}>
        {/* <img  src={InstagramIcon} width="42px" title="istagram"/> */}
        {/* <img  src={DiscordIcon} width="42px" title="discord"/> */}
       <a target="_blank" href="https://t.me/rewinform" rel="noreferrer"> <img  src={TelegramIcon} width="42px" title="telegram"/></a>
        {/* <img  src={TwitterIcon} width="42px" title="twitter"/> */}
  
        </p>
      </div>
  
          </SocialLink>
     </div>
  
  </FooterWraper>
    )
  }