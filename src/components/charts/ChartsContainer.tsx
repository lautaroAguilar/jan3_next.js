'use client';

import React, { useState } from 'react';
import BitcoinPriceChart from './BitcoinPriceChart';
import MarketMetricsChart from './MarketMetricsChart';
import TradingVolumeChart from './TradingVolumeChart';
import ChartFilters from './ChartFilters';

export interface TimeRange {
  value: '1D' | '7D' | '1M' | '3M' | '1Y' | 'ALL';
  label: string;
  days: number;
}

const timeRanges: TimeRange[] = [
  { value: '1D', label: '1 Day', days: 1 },
  { value: '7D', label: '7 Days', days: 7 },
  { value: '1M', label: '1 Month', days: 30 },
  { value: '3M', label: '3 Months', days: 90 },
  { value: '1Y', label: '1 Year', days: 365 },
  { value: 'ALL', label: 'All Time', days: 0 },
];

export default function ChartsContainer() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[2]); // Default to 1M
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['price', 'volume']);

  return (
    <div className="space-y-8">
      {/* Chart Filters */}
      <ChartFilters
        timeRanges={timeRanges}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
        availableMetrics={[
          { id: 'price', label: 'Price', color: '#f97316' },
          { id: 'volume', label: 'Volume', color: '#0d9488' },
          { id: 'marketcap', label: 'Market Cap', color: '#8b5cf6' },
          { id: 'dominance', label: 'BTC Dominance', color: '#ef4444' },
        ]}
        selectedMetrics={selectedMetrics}
        onMetricsChange={setSelectedMetrics}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bitcoin Price Chart */}
        <div className="col-span-1 xl:col-span-2">
          <BitcoinPriceChart timeRange={selectedTimeRange} />
        </div>

        {/* Market Metrics */}
        {selectedMetrics.includes('marketcap') && (
          <div className="bg-white rounded-lg shadow-sm border">
            <MarketMetricsChart timeRange={selectedTimeRange} />
          </div>
        )}

        {/* Trading Volume */}
        {selectedMetrics.includes('volume') && (
          <div className="bg-white rounded-lg shadow-sm border">
            <TradingVolumeChart timeRange={selectedTimeRange} />
          </div>
        )}
      </div>

      {/* Key Insights Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">$43,250</div>
            <div className="text-sm text-gray-600">Current Price</div>
            <div className="text-xs text-green-600 mt-1">+2.4% (24h)</div>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">$847B</div>
            <div className="text-sm text-gray-600">Market Cap</div>
            <div className="text-xs text-green-600 mt-1">+1.8% (24h)</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">52.7%</div>
            <div className="text-sm text-gray-600">BTC Dominance</div>
            <div className="text-xs text-red-600 mt-1">-0.3% (24h)</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">$28.5B</div>
            <div className="text-sm text-gray-600">24h Volume</div>
            <div className="text-xs text-green-600 mt-1">+12.7% (24h)</div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <strong>Note:</strong> These charts display sample data for demonstration purposes. 
              In a production environment, this would connect to real-time cryptocurrency APIs 
              like CoinGecko, Binance, or CoinMarketCap for live market data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}