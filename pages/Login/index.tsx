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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const auth = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      console.log('로그인이벤트');
      auth.signin(email, password);
    },
    [email, password],
  );

  if (user) {
    console.log('----login된 상태입니다.----');
    console.log(user);
    console.log('---------------------------');
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
