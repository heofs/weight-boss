import React, { useState } from 'react';
import { useFirestore } from 'enhancers/useFirestore';
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

const Graph = (props) => {
  const { weightData } = useFirestore();
  const [message, setMessage] = useState('');

  if (!weightData[0]) {
    return <p>Add weight to show graph.</p>;
  }

  const yMax =
    weightData.reduce(
      (acc, next) => (acc < next.weight ? next.weight : acc),
      0
    ) + 5;
  const yMin =
    weightData.reduce(
      (acc, next) => (acc > next.weight ? next.weight : acc),
      Number.POSITIVE_INFINITY
    ) - 5;

  const generateTicks = () => {
    const ticks = [];
    for (let i = yMin + 1; i < yMax; i++) {
      if (i % 5 === 0) {
        ticks.push(i);
      }
    }
    return [yMin, ...ticks, yMax];
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
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            animationDuration={400}
          />
          <XAxis dataKey="dateTime" tickFormatter={formatXAxis} />
          <YAxis type="number" domain={[yMin, yMax]} ticks={generateTicks()} />
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
