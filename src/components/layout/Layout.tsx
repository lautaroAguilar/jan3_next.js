import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { GhostSettings } from '@/lib/ghost';

interface LayoutProps {
  children: React.ReactNode;
  settings?: GhostSettings;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  settings,
  title,
  description,
}: LayoutProps) {

  return (
    <>
      <Head>
        <title>{title || settings?.title || 'JAN3'}</title>
        <meta name="description" content={description || settings?.description || 'Building a prosperous future with Bitcoin and JAN3'} />
      </Head>
      <div className="min-h-screen relative">
        <Header settings={settings} />
        <main>
          {children}
        </main>
        <Footer settings={settings} />
      </div>
    </>
  );
}
