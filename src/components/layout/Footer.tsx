import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GhostSettings } from '@/lib/ghost';
import Navigation from './Navigation';

interface FooterProps {
  settings?: GhostSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialMediaLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/JAN3com',
      icon: '/images/x_logo.svg'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/jan3com',
      icon: '/images/facebook_logo.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/jan3',
      icon: '/images/linkedin_logo.svg'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/jan3com',
      icon: '/images/instagram_logo.svg'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@JAN3com',
      icon: '/images/youtube_logo.svg'
    }
  ];

  return (
    <footer className="jan3-footer bg-black text-white py-12">
      <div className="jan3-container jan3-footer-container max-w-6xl mx-auto px-4">
        
        {/* Top section with social media and navigation */}
        <div className="jan3-footer-socials-and-nav jan3-footer-prefer-row mb-8">
          {/* Desktop Navigation */}
          <div className="jan3-footer-nav jan3-footer-desktop hidden md:block mb-6 md:mb-0">
            <Navigation 
              navigation={settings?.secondary_navigation} 
              className="flex flex-wrap gap-6"
            />
          </div>
          
          {/* Social Media Links */}
          <div className="jan3-default-social-media flex items-center gap-4 justify-center md:justify-start">
            {socialMediaLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="jan3-default-social-media-icon hover:opacity-70 transition-opacity"
                aria-label={social.name}
              >
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Logo and message */}
        <div className="jan3-footer-logo-and-message jan3-footer-prefer-column flex flex-col items-center text-center mb-8">
          <Image
            src="/images/jan3_logo_white.svg"
            alt="JAN3 logo"
            className="jan3-footer-logo mb-4"
            width={120}
            height={40}
          />
          <h5 className="jan3-footer-message text-lg font-semibold tracking-wider">
            ACCELERATING HYPERBITCOINIZATION
          </h5>
        </div>

        {/* Bottom section with mobile navigation, notices, and copyright */}
        <div className="jan3-footer-copyright-and-notices jan3-footer-prefer-row flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-800">
          
          {/* Mobile Navigation */}
          <div className="jan3-footer-nav jan3-footer-mobile md:hidden order-1">
            <Navigation 
              navigation={settings?.secondary_navigation}
              className="flex flex-wrap gap-4 justify-center text-sm"
            />
          </div>

          {/* Legal Links */}
          <div className="jan3-footer-notices flex gap-6 order-2 md:order-1">
            <Link
              href="/privacy-policy"
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service" 
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <div className="jan3-footer-copyright text-sm text-gray-400 order-3 md:order-2">
            &copy; 2022-{currentYear} JAN3
          </div>
        </div>
      </div>
    </footer>
  );
}
