import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import AppContext from '../context/AppContext';
import Modal from './Modal';

const TokensModal = ({
  show,
  onClose,
  title,
  handleTokenChange,
  target,
  tokenList,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, changeTheme } = useContext(AppContext);

  console.log(tokenList, 'HERE IS THE TOKEN LIST');
  const handleSelect = address => {
    handleTokenChange(address);
    onClose();
  };
  useEffect(() => {}, []);

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      modalStyle={{ height: 'auto' }}
    >
      <StyledTokensModal theme_={theme}>
        {tokenList?.map((v, i) => (
          <span className="token" onClick={() => handleSelect(v.address)}>
            <h3>{v.symbol}</h3>
          </span>
        ))}
      </StyledTokensModal>
    </Modal>
  );
};
const StyledTokensModal = styled.div`
  padding: 2rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 30rem;
  overflow-y: scroll;
  .token {
    display: flex;
    flex-flow: column wrap;
    border-radius: 1rem;
    background: ${({ theme_ }) => (theme_ ? '#16161A' : '#ffffff')};
    background: blue;
    background: ${({ theme_ }) => (theme_ ? '#24242b' : '#ffffff')};
    padding: 1rem;
    cursor: pointer;
  }
`;
export default TokensModal;
