import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  scaleLinear,
  select,
  line,
  axisBottom,
  axisLeft,
  mouse,
  bisector,
  curveCardinal,
  scaleTime,
} from 'd3';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { colors } from 'constants/theme';
import { useFirestore } from 'enhancers/useFirestore';

const Wrapper = styled.div`
  margin: 1rem 0;
  p {
    height: 1rem;
    margin: 0;
  }
`;

const SVG = styled.svg`
  /* background: red; */
  color: white;

  rect {
    color: white;
    background: white;
  }
  .focusCircle {
    fill: white;
    stroke: ${colors.primary};
    stroke-width: 1;
  }
  .line {
    /* stroke: green; */
  }
`;

const LineChart = (props) => {
  const d3Container = useRef(null);
  const { weightData } = useFirestore();
  console.log(weightData);

  const [data, setData] = useState([
    { x: new Date(2016, 0, 1), y: 2 },
    { x: new Date(2016, 1, 1), y: 2 },
    { x: new Date(2016, 2, 1), y: 3 },
    { x: new Date(2016, 2, 17), y: 2 },
    { x: new Date(2016, 5, 1), y: 12 },
    { x: new Date(2016, 9, 1), y: 4 },
    { x: new Date(2016, 12, 1), y: 8 },
  ]);
  const [hoverText, setHoverText] = useState('');
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;
  const maxX = data.reduce((acc, next) => (next.x > acc ? next.x : acc), 0);
  const maxY = data.reduce((acc, next) => (next.y > acc ? next.y : acc), 0);

  useEffect(() => {
    const svg = select(d3Container.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Add X axis --> it is a date format
    const xScale = scaleTime()
      .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        axisBottom(xScale)
          .tickFormat((e) => dayjs(e).format('DD/MM'))
          .ticks(10, ',f')
      )
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '1em')
      .attr('transform', 'rotate(45)')
      .style('text-anchor', 'start');

    // Add Y axis
    const yScale = scaleLinear()
      .domain([0, 13])
      .range([height, 0]);

    svg.append('g').call(axisLeft(yScale));
    // This allows to find the closest X index of the mouse:
    const bisect = bisector((d) => d.x).left;

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('class', 'line')
      .attr(
        'd',
        line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y))
          .curve(curveCardinal)
      );

    // Create the circle that travels along the curve of chart
    const focus = svg
      .append('g')
      .append('circle')
      .attr('r', 4)
      .style('opacity', 0)
      .attr('class', 'focusCircle');

    // What happens when the mouse move -> show the annotations at the right positions.
    function mousemove() {
      const mouseDate = xScale.invert(mouse(this)[0]);
      const i = bisect(data, mouseDate, 1);
      if (mouseDate > maxX) {
        return;
      }
      var d0 = data[i - 1];
      var d1 = data[i];
      const selectedData = mouseDate - d0.x > d1.x - mouseDate ? d1 : d0;
      setHoverText(
        selectedData.y +
          'kg' +
          ' at ' +
          dayjs(selectedData.x).format('DD/MM/YY - HH:mm')
      );
      focus
        .attr('cx', xScale(selectedData.x))
        .attr('cy', yScale(selectedData.y));
    }
    const mouseover = () => {
      focus.style('opacity', 1);
    };
    const mouseout = () => {
      focus.style('opacity', 0);
      setHoverText('');
    };

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }, [width, height, data]);

  return (
    <Wrapper>
      <p> {hoverText}</p>
      <SVG ref={d3Container} width={width} height={height} />
    </Wrapper>
  );
};

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default LineChart;
