import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((info) => ({
      ...info,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // create an account
      // set the name of the user.
      // redirect to the home page
    } catch (e) {
      // setError
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name='name'
          value={userInfo.name ?? ''}
          placeholder='Name'
          type='text'
          required
          onChange={onChange}
        />
        <Input
          name='email'
          value={userInfo.email ?? ''}
          placeholder='Email'
          type='email'
          required
          onChange={onChange}
        />
        <Input
          name='password'
          placeholder='password'
          type='password'
          value={userInfo.password ?? ''}
          required
          onChange={onChange}
        />
        <Input
          type='submit'
          value={isLoading ? 'Loading...' : 'Create Account'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
