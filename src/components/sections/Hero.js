import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../utils/Connecters";
import {truncateAddress, toHex} from "../../utils/utils";
// import { Toast } from 'react-toastify/dist/components';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [sign, setSign] = useState("");


  const { library,
    chainId,
    account,
    activate,
    deactivate,
    active } = useWeb3React();
    console.log("%c Line:47 🧀 chainId", "color:#465975", chainId);

    useEffect(() => {
      if(chainId && chainId != 5){
        window.alert("Please change to goerli network");
        switchNetwork();
      }
    })
 


  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };


  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const connectMetamask = (e) => {
    e.preventDefault();
    activate(connectors.injected);
    setProvider("injected");
  }

  const connectArgent = (e) => {
    e.preventDefault();
    activate(connectors.walletConnect);
    setProvider("walletConnect");
  }

  const disconnectWallet = (e) => {
    e.preventDefault();
    deactivate();
    setProvider("");
    setSign("");
  }

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(5) }]
      });
    } catch (switchError) {
      console.log("%c Line:93 🥑 switchError", "color:#3f7cff", switchError);
      
    }
  };
  
  const signMessage = async () => {
    if (!library) return;
    try {
      let message = "try it!";
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      console.log(message);
      setSign(signature);
    } catch (error) {
      console.log(error);
    }
  };

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Landing template for <span className="text-color-primary">startups</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <p>{`Your Wallet address : ${truncateAddress(account)}`}</p>
                {sign ? <p>Signed Successfully!</p> : ""}
                <ButtonGroup>
                  {!active ? (<>
                    <Button tag="a" color="primary" wideMobile variant="outline"
                    onClick={connectArgent}
                    w="100%"
                    >
                    Argent
                    </Button>
                    <Button tag="a" color="primary" wideMobile variant="outline"
                    onClick={connectMetamask}
                    w="100%"
                    >
                    Metamask</Button></>
                  )
                   :  <Button tag="a" color="primary" wideMobile variant="outline"
                  onClick={disconnectWallet}
                  w="100%">
                        Disconnect
                        </Button> }

                  {!active ? (
                      <Button tag="a" color="dark" wideMobile onClick={signMessage} disabled>
                        Please Connect Wallet!
                      </Button>
                  ): <Button tag="a" color="dark" wideMobile onClick={signMessage}>
                  Provide Sign
                  </Button>}
                  
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;