import { useAuth } from '@hooks/useAuth';
import React, { FC } from 'react';

const Workspace = ({ children }) => {
  const { signout } = useAuth();
  return (
    <div>
      <button onClick={signout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
