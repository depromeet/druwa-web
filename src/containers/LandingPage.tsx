import React from 'react';
import { useSelector } from 'react-redux';
import Landing from '../components/Landing';
import { selectUser } from '../stores/selectors';

export default function LandingPage() {
  const user = useSelector(selectUser) ?? undefined;

  return (
    <>
      <Landing login={user} />
    </>
  );
}
