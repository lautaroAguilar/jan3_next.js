'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TimeRange } from './ChartsContainer';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MarketMetricsChartProps {
  timeRange: TimeRange;
}

// Generate sample market cap data
const generateMarketCapData = (days: number) => {
  const data = [];
  const labels = [];
  const baseMarketCap = 850; // Billion USD
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomVariation = (Math.random() - 0.5) * 0.08; // ±4% variation
    const trendFactor = Math.cos((i / days) * Math.PI * 2) * 0.03; // Cyclical trend
    const marketCap = baseMarketCap * (1 + randomVariation + trendFactor);
    
    data.push(marketCap);
    labels.push(date.toISOString().split('T')[0]);
  }

  return { data, labels };
};

// Generate sample dominance data
const generateDominanceData = (days: number) => {
  const data = [];
  const baseDominance = 52.5; // Percentage
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const randomVariation = (Math.random() - 0.5) * 0.04; // ±2% variation
    const trendFactor = Math.sin((i / days) * Math.PI * 3) * 0.02; // Wave pattern
    const dominance = baseDominance * (1 + randomVariation + trendFactor);
    
    data.push(Math.min(Math.max(dominance, 45), 60)); // Keep within realistic bounds
  }

  return data;
};

export default function MarketMetricsChart({ timeRange }: MarketMetricsChartProps) {
  const sampleData = useMemo(() => {
    const days = timeRange.days > 0 ? timeRange.days : 365;
    const marketCap = generateMarketCapData(days);
    const dominance = generateDominanceData(days);
    
    return {
      labels: marketCap.labels,
      marketCap: marketCap.data,
      dominance: dominance,
    };
  }, [timeRange]);

  const chartData = {
    labels: sampleData.labels,
    datasets: [
      {
        label: 'Market Cap (B USD)',
        data: sampleData.marketCap,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
        yAxisID: 'y',
      },
      {
        label: 'BTC Dominance (%)',
        data: sampleData.dominance,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `Market Metrics - ${timeRange.label}`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
        padding: 15,
      },
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#8b5cf6',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            if (label.includes('Market Cap')) {
              return `Market Cap: $${value.toFixed(1)}B`;
            } else if (label.includes('Dominance')) {
              return `BTC Dominance: ${value.toFixed(1)}%`;
            }
            return `${label}: ${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          maxTicksLimit: 8,
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Market Cap (Billions USD)',
          color: '#8b5cf6',
          font: {
            size: 11,
            weight: 'normal' as const,
          },
        },
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
        },
        ticks: {
          color: '#8b5cf6',
          callback: function(value: any) {
            return '$' + value.toFixed(0) + 'B';
          },
          font: {
            size: 11,
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'BTC Dominance (%)',
          color: '#ef4444',
          font: {
            size: 11,
            weight: 'normal' as const,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#ef4444',
          callback: function(value: any) {
            return value.toFixed(1) + '%';
          },
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div className="h-64 lg:h-80">
        <Line
          data={chartData}
          options={chartOptions}
        />
      </div>
      
      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Market Cap</div>
            <div className="font-semibold text-purple-600">
              ${sampleData.marketCap[sampleData.marketCap.length - 1]?.toFixed(1)}B
            </div>
          </div>
          <div>
            <div className="text-gray-500">BTC Dominance</div>
            <div className="font-semibold text-red-500">
              {sampleData.dominance[sampleData.dominance.length - 1]?.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}