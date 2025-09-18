'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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
  Legend,
  Filler
);

interface BitcoinPriceChartProps {
  timeRange: TimeRange;
}

// Generate sample data - in production this would come from an API
const generateSampleData = (days: number) => {
  const data = [];
  const labels = [];
  const basePrice = 43000;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const trendFactor = Math.sin((i / days) * Math.PI) * 0.05; // Gentle trend
    const price = basePrice * (1 + randomVariation + trendFactor);
    
    data.push(price);
    labels.push(date.toISOString().split('T')[0]);
  }

  return { data, labels };
};

export default function BitcoinPriceChart({ timeRange }: BitcoinPriceChartProps) {
  const chartRef = useRef<ChartJS<'line'> | null>(null);

  const sampleData = useMemo(() => {
    const days = timeRange.days > 0 ? timeRange.days : 365; // Default to 1 year for "ALL"
    return generateSampleData(days);
  }, [timeRange]);

  const chartData = {
    labels: sampleData.labels,
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: sampleData.data,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
        pointRadius: timeRange.days <= 7 ? 3 : 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
        text: `Bitcoin Price - ${timeRange.label}`,
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        color: '#111827',
        padding: 20,
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#f97316',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            return `Price: $${value.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#6b7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          maxTicksLimit: timeRange.days <= 7 ? 7 : 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (USD)',
          color: '#6b7280',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="h-80 lg:h-96">
          <Line
            ref={chartRef}
            data={chartData}
            options={chartOptions}
          />
        </div>
        
        {/* Chart Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Current</div>
              <div className="font-semibold text-orange-600">
                ${sampleData.data[sampleData.data.length - 1]?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div>
              <div className="text-gray-500">High</div>
              <div className="font-semibold text-green-600">
                ${Math.max(...sampleData.data).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Low</div>
              <div className="font-semibold text-red-600">
                ${Math.min(...sampleData.data).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Change</div>
              <div className="font-semibold text-green-600">
                +{(((sampleData.data[sampleData.data.length - 1] - sampleData.data[0]) / sampleData.data[0]) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}