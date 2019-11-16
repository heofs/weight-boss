import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, max, select } from 'd3';
import styled from 'styled-components';

const SVG = styled.svg`
  /* background: red; */
  color: white;

  rect {
    color: white;
  }
`;

const LineChart = (props) => {
  const d3Container = useRef(null);
  const [data, setData] = useState([5, 10, 1, 3, 6]);
  const [size, setSize] = useState({ height: 300, width: 500 });
  const addData = () => {
    setData([...data, Math.random() * 10]);
  };

  useEffect(() => {
    const dataMax = max(data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, size.height]);
    select(d3Container.current)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    select(d3Container.current)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();

    select(d3Container.current)
      .selectAll('rect')
      .data(data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', (d) => size.height - yScale(d))
      .attr('height', (d) => yScale(d))
      .attr('width', 25);
  });

  return <SVG ref={d3Container} width={size.width} height={size.height} />;
};

LineChart.propTypes = {};

export default LineChart;
