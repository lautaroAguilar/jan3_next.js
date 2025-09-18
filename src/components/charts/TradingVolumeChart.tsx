'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TimeRange } from './ChartsContainer';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TradingVolumeChartProps {
  timeRange: TimeRange;
}

// Generate sample volume data
const generateVolumeData = (days: number) => {
  const data = [];
  const labels = [];
  const baseVolume = 25; // Billion USD
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomVariation = Math.random() * 0.8 + 0.4; // 40% to 120% of base
    const weekendFactor = [0, 6].includes(date.getDay()) ? 0.7 : 1; // Lower weekend volume
    const volume = baseVolume * randomVariation * weekendFactor;
    
    data.push(volume);
    labels.push(date.toISOString().split('T')[0]);
  }

  return { data, labels };
};

export default function TradingVolumeChart({ timeRange }: TradingVolumeChartProps) {
  const sampleData = useMemo(() => {
    const days = timeRange.days > 0 ? timeRange.days : 365;
    return generateVolumeData(days);
  }, [timeRange]);

  const chartData = {
    labels: sampleData.labels,
    datasets: [
      {
        label: 'Volume (B USD)',
        data: sampleData.data,
        backgroundColor: 'rgba(13, 148, 136, 0.6)',
        borderColor: '#0d9488',
        borderWidth: 1,
        borderRadius: 2,
        borderSkipped: false,
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
        text: `Trading Volume - ${timeRange.label}`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
        padding: 15,
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#0d9488',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            return `Volume: $${value.toFixed(2)}B`;
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
          maxTicksLimit: timeRange.days <= 7 ? 7 : 10,
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Volume (Billions USD)',
          color: '#6b7280',
          font: {
            size: 11,
            weight: 'normal' as const,
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value.toFixed(0) + 'B';
          },
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const averageVolume = sampleData.data.reduce((sum, val) => sum + val, 0) / sampleData.data.length;
  const currentVolume = sampleData.data[sampleData.data.length - 1];
  const maxVolume = Math.max(...sampleData.data);
  const minVolume = Math.min(...sampleData.data);

  return (
    <div className="p-6">
      <div className="h-64 lg:h-80">
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>
      
      {/* Volume Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Current</div>
            <div className="font-semibold text-teal-600">
              ${currentVolume?.toFixed(1)}B
            </div>
          </div>
          <div>
            <div className="text-gray-500">Average</div>
            <div className="font-semibold text-blue-600">
              ${averageVolume.toFixed(1)}B
            </div>
          </div>
          <div>
            <div className="text-gray-500">Highest</div>
            <div className="font-semibold text-green-600">
              ${maxVolume.toFixed(1)}B
            </div>
          </div>
          <div>
            <div className="text-gray-500">Lowest</div>
            <div className="font-semibold text-red-600">
              ${minVolume.toFixed(1)}B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}