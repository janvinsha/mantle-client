import React, { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import AppContext from '../context/AppContext';
import nftImg from '../assets/images/HM.png';
import defPic from '../assets/images/bg.png';
import sanitizeIpfsUrl from '../utils/sanitizeIpfsUrl';
import { getProfile } from '../utils/contract';
import { useProfile } from '../hooks/useProfile';

const NftCard = ({ nft }) => {
  const { theme, currentAccount } = useContext(AppContext);
  let navigate = useNavigate();

  const { profile } = useProfile(
    nft?.seller || '0x659CE0FC2499E1Fa14d30F5CD88aD058ba490e39'
  );
  return (
    <StyledNftCard
      theme_={theme}
      onClick={() => navigate(`/nfts/${nft?.tokenId}`)}
    >
      <img src={sanitizeIpfsUrl(nft?.image)} alt="img" />
      <div className="nft-desc">
        <span className="nft_title">
          <h3>{nft?.name}</h3>{' '}
          <p>{ethers.utils.formatUnits(nft?.price?.toString(), 'ether')} BIT</p>
        </span>

        <span className="nft_sale">
          <span className="nft_author">
            {' '}
            <img
              src={sanitizeIpfsUrl(profile?.dp) || defPic}
              alt="img"
              className="nft_author_image"
            />
            <small>{profile?.name || 'Comrade'}</small>{' '}
          </span>{' '}
          <p>For Sale</p>
        </span>
      </div>
    </StyledNftCard>
  );
};

const StyledNftCard = styled(motion.div)`
  width: 100%;
  padding: 0rem 0rem;
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
  background: ${({ theme_ }) =>
    theme_ ? 'rgb(23, 24, 24,0.9)' : 'rgb(248, 248, 248,0.9)'};
  background: ${({ theme_ }) => (theme_ ? '#24242b' : '#f2f2f2')};
  cursor: pointer;
  &:hover {
    -moz-box-shadow: 0 0 4.5px #ccc;
    -webkit-box-shadow: 0 0 4.5px #ccc;
    box-shadow: 0 0 4.5px #ccc;
  }

  overflow: hidden;
  img {
    height: 15rem;
    width: 100%;
    object-fit: cover;
  }

  display: flex;
  flex-flow: column wrap;
  width: 100%;
  .nft-desc {
    display: flex;
    flex-flow: column wrap;
    padding: 0rem 1rem;
    padding-bottom: 1.5rem;
    gap: 0.5rem;

    .nft_title,
    .nft_sale {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      gap: 0.5rem;
      align-items: center;

      .nft_author_image {
        width: 1.5rem;
        height: 1.5rem;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .nft_title {
      h3 {
        font-weight: 500;
      }
      p {
        color: #0592ec;
      }
    }
    .nft_sale {
      .nft_author {
        display: flex;
        align-items: center;
        gap: 0.2rem;
      }
    }
  }
`;

export default NftCard;
