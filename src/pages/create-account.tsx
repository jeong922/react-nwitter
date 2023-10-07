import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';

export default function CreateAccount() {
  const navigate = useNavigate();
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isLoading ||
      userInfo.name === '' ||
      userInfo.email === '' ||
      userInfo.password === ''
    ) {
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: userInfo.name,
      });
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
      <Title>Join</Title>
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
      <Switcher>
        Already have an account? <Link to='/login'>Log in</Link>
      </Switcher>
    </Wrapper>
  );
}
