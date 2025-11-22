import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('entering');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('exiting');
    }
  }, [location.pathname, displayLocation.pathname]);

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('entering');
      }, 300); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div
      className={`page-transition page-transition-${transitionStage}`}
      style={{
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;

