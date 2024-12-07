import React from 'react';
import { SimulationProvider } from './SimulationProvider';
import SimulationViewer from './SimulationViewer';
import TimeController from './TimeController';

interface Props {
  timeSeriesData: {
    year: number;
    gwc: number;
  }[];
}

export default function SimulationSection({ timeSeriesData }: Props) {
  return (
    <SimulationProvider>
      <div className="w-full max-w-[55rem] gap-2">
        <div className="w-full flex gap-20">
          <div className="w-[50%]">
            <SimulationViewer 
              timeSeriesData={timeSeriesData} 
              state="actions"
            />
          </div>
          <div className="w-[50%] gap-2">
            <TimeController />
            <SimulationViewer 
              timeSeriesData={timeSeriesData} 
              state="timeseries"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4">
          {['landuse1', 'landuse2', 'landuse3', 'landuse4'].map((state) => (
            <div key={state}>
              <SimulationViewer 
                timeSeriesData={timeSeriesData} 
                state={state}
              />
            </div>
          ))}
        </div>
      </div>
    </SimulationProvider>
  );
} 