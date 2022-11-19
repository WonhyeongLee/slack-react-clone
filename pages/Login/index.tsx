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
import { Link } from 'react-router-dom';
import { useUser } from '@hooks/useUser';

const LogIn = () => {
  //user 확인 useQuery
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const auth = useAuth();
  const { user } = useUser();
  if (user) {
    console.log('----login된 상태입니다.----');
    console.log(user);
    console.log('---------------------------');
  }
  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      console.log('로그인이벤트');
      auth.signin(email, password);
    },
    [email, password],
  );

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id="container">
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
          {logInError && (
            <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
          )}
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
