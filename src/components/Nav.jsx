import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { AccountModal } from './index';
//Context

//Animations

import Hambuger from './Hambuger';
import HomeSearch from './HomeSearch';
import AppContext from '../context/AppContext';
import bg from '../assets/images/bg.png';
import darkLogo from '../assets/images/logo.png';
import whiteLogo from '../assets/images/logo.png';
import { useProfile } from '../hooks/useProfile';
const Nav = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(setMenuToggle);
  let isAuthenticated = true;
  const {
    connectWallet,
    isLoggedIn,
    changeTheme,
    theme,
    disconnectWeb3Modal,
    currentAccount,
  } = useContext(AppContext);
  const { profile } = useProfile(
    currentAccount || '0x659CE0FC2499E1Fa14d30F5CD88aD058ba490e39'
  );
  console.log('THISNIS THE PROFILE IN THE NAV', profile);
  useEffect(() => {
    setMenuToggle(false);
    setShowAccount(false);
  }, [pathname]);
  return (
    <StyledNav menuToggle={menuToggle} theme_={theme}>
      <motion.div className="left">
        <Link to="/">
          {!theme ? (
            <img src={whiteLogo} alt="img" />
          ) : (
            <img src={darkLogo} alt="img" />
          )}
          <h3>Mantle Market</h3>
        </Link>
      </motion.div>
      <div className="middle">
        <div className="link">
          <Link to="/explore" className={pathname == '/explore' && 'active'}>
            Explore
          </Link>
        </div>
        <div className="link">
          <Link to="/exchange" className={pathname == '/exchange' && 'active'}>
            Exchange
          </Link>
        </div>

        <HomeSearch className="link" />
      </div>
      <motion.div className="right">
        <button onClick={() => navigate('/create-nft')}>Create</button>
        {!currentAccount ? (
          <button onClick={() => connectWallet()} className="plain-btn">
            Connect
          </button>
        ) : (
          <button
            onClick={() => setShowAccount(!showAccount)}
            className="acct-btn"
          >
            <img src={profile?.dp || bg} /> <p>{profile?.name || 'Comrade'}</p>
          </button>
        )}
        <AccountModal
          show={showAccount}
          onClose={() => setShowAccount(false)}
          disconnect={disconnectWeb3Modal}
          account={currentAccount}
          user={profile}
        />
      </motion.div>
      <motion.div className="mobileNav">
        <span className="icon">
          <Hambuger
            open={menuToggle}
            onClick={() => setMenuToggle(!menuToggle)}
          />
        </span>
        <div className="menu">
          <span className="account"></span>
          <motion.div className="nav-links">
            <div className="link">
              <Link
                to="/explore"
                className={pathname == '/explore' && 'active'}
              >
                Explore
              </Link>
            </div>
            <div className="link">
              <Link
                to="/exchange"
                className={pathname == '/exchange' && 'active'}
              >
                Exchange
              </Link>
            </div>

            <div className="link">
              <Link
                to="/airdrop"
                className={pathname == '/airdrop' && 'active'}
              >
                Airdrop
              </Link>
            </div>

            <HomeSearch className="link" />

            <button onClick={() => navigate('/create-nft')}>Create</button>
            {!currentAccount ? (
              <button onClick={() => connectWallet()} className="plain-btn">
                Connect
              </button>
            ) : (
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="acct-btn"
              >
                <img src={profile?.dp || bg} />{' '}
                <p>{profile?.name || 'Comrade'}</p>
              </button>
            )}

            <AccountModal
              show={showAccount}
              onClose={() => setShowAccount(false)}
              disconnect={disconnectWeb3Modal}
              account={currentAccount}
              user={profile}
            />
          </motion.div>
        </div>
      </motion.div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 4rem;

  @media (max-width: 900px) {
    justify-content: space-between;
    padding: 2.5rem 1.5rem;
  }
  .left {
    width: 20%;
    @media (max-width: 900px) {
      width: auto;
      z-index: 3;
    }
    a {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    img {
      width: 2.3rem;
    }
    h3 {
      font-weight: bold;
      font-size: 1.4rem;
      /* background: -webkit-linear-gradient(#09e1ff, #03ff85);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent; */
    }
  }
  .middle {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    @media (max-width: 900px) {
      display: none;
    }
    .link {
      a {
        font-size: 1.2rem;
        &:hover {
          color: #0592ec;
        }
      }
      .active {
        color: #0592ec;
      }
    }
  }
  .right {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;

    @media (max-width: 900px) {
      display: none;
    }
    .icon {
      cursor: pointer;
      font-size: 1.3rem;
    }
  }
  .mobileNav {
    display: none;
    @media (max-width: 900px) {
      display: flex;
    }
    transition: all 0.5s;
    .icon {
      position: relative;
      z-index: 3;
    }
    .menu {
      padding: 2rem;
      padding-top: 7rem;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
      background: ${({ theme_ }) => (theme_ ? '#24242b' : '#f2f2f2')};
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transform: translateX(-100%);
      transform: ${({ menuToggle }) =>
        menuToggle ? 'translateX(0%)' : 'translateX(-100%)'};
      z-index: 2;
    }
    .nav-links {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
      a {
        font-size: 1.3rem;
        &:hover {
          color: #0592ec;
        }
      }
      .active {
      }
    }
    .account {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export default Nav;
