// src/components/ResponsiveWrapper.tsx

'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const MainContent = styled.div`
  padding: 20px;
  /* Add additional styles as needed */
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
`;

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
          <h1>Screen Too Small</h1>
          <p>
            This site is best viewed on a tablet or larger device. Please switch to desktop mode for the best experience.
          </p>
        </WarningContainer>
      ) : (
        <MainContent>{children}</MainContent>
      )}
    </>
  );
};

export default ResponsiveWrapper;
