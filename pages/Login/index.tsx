import useInput from '@hooks/useInput';
import {
  Button,
  Error,
  Form,
  Header,
  Input,
  Label,
  LinkContainer,
} from '@pages/SignUp/style';
import { useAuth } from '@hooks/useAuth';
import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const auth = useAuth();
  const { user, isFetching } = useUser();

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      console.log('로그인이벤트');
      auth.signin(email, password);
    },
    [email, password],
  );

  // isFetching : 캐시에 데이터가 있던말던 데이터를 가져오고 있을 때는 true를 반환함을 이용해서 login->workspace로 이동하는 사이에 로딩중 구현
  if (isFetching) {
    return <div>Loading ......</div>;
  }
  if (user) {
    return <Navigate to="/workspace/channel" />;
  }

  return (
    <div id="container">
      {/* {user && <Navigate to="/workspace/channel" />} */}
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
