'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import StickyBar from '@/components/StickyBar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import AuthorityBadges from '@/components/AuthorityBadges';
import Comparison from '@/components/Comparison';
import HowItWorks from '@/components/HowItWorks';
import MockupGallery from '@/components/MockupGallery';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import ExitPopup from '@/components/ExitPopup';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <StickyBar onCTAClick={() => setModalOpen(true)} />
      <Header onCTAClick={() => setModalOpen(true)} />
      <main>
        <Hero onCTAClick={() => setModalOpen(true)} />
        <TrustStrip />
        <AuthorityBadges />
        <Comparison />
        <HowItWorks onCTAClick={() => setModalOpen(true)} />
        <MockupGallery />
        <Pricing onCTAClick={() => setModalOpen(true)} />
        <FAQ />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ExitPopup />
    </>
  );
}
