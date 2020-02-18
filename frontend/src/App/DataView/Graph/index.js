import React, { useState } from 'react';
import { useDatabase } from 'enhancers/useDatabase';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Wrapper = styled.div`
  margin: 2rem 0;
  width: 100%;
  height: 300px;
  p {
    height: 1rem;
    margin: 0;
  }
`;

const formatXAxis = (tickItem) => dayjs(tickItem).format('DD/MM/YY');

const Graph = () => {
  const { weightData: unsortedWeight } = useDatabase();
  const [message, setMessage] = useState('');

  const weightData = unsortedWeight.sort((a, b) => a.dateTime - b.dateTime);
  const weightValues = weightData.map((data) => data.weight);
  const yMax = Math.max(...weightValues) + 3;
  const yMin = Math.min(...weightValues) - 3;

  const generateTicksYAxis = () => {
    const ticks = [];
    const min = parseInt(yMin);
    const max = parseInt(yMax);
    for (let i = min + 1; i < max; i++) {
      if (i % 2 === 0) {
        ticks.push(i);
      }
    }
    return [min, ...ticks, max];
  };

  const handleTooltip = ({ active, payload, label }) => {
    if (active) {
      setMessage(
        `${payload[0].value}kg at ${dayjs(label).format('DD/MM/YY - HH:mm')}`
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <p>{message}</p>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={weightData}
          margin={{ top: 5, right: 30, bottom: 5, left: -20 }}
          onMouseLeave={() => setMessage('')}
        >
          <Line
            type="monotoneX"
            dataKey="weight"
            stroke="#8884d8"
            dot={false}
            animationDuration={400}
          />
          <XAxis
            name="Time"
            type="number"
            dataKey="dateTime"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatXAxis}
            dy={10}
            stroke="white"
          />
          <YAxis
            name="Weight"
            type="number"
            dataKey="weight"
            domain={[yMin, yMax]}
            ticks={generateTicksYAxis()}
            stroke="white"
            dx={-5}
          />
          <Tooltip
            content={handleTooltip}
            cursor={{ strokeWidth: 1, strokeDasharray: '1 5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default Graph;
