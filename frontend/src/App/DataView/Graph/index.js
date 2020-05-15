import React, { useState, useEffect, useMemo } from 'react';
import { useAPI } from 'enhancers/useAPI';
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
import { colors } from 'constants/theme';
import LinkButton from 'components/Buttons/LinkButton';

const Wrapper = styled.div`
  margin-bottom: 1em;
  width: 100%;
  padding: 1em 1em;
  height: 300px;
  p {
    height: 1rem;
    margin: 0;
  }
`;

const formatXAxis = (tickItem) => dayjs(tickItem).format('DD/MM/YY');

const filterFunction = {
  all: (data) => data,
  last1m: (data) =>
    data.filter((el) => {
      const lessOneMonth = dayjs().add(-1, 'month');
      return dayjs(el.dateTime).isAfter(lessOneMonth);
    }),
  last3m: (data) =>
    data.filter((el) => {
      const lessThreeMonths = dayjs().add(-3, 'month');
      return dayjs(el.dateTime).isAfter(lessThreeMonths);
    }),
  last1y: (data) =>
    data.filter((el) => {
      const lessOneYear = dayjs().add(-1, 'year');
      return dayjs(el.dateTime).isAfter(lessOneYear);
    }),
};

const ButtonGroup = styled.div`
  margin-bottom: 1em;
`;

const Graph = () => {
  const { weightData: unsortedWeight } = useAPI();
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const sortedData = unsortedWeight.sort((a, b) => a.dateTime - b.dateTime);
  const [weightData, setWeightData] = useState(
    filterFunction[filter](sortedData)
  );

  const weights = weightData.map((data) => data.weight);
  const yMax = Math.max(...weights) + 2;
  const yMin = Math.min(...weights) - 2;
  const timestamps = weightData.map((data) => data.dateTime);
  const xMax = Math.max(...timestamps);
  const xMin = Math.min(...timestamps);

  const generateTicks = (resolution, minVal, maxVal) => {
    const ticks = [];
    const min = parseInt(minVal);
    const max = parseInt(maxVal);
    const diff = max - min;

    const increment = parseInt(diff / resolution);
    const incNum = increment ? increment : 1;

    for (let i = min; i <= max; i = i + incNum) {
      ticks.push(i);
    }
    return ticks;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      const message = `${payload[0].value}kg at ${dayjs(label).format(
        'DD/MM/YY - HH:mm'
      )}`;
      return <div>{message}</div>;
    }
    return null;
  };

  useEffect(() => {
    setWeightData(filterFunction[filter](sortedData));
  }, [filter, sortedData]);

  return (
    <Wrapper>
      <ButtonGroup>
        <LinkButton
          onClick={() => setFilter('last1m')}
          disabled={filter === 'last1m'}
        >
          Last month
        </LinkButton>
        <LinkButton
          onClick={() => setFilter('last3m')}
          disabled={filter === 'last3m'}
        >
          Last 3 months
        </LinkButton>
        <LinkButton
          onClick={() => setFilter('last1y')}
          disabled={filter === 'last1y'}
        >
          Last year
        </LinkButton>
        <LinkButton
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
        >
          Show all
        </LinkButton>
      </ButtonGroup>
      <p>{!weightData.length ? 'No Data' : message}</p>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={weightData}
          margin={{ top: 5, right: 30, bottom: 5, left: -20 }}
          onMouseLeave={() => setMessage('')}
        >
          <Line
            type="monotoneX"
            dataKey="weight"
            stroke={colors.violet}
            dot={false}
            animationDuration={400}
          />
          <XAxis
            name="Time"
            type="number"
            dataKey="dateTime"
            domain={['dataMin', 'dataMax']}
            ticks={useMemo(() => generateTicks(4, xMin, xMax), [xMin, xMax])}
            tickFormatter={formatXAxis}
            stroke="white"
            dy={10}
          />
          <YAxis
            name="Weight"
            type="number"
            dataKey="weight"
            domain={[yMin, yMax]}
            ticks={useMemo(() => generateTicks(6, yMin, yMax), [yMin, yMax])}
            stroke="white"
            dx={-5}
          />
          <Tooltip
            position={{ y: -15 }}
            content={CustomTooltip}
            cursor={{ strokeWidth: 1, strokeDasharray: '1 5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default Graph;
