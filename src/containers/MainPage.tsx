import React from 'react';
import MainCarousel from '../components/MainCarousel';
import MainFooter from '../components/MainFooter';
import MainHeader from './MainHeader';

export default function MainPage() {
  return (
    <main>
      <MainHeader />
      <MainCarousel />
      <MainFooter />
    </main>
  );
}
