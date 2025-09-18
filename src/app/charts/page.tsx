import Layout from '@/components/layout/Layout';
import ChartsContainer from '@/components/charts/ChartsContainer';
import { GhostAPI } from '@/lib/ghost';

export const metadata = {
  title: 'Charts',
  description: 'Bitcoin and cryptocurrency charts and analytics',
};

export default async function ChartsPage() {
  let settings = undefined;
  
  try {
    const ghostSettings = await GhostAPI.getSettings();
    settings = ghostSettings as any;
  } catch (error) {
    console.log('Ghost CMS not configured yet, using default settings');
  }

  return (
    <Layout 
      settings={settings}
      title="Charts"
      description="Bitcoin and cryptocurrency charts and analytics"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="jan3-container py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bitcoin & Crypto Charts
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Monitor Bitcoin price movements, market trends, and key metrics that matter 
              for understanding the path to hyperbitcoinization.
            </p>
          </div>
          
          <ChartsContainer />
        </div>
      </div>
    </Layout>
  );
}