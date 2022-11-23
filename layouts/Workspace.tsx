import { useAuth } from '@hooks/useAuth';
import { useUser } from '@hooks/useUser';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Navigate } from 'react-router';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useUser();
  console.log('workspace');
  console.log(user);

  const { signout } = useAuth();

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        console.log('success');
        signout();
      });
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
