import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useSimulation } from './SimulationProvider';
import '../styles/SimulationViewer.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface Props {
  timeSeriesData: {
    year: number;
    gwc: number;
  }[];
  state: 'actions' | 'timeseries' | 'landuse1' | 'landuse2' | 'landuse3' | 'landuse4';
}

const landUseStates = {
  landuse1: { key: 'ica', label: 'Annual crop' },
  landuse2: { key: 'pnl', label: 'Perennial crop' },
  landuse3: { key: 'ofr', label: 'On-farm recharge' },
  landuse4: { key: 'wib', label: 'Wetland' }
};

export default function SimulationViewer({ timeSeriesData, state }: Props) {
  const { currentYear } = useSimulation();

  const chartData = {
    labels: timeSeriesData.map(d => `Year ${d.year}`),
    datasets: [{
      label: 'Groundwater Change',
      data: timeSeriesData.map(d => d.gwc),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      y: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Groundwater storage change [km³]'
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: currentYear,
            xMax: currentYear,
            borderColor: 'rgb(255, 99, 132, 0.5)',
            borderWidth: 5, 
          }
        }
      }
    }
  };

  const renderContent = () => {
    if (state === 'actions') {
      return (
        <div className="simulation-viewer actions">
          <div className="map-container"  style={{ height: '310px', marginTop: '1.5rem'}}>
            <div className="big-map-title">New actions in each year</div>
            <img 
              src={`./data_stoc_drl/actions/action_year${currentYear}.png`}
              alt={`Actions Year ${currentYear}`}
              className="w-full h-auto"
              onError={(e) => {
                console.error(`Failed to load image for year ${currentYear}`);
              }}
            />
          </div>
        </div>
      );
    }

    if (state === 'timeseries') {
      return (
        <div className="simulation-viewer timeseries">
          <div className="timeseries-container" style={{ height: '250px', marginTop: '0rem', marginRight: '5rem' }}>
            <Line 
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      );
    }

    const stateInfo = landUseStates[state];
    if (stateInfo) {
      return (
        <div className={`simulation-viewer ${state}`}>
          <div className="map-container" style={{ height: '200px', marginTop: '-4rem' }}>
            <div className="map-title">{stateInfo.label}</div>
            <img 
              src={`./data_stoc_drl/states/${stateInfo.key}/${stateInfo.key}_year${currentYear}.png`}
              alt={`${stateInfo.label} Year ${currentYear}`}
              className="w-full h-auto"
              onError={(e) => {
                console.error(`Failed to load image for year ${currentYear}`);
              }}
            />
          </div>
        </div>
      );
    }
  };

  return renderContent();
} 