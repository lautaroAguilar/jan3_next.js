'use client';

import React from 'react';
import Link from 'next/link';
import { convertGhostUrl, isExternalUrl, cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

interface NavigationItem {
  label: string;
  url: string;
}

interface DropdownItem {
  label: string;
  url: string;
}

interface NavigationProps {
  navigation?: NavigationItem[];
  isMobile?: boolean;
  className?: string;
}

// Build dropdown items dynamically from the flat navigation array using the pattern "Parent > Child"
const getDropdownItems = (parentLabel: string, items: NavigationItem[]): DropdownItem[] => {
  return items
    .filter(it => it.label.includes(' > '))
    .filter(it => it.label.split(' > ')[0].trim().toLowerCase() === parentLabel.trim().toLowerCase())
    .map(it => {
      const [, childLabel] = it.label.split(' > ');
      return { label: childLabel.trim(), url: convertGhostUrl(it.url) };
    });
};

export default function Navigation({ navigation, isMobile, className }: NavigationProps) {
  if (!navigation || navigation.length === 0) {
    return null;
  }

  // Desktop navigation with ShadCN NavigationMenu
  if (!isMobile) {
    return (
      <NavigationMenu className={cn('', className)}>
        <NavigationMenuList>
          {navigation
            .filter(item => !item.label.includes(' > '))
            .map((item, index) => {
              const href = isExternalUrl(item.url) ? item.url : convertGhostUrl(item.url);
              const dropdownItems = getDropdownItems(item.label, navigation);
              const hasDropdown = dropdownItems.length > 0;

              return (
                <NavigationMenuItem key={index}>
                  {hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-teal-300 data-[active]:bg-white/10 data-[state=open]:bg-white/10 text-sm font-medium uppercase tracking-wide">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-1 p-3 w-[240px]">
                          {dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.url}
                              className="group h-9 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                              <div className="text-sm font-medium leading-none group-hover:text-primary">
                                {dropdownItem.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    isExternalUrl(item.url) ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-teal-300 focus:bg-white/10 focus:text-teal-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-teal-300 focus:bg-white/10 focus:text-teal-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </NavigationMenuItem>
              );
            })}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // Mobile navigation with ShadCN DropdownMenu
  return (
    <nav className={cn('flex flex-col space-y-2', className)}>
      {navigation
        .filter(item => !item.label.includes(' > '))
        .map((item, index) => {
          const href = isExternalUrl(item.url) ? item.url : convertGhostUrl(item.url);
          const dropdownItems = getDropdownItems(item.label, navigation);
          const hasDropdown = dropdownItems.length > 0;

          return (
            <div key={index}>
              {hasDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-white hover:bg-white/10 hover:text-teal-300 text-lg font-medium uppercase tracking-wide"
                    >
                      {item.label}
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <DropdownMenuItem key={dropdownIndex} asChild>
                        <Link
                          href={dropdownItem.url}
                          className="w-full cursor-pointer"
                        >
                          <div className="font-medium">{dropdownItem.label}</div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                isExternalUrl(item.url) ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-2 text-lg font-medium text-white hover:bg-white/10 hover:text-teal-300 rounded-md transition-colors uppercase tracking-wide"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="block w-full text-left px-4 py-2 text-lg font-medium text-white hover:bg-white/10 hover:text-teal-300 rounded-md transition-colors uppercase tracking-wide"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          );
        })}
    </nav>
  );
}