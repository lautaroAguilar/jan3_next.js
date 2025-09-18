'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, GlobeIcon } from 'lucide-react';

interface LanguageChooserProps {
  onToggle?: () => void;
  currentLanguage?: string;
}

export default function LanguageChooser({ onToggle, currentLanguage = 'en' }: LanguageChooserProps) {
  // This will be expanded with actual i18n implementation
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    // Add more languages as needed
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-white hover:bg-white/10 hover:text-teal-300 gap-2"
      onClick={onToggle}
      aria-label="Choose language"
    >
      <GlobeIcon className="h-4 w-4" />
      <span className="hidden sm:inline-block text-sm font-medium">
        {getCurrentLanguage().name}
      </span>
      <ChevronDownIcon className="h-4 w-4" />
    </Button>
  );
}
