import React from 'react';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { SkipLink } from '@/components/skip-link';
import { BackToTop } from '@/components/back-to-top';
import LenisScroll from '@/components/lenis-scroll';

export const metadata = {
    title: 'S&N Devs',
    description: 'S&N Devs — portfolio and service studio of Noah & Shaun.',
    appleWebApp: {
        title: 'S&N Devs',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LenisScroll />
            <SkipLink />
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
        </>
    );
}
