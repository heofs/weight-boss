import React, { useState, useEffect, useMemo } from 'react';
import { useAPI } from 'enhancers/useAPI';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import createTrend from 'trendline';

import { colors } from 'constants/theme';

import LinkButton from 'components/Buttons/LinkButton';
import CustomTooltip from './CustomTooltip';

import { generateTicksX, generateTicksY } from './generateTicks';

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
  const [weightData, setWeightData] = useState(filterFunction[filter](sortedData));

  const weights = weightData.map((data) => data.weight);
  const yMax = Math.max(...weights);
  const yMin = Math.min(...weights);
  const timestamps = weightData.map((data) => data.dateTime);
  const xMax = Math.max(...timestamps);
  const xMin = Math.min(...timestamps);
  const offset = 2;

  const xTicks = useMemo(() => generateTicksX(4, xMin, xMax), [xMin, xMax]);
  const yTicks = useMemo(() => generateTicksY(6, yMin - offset, yMax + offset), [
    yMin,
    yMax,
  ]);

  const trend = useMemo(() => createTrend(weightData, 'dateTime', 'weight'), [
    weightData,
  ]);

  // "dateTime: xMin - 1" to fix hover bug on line
  const trendData = [
    { weight: trend.calcY(xMin), dateTime: xMin - 1 },
    { weight: trend.calcY(xMax), dateTime: xMax },
  ];

  useEffect(() => {
    setWeightData(filterFunction[filter](sortedData));
  }, [filter, sortedData]);

  return (
    <Wrapper>
      <ButtonGroup>
        <LinkButton onClick={() => setFilter('last1m')} disabled={filter === 'last1m'}>
          Last month
        </LinkButton>
        <LinkButton onClick={() => setFilter('last3m')} disabled={filter === 'last3m'}>
          Last 3 months
        </LinkButton>
        <LinkButton onClick={() => setFilter('last1y')} disabled={filter === 'last1y'}>
          Last year
        </LinkButton>
        <LinkButton onClick={() => setFilter('all')} disabled={filter === 'all'}>
          Show all
        </LinkButton>
      </ButtonGroup>
      <p>{!weightData.length ? 'No Data' : message}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          margin={{ top: 5, right: 30, bottom: 5, left: -20 }}
          onMouseLeave={() => setMessage('')}
        >
          <XAxis
            name="Time"
            type="number"
            dataKey="dateTime"
            domain={['dataMin', 'dataMax']}
            ticks={xTicks}
            tickFormatter={formatXAxis}
            stroke="white"
            dy={10}
          />
          <YAxis
            name="Weight"
            type="number"
            dataKey="weight"
            domain={[yMin - offset, yMax + offset]}
            ticks={yTicks}
            stroke="white"
            dx={-5}
          />

          <Tooltip
            position={{ y: -15 }}
            content={CustomTooltip}
            cursor={{ strokeWidth: 1, strokeDasharray: '1 5' }}
          />
          <Line
            data={weightData}
            type="monotoneX"
            dataKey="weight"
            stroke={colors.violet}
            dot={false}
            animationDuration={400}
          />
          <Line
            id="trendline"
            data={trendData}
            dataKey="weight"
            name="trendline"
            animationDuration={400}
            stroke="green"
            strokeDasharray="3 5"
            dot={false}
            activeDot={false}
            label={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default Graph;
