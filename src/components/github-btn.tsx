import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useState } from 'react';
import { Error } from './auth-components';
import { FirebaseError } from 'firebase/app';

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubBtn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src='/github-logo.svg' />
        Continue with Github
      </Button>
      {error !== '' ? <Error>{error}</Error> : null}
    </>
  );
}
