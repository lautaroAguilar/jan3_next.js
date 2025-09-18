import Layout from '@/components/layout/Layout';
import { GhostAPI, GhostPost } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog',
  description: 'Latest insights on Bitcoin, cryptocurrency, and the future of finance',
};

export default async function BlogPage() {
  let settings = undefined;
  let posts: GhostPost[] = [];
  let featuredPosts: GhostPost[] = [];
  
  try {
    // Fetch Ghost settings and posts
    const ghostSettings = await GhostAPI.getSettings();
    settings = ghostSettings as any;
    
    // Get regular blog posts (exclude gallery and press)
    posts = await GhostAPI.getBlogPosts(12);
    
    // Get featured posts for hero section
    featuredPosts = await GhostAPI.getFeaturedPosts(3);
  } catch (error) {
    console.log('Ghost CMS not configured yet, using fallback content');
  }

  return (
    <Layout 
      settings={settings}
      title="Blog"
      description="Latest insights on Bitcoin, cryptocurrency, and the future of finance"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 to-teal-50 py-16">
          <div className="jan3-container">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                JAN3 Blog
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Insights, analysis, and updates on Bitcoin, hyperbitcoinization, 
                and the future of decentralized finance.
              </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {post.feature_image && (
                        <div className="aspect-video relative">
                          <Image
                            src={post.feature_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <span>{formatDate(post.published_at)}</span>
                          <span>•</span>
                          <span>{post.reading_time} min read</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-orange-500 transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            By {post.primary_author?.name}
                          </span>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All Posts */}
        <div className="jan3-container py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500">
                Connect Ghost CMS to start publishing blog posts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {post.feature_image && (
                    <div className="aspect-video relative">
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{formatDate(post.published_at)}</span>
                      <span>•</span>
                      <span>{post.reading_time} min read</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-orange-500 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        By {post.primary_author?.name}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-orange-50 border-t border-orange-100">
          <div className="jan3-container py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-gray-600 mb-6">
                Get the latest Bitcoin insights and JAN3 updates delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}