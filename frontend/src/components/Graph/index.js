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

const SVG = styled.svg`
  /* background: red; */
  color: white;

  rect {
    color: white;
    background: white;
  }
`;

const LineChart = (props) => {
  const d3Container = useRef(null);
  const [data, setData] = useState([
    { x: 1, y: 2 },
    { x: 20, y: 3 },
    { x: 30, y: 12 },
    { x: 50, y: 4 },
    { x: 70, y: 8 },
  ]);

  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
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
    const xScale = scaleLinear()
      .domain([1, 100])
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(xScale));

    // Add Y axis
    const yScale = scaleLinear()
      .domain([0, 13])
      .range([height, 0]);

    svg.append('g').call(axisLeft(yScale));
    // This allows to find the closest X index of the mouse:
    const bisect = bisector((d) => d.x).left;

    // Create the circle that travels along the curve of chart
    const focus = svg
      .append('g')
      .append('circle')
      .style('fill', 'none')
      .attr('stroke', 'black')
      .attr('r', 8.5)
      .style('opacity', 0);

    // Create the text that travels along the curve of chart
    const focusText = svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle');

    // What happens when the mouse move -> show the annotations at the right positions.

    function mousemove() {
      // recover coordinate we need
      const x0 = xScale.invert(mouse(this)[0]);
      const i = bisect(data, x0, 1);
      if (x0 > maxX) {
        return;
      }

      const selectedData = data[i];
      focus
        .attr('cx', xScale(selectedData.x))
        .attr('cy', yScale(selectedData.y));
      focusText
        .html('x:' + selectedData.x + '  -  ' + 'y:' + selectedData.y)
        .attr('x', xScale(selectedData.x) + 15)
        .attr('y', yScale(selectedData.y));
    }
    const mouseover = () => {
      focus.style('opacity', 1);
      focusText.style('opacity', 1);
    };
    const mouseout = () => {
      focus.style('opacity', 0);
      focusText.style('opacity', 0);
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

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y))
          .curve(curveCardinal)
      );
  });

  return <SVG ref={d3Container} width={width} height={height} />;
};

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default LineChart;
