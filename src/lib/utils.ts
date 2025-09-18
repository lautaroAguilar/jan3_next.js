import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, format?: 'short' | 'long' | 'medium'): string {
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    case 'long':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    case 'medium':
    default:
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
  }
}

/**
 * Convert Ghost URL to relative URL for Next.js routing
 */
export function convertGhostUrl(ghostUrl: string, baseUrl?: string): string {
  if (!ghostUrl) return '/';
  
  try {
    const url = new URL(ghostUrl);
    return url.pathname;
  } catch {
    // If it's already a relative URL
    return ghostUrl.startsWith('/') ? ghostUrl : `/${ghostUrl}`;
  }
}

/**
 * Check if string is external URL
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}
