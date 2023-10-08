import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import GithubBtn from '../components/github-btn';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || userInfo.email === '' || userInfo.password === '') {
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log In</Title>
      <Form onSubmit={onSubmit}>
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
        <Input type='submit' value={isLoading ? 'Loading...' : 'Log in'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? <Link to='/create-account'>Create account</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
}
