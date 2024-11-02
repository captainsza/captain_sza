// src/components/ResponsiveWrapper.tsx

'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;



const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  background-color: #f8f9fa;
  color: #333;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const WarningIcon = styled(FaExclamationTriangle)`
  color: #ffcc00;
  font-size: 3em;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkIsMobile();
      }, 150);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <WarningContainer role="alert" aria-live="assertive">
          <WarningIcon />
          <h1>Screen Too Small</h1>
          <p>
            This site is best viewed on a tablet or larger device. Please switch to desktop mode for the best experience.
          </p>
        </WarningContainer>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ResponsiveWrapper;