import GhostContentAPI from '@tryghost/content-api';

// Initialize Ghost Content API with fallback for build time
let ghost: any;

try {
  if (process.env.GHOST_URL && process.env.GHOST_CONTENT_API_KEY) {
    ghost = new GhostContentAPI({
      url: process.env.GHOST_URL,
      key: process.env.GHOST_CONTENT_API_KEY,
      version: 'v5.0'
    });
    console.log('Ghost CMS configured successfully');
  } else {
    // Create a dummy client for build time or when not configured
    ghost = null as any;
    console.log('Ghost CMS not configured');
  }
} catch (error) {
  console.warn('Ghost CMS configuration invalid, using fallback');
  ghost = null as any;
}

export { ghost };

// Types for Ghost content
export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string | null;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
  primary_author: GhostAuthor;
  primary_tag: GhostTag | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface GhostPage {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string | null;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
  primary_author: GhostAuthor;
  primary_tag: GhostTag | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
  visibility: string;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  canonical_url: string | null;
  accent_color: string | null;
  url: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
}

export interface GhostSettings {
  title: string;
  description: string;
  logo: string | null;
  icon: string | null;
  accent_color: string | null;
  cover_image: string | null;
  facebook: string | null;
  twitter: string | null;
  lang: string;
  timezone: string;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  navigation: Array<{
    label: string;
    url: string;
  }>;
  secondary_navigation: Array<{
    label: string;
    url: string;
  }>;
}

// Utility functions for fetching Ghost content
export class GhostAPI {
  static async getPosts(options?: {
    limit?: number;
    filter?: string;
    include?: string;
    order?: string;
  }) {
    if (!ghost) {
      throw new Error('Ghost CMS not configured');
    }
    try {
      return await ghost.posts.browse({
        limit: options?.limit || 15,
        filter: options?.filter,
        include: options?.include as any || 'tags,authors',
        order: options?.order || 'published_at DESC',
      } as any);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async getPost(slug: string, options?: { include?: string }) {
    try {
      return await ghost.posts.read(
        { slug },
        { include: options?.include as any || 'tags,authors' } as any
      );
    } catch (error) {
      console.error(`Error fetching post ${slug}:`, error);
      throw error;
    }
  }

  static async getPages(options?: {
    limit?: number;
    filter?: string;
    include?: string;
  }) {
    try {
      return await ghost.pages.browse({
        limit: options?.limit as any || 'all',
        filter: options?.filter,
        include: options?.include as any || 'tags,authors',
      } as any);
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  static async getPage(slug: string, options?: { include?: string }) {
    try {
      return await ghost.pages.read(
        { slug },
        { include: options?.include as any || 'tags,authors' } as any
      );
    } catch (error) {
      console.error(`Error fetching page ${slug}:`, error);
      throw error;
    }
  }

  static async getTags(options?: {
    limit?: number;
    filter?: string;
    include?: string;
  }) {
    try {
      return await ghost.tags.browse({
        limit: options?.limit as any || 'all',
        filter: options?.filter,
        include: options?.include as any,
      } as any);
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  static async getTag(slug: string, options?: { include?: string }) {
    try {
      return await ghost.tags.read(
        { slug },
        { include: options?.include as any || 'count.posts' } as any
      );
    } catch (error) {
      console.error(`Error fetching tag ${slug}:`, error);
      throw error;
    }
  }

  static async getAuthors(options?: {
    limit?: number;
    filter?: string;
    include?: string;
  }) {
    try {
      return await ghost.authors.browse({
        limit: options?.limit as any || 'all',
        filter: options?.filter,
        include: options?.include as any,
      } as any);
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  }

  static async getAuthor(slug: string, options?: { include?: string }) {
    try {
      return await ghost.authors.read(
        { slug },
        { include: options?.include as any || 'count.posts' } as any
      );
    } catch (error) {
      console.error(`Error fetching author ${slug}:`, error);
      throw error;
    }
  }

  static async getSettings() {
    if (!ghost) {
      throw new Error('Ghost CMS not configured');
    }
    try {
      return await ghost.settings.browse();
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  // Helper methods for specific JAN3 theme needs
  static async getFeaturedPosts(limit = 1) {
    return this.getPosts({
      limit,
      filter: 'featured:true+tags:-hash-gallery',
      order: 'published_at DESC'
    });
  }

  static async getCarouselPosts(limit = 3) {
    return this.getPosts({
      limit,
      filter: 'tag:hash-carousel+tags:-hash-gallery',
      order: 'published_at DESC'
    });
  }

  static async getBlogPosts(limit = 14) {
    return this.getPosts({
      limit,
      filter: 'tag:-hash-gallery+tag:-press',
      order: 'published_at DESC'
    });
  }

  static async getPressPosts(limit = 15) {
    return this.getPosts({
      limit,
      filter: 'tag:press',
      order: 'published_at DESC'
    });
  }
}
