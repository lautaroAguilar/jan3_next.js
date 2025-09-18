'use client';

import React from 'react';
import { TimeRange } from './ChartsContainer';
import { cn } from '@/lib/utils';

interface MetricOption {
  id: string;
  label: string;
  color: string;
}

interface ChartFiltersProps {
  timeRanges: TimeRange[];
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  availableMetrics: MetricOption[];
  selectedMetrics: string[];
  onMetricsChange: (metrics: string[]) => void;
}

export default function ChartFilters({
  timeRanges,
  selectedTimeRange,
  onTimeRangeChange,
  availableMetrics,
  selectedMetrics,
  onMetricsChange,
}: ChartFiltersProps) {
  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      onMetricsChange(selectedMetrics.filter(id => id !== metricId));
    } else {
      onMetricsChange([...selectedMetrics, metricId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Time Range Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Time Range</label>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange(range)}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  selectedTimeRange.value === range.value
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Display Metrics</label>
          <div className="flex flex-wrap gap-2">
            {availableMetrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2',
                  selectedMetrics.includes(metric.id)
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
                style={{
                  backgroundColor: selectedMetrics.includes(metric.id) ? metric.color : undefined
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
                {metric.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>
            <strong>Time Period:</strong> {selectedTimeRange.label}
            {selectedTimeRange.days > 0 && ` (${selectedTimeRange.days} days)`}
          </span>
          <span>
            <strong>Active Metrics:</strong> {selectedMetrics.length} selected
          </span>
          <span className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}