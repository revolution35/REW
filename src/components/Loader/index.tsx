import { color } from '@dicebear/avatars';
import Col from '../../assets/images/flag.png';
import styled, { keyframes, css } from 'styled-components/macro'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

  const rotateHorizontal = keyframes`
  10% {
    transform: rotateY(20deg);
    }
    20% {
      transform: rotateY(40deg);
      }
      50% {
        transform: rotateY(180deg);
        }
        100% {
          transform: rotateY(360deg);
          }
`

const scale = keyframes`
  from {
    scale: 1;
    transform: rotateX(360deg);

  }
  50%{
    scale: 1.4;
    transform: rotateX(360deg);

  }
  to {
    scale: 1;
    transform: rotateY(360deg);
  }
`

const StyledSVG = styled.svg<{ size: string; stroke?: string; redesignFlag?: boolean }>`
  animation: 2s ${rotate} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, redesignFlag, theme }) =>
      redesignFlag ? theme.accentActive : stroke ?? theme.deprecated_primary1};
  }
`


const rotate0 = keyframes`
from {
  transform:  scale(0.6);
  opacity: 1;
}
10%{
  transform:  scale(0.8);
  opacity: 1;
}
25%{
  transform:  scale(0.9);
  opacity: 1;
}
50%{
  transform:  scale(1);
  opacity: 1;
}
75%{
transform:  scale(1.1);
opacity: 0.5;
}

to {
  transform:  scale(1.24);
  opacity: 0;
}
`

const MultiCirclesEL0 = styled.div<{
  isLoading: boolean;
  minHeight?: number | false;
  height?: number | false;
  maxHeight?: number;
  maxWidth?: number;
  width?: number;
  color?: string;
  bgColor?: string;
}>`
 
border-radius: 50%;
${({ bgColor }) =>
bgColor &&
css`
border: 1px solid ${bgColor};
color: ${bgColor};
`}
width: 100px;
height: 100px;
text-align: center;
justify-content: space-between;
position: relative;
left: 14px;
top: -125px;
${({ isLoading }) =>
isLoading &&
css`
animation: 0.7s ${rotate0} linear infinite;
`}

`
const MultiCirclesEL1 = styled.div`
display: block;
position: relative;
top: 15%;

border: 1px solid;
border-radius: 50%;
margin: auto;
width:70%;
height: 70%;



`
const MultiCirclesEL2 = styled.div`
 width:70%;
  height: 70%;
  margin: auto;
  border: 1px solid;
  border-radius: 50%;
  top: 15%;
  display: block;
 position: relative;


`

const MultiCirclesEL3 = styled.div`
width:70%;
height: 70%;
margin: auto;
border: 1px solid ;
border-radius: 50%;
top: 15%;
display: block;
position: relative;



`
const MultiCirclesEL4 = styled.div`
width:70%;
height: 70%;
margin: auto;
border: 2px solid ;
border-radius: 50%;
top: 15%;
display: block;
position: relative;

`
const WraperLogoPSfinance = styled.div`
width: auto;
height: auto;
margin: auto;
`

const LogoPSfinance = styled.div<{
  isLoading: boolean;
  minHeight?: number | false;
  height?: number | false;
  maxHeight?: number;
  maxWidth?: number;
  width?: number;
  color?: string;
  bgColor?: string;
}>`
width: 140px;
height: 100px;
padding: none;

background-color: #1F0D35;
${({ bgColor }) =>
bgColor &&
css`
background-color: ${bgColor};
`}
z-index: 0;
font-size: 100px;
line-height: 80px;
font-style: oblique;
color: #FEBD23;
text-align: start;
font-family: "Segoe UI";
font-weight: 800;
margin: auto;
p{
text-align: start;
font-family: Segoe UI;
font-style: normal;
font-weight: 400;
font-size: 17.6182px;
line-height: 10px;
position: relative;
top: -8px;
z-index: 2;

}

`
const TextLogo = styled.div`
text-align: center;
width: 110%;
height: 150%;
font-weight: bold;
position: relative;
top: -140px;
font-size: 100px;
font-style: oblique;
line-height: 150px;
background: #000;
color: #FFF;
mix-blend-mode: multiply;         
`

const ColLoaderBody = styled.div`
text-align: center;
width: 100%;
margin: auto;
margin-top: 0;
height: 100%;
color: #FFF;
mix-blend-mode: multiply;   
transform-style: preserve-3d;
animation: ${rotateHorizontal} 2s infinite linear;

`

interface PsLoaderProps {
  isLoading: boolean
  minHeight?: number | false
  height?: number | false
  maxHeight?: number
  maxWidth?: number
  width?: number
  color?: string
  bgColor?: string
}

export function MultiCircles({
  isLoading = true,
  minHeight = false,
  height = 90,
  maxHeight = 90,
  maxWidth= 420,
  width = 90,
  bgColor = "#1F0D35"
 
}: PsLoaderProps) {
return(
  <MultiCirclesEL0 isLoading={isLoading} bgColor={bgColor}>
    <MultiCirclesEL1 >
      <MultiCirclesEL2 >
        <MultiCirclesEL3 >
          {/* <MultiCirclesEL4 >

          </MultiCirclesEL4> */}
        </MultiCirclesEL3>
      </MultiCirclesEL2>
    </MultiCirclesEL1>
  </MultiCirclesEL0>
)
}

export function PsLoader({
  isLoading = true,
  minHeight = false,
  height = 90,
  maxHeight = 90,
  maxWidth= 420,
  width = 90,
  color = "#FEBD23",
  bgColor = "#1F0D35"
 
}: PsLoaderProps) {
  return(
    <WraperLogoPSfinance>
    <LogoPSfinance isLoading={isLoading} bgColor={bgColor}>
      PS
      <p >Finance</p>
      <MultiCircles isLoading={isLoading} bgColor={bgColor} color={bgColor}/>
        {/* <TextLogo> 
          PS
        </TextLogo> */}
      
    </LogoPSfinance>
    </WraperLogoPSfinance>
  )
  }




/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;

export default function Loader({
  size = '16px',
  stroke,
  strokeWidth,
  redesignFlag,
  ...rest
}: {
  size?: string
  stroke?: string
  strokeWidth?: number
  redesignFlag?: boolean
  [k: string]: any
}) {
  return (
    <StyledSVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      stroke={stroke}
      {...rest}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth={strokeWidth ?? '2.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSVG>
  )
}

export function ColLoader(){
  return (
    <ColLoaderBody>
    <img src={Col} width={"100%"}  alt="" />
    </ColLoaderBody>
  )
}