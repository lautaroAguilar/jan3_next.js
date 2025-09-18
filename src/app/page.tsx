import Layout from '@/components/layout/Layout';
import { GhostAPI } from '@/lib/ghost';
import { Suspense } from 'react';
import Link from 'next/link';

export default async function Home() {
  let settings = undefined;
  
  try {
    // Attempt to fetch Ghost settings
    // This will fail if Ghost is not configured yet, which is expected during setup
    const ghostSettings = await GhostAPI.getSettings();
    settings = ghostSettings as any; // Cast to match our interface
    console.log('Ghost CMS configured successfully', settings);
  } catch (error) {
    console.log('Ghost CMS not configured yet, using default settings');
  }

  return (
    <Layout 
      settings={settings}
      title="Home"
      description="Building a prosperous future with Bitcoin and JAN3"
    >
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/images/jan3_background.jpg)'
        }}
      >        
        {/* Main content */}
        <div className="relative w-full z-10 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
            {/* Left side - Main content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
                BUILD A PROSPEROUS FUTURE WITH BITCOIN AND JAN3
              </h1>
              
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                The economy of the 21st century will be built on Bitcoin. We provide the technologies 
                and solutions for individuals, enterprises, and nation-states to prepare for the future, 
                succeed, and be in charge of their own destiny.
              </p>
              
              <div className="mb-8 w-[200px] h-auto">
                <Link href="/about" className="flex py-10 bg-teal-400 text-black rounded-full hover:bg-teal-300 transition-colors text-lg font-semibold uppercase tracking-wide">
                  LEARN MORE
                </Link>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>✨ JAN3 Next.js Migration - Layout Components Ready</p>
                <p className="mt-2">
                  {settings ? (
                    `✅ Connected to Ghost CMS: ${settings.title}`
                  ) : (
                    `⚠️ Ghost CMS not configured yet. Please update your .env.local file.`
                  )}
                </p>
              </div>
            </div>
            
            {/* Right side - Card widget */}
            <div className="flex-shrink-0 ml-12">
              <div className="relative">
                {/* Main card */}
                <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-8 w-80 h-64 flex flex-col justify-center items-center text-center shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-2">SamRock</h2>
                  <p className="text-xl text-white opacity-90 mb-4">PROTOCOL</p>
                  <div className="text-white text-4xl mb-4">♣</div>
                </div>
                
                {/* Bottom info bar */}
                <div className="absolute -bottom-4 left-0 right-0 bg-gray-800 bg-opacity-90 rounded-lg px-4 py-2 flex justify-between items-center text-xs text-white">
                  <span className="truncate">SAMROCK PROTOCOL: CONNECTING WALLETS TO INVOICE...</span>
                  <span className="ml-2 text-teal-400">AQUA</span>
                </div>
                
                {/* Navigation arrows */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button className="w-12 h-12 rounded-full border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
