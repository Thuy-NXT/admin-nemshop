import React from 'react';
import { Outlet } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
interface Loading {
  loading: boolean;
}
const GlobalLoading = (props: Loading) => {
  const { loading } = props;
  return (
    <>
      <ScaleLoader
        loading={loading}
        cssOverride={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 99999,
        }}
        color="#fff"
      />
      <Outlet />
    </>
  );
};
export default GlobalLoading;
