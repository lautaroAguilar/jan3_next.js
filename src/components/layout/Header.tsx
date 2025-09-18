"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GhostSettings } from "@/lib/ghost";
import Navigation from "./Navigation";
import LanguageChooser from "./LanguageChooser";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import useBreakpoint from "@/hooks/useBreakpoint";

interface HeaderProps {
  settings?: GhostSettings;
}

export default function Header({ settings }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { isDesktop } = useBreakpoint();
  const isMobileOrTablet = !isDesktop; // treat < lg as mobile/tablet

  // Use white logo for dark header, fallback to regular logo, then to white logo from public folder
  const getLogoSrc = () => {
    if (settings?.logo) {
      return settings.logo;
    }
    return "/images/jan3_logo_white.svg"; // Use white logo for dark header
  };

  const logoSrc = getLogoSrc();
  const logoAlt = settings?.title || "JAN3";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".jan3-header-mobile-container") &&
        !target.closest("#jan3-header-burger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  

  return (
    <>
      <header className="jan3-container absolute top-10 left-10 right-10 h-[80px] bg-jan3-black text-white rounded-full z-50">
        {isMobileOrTablet ? (
          <>
            <div className="flex items-center justify-between p-4">
              <Link href="/">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-8 w-auto"
                  width={120}
                  height={32}
                />
              </Link>

              <div className="flex items-center gap-4">
                <LanguageChooser onToggle={toggleLanguageMenu} />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Mobile Language Menu */}
            {isLanguageMenuOpen && (
              <div className="bg-gradient-to-br from-gray-900 to-slate-800 border-t border-white/10">
                <div className="p-4">
                  {/* Mobile localization list will go here */}
                </div>
              </div>
            )}

            {/* Mobile Navigation Menu */}
            <div
              className={cn(
                "bg-gradient-to-br from-gray-900 to-slate-800 border-t border-white/10 transition-all duration-300",
                isMobileMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
              )}
            >
              <div className="p-4">
                <Navigation navigation={settings?.navigation} isMobile />

                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white hover:bg-white/10 w-full justify-start"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Desktop Header */}
            <div className="w-full h-full flex items-center justify-between max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-8">
                <Link href="/">
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    className="h-10 w-auto"
                    width={150}
                    height={40}
                  />
                </Link>

                <div className="w-px h-8 bg-white/20" />

                <Navigation navigation={settings?.navigation} />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-teal-300"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>

                <div className="w-px h-8 bg-white/20" />

                <div className="relative">
                  <LanguageChooser onToggle={toggleLanguageMenu} />
                </div>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-teal-500 hover:border-teal-500 hover:text-white"
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
