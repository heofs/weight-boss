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
  /* color: white; */

  /* rect {
    color: white;
    background: white;
  } */
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
  const [hoverText, setHoverText] = useState('');
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  useEffect(() => {
    if (!weightData[0]) {
      return;
    }
    const sortedData = weightData.sort((a, b) => a.dateTime - b.dateTime);
    console.log(sortedData);
    const maxX = sortedData.reduce(
      (max, next) => (next.dateTime > max ? next.dateTime : max),
      0
    );
    const minX = sortedData.reduce(
      (min, next) => (next.dateTime < min ? next.dateTime : min),
      9999999999999999
    );
    const maxY = sortedData.reduce(
      (max, next) => (next.weight > max ? next.weight : max),
      0
    );
    const minY = sortedData.reduce(
      (min, next) => (next.weight < min ? next.weight : min),
      9999
    );

    const svg = select(d3Container.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // svg.selectAll('path').remove();

    // Add Y axis
    const yScale = scaleLinear()
      .domain([minY - 3, maxY + 3])
      .range([height, 0]);

    svg.append('g').call(axisLeft(yScale));

    // Add X axis --> it is a date format
    const xScale = scaleTime()
      .domain([new Date(parseInt(minX)), new Date(parseInt(maxX))])
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

    // This allows to find the closest X index of the mouse:
    const bisect = bisector((d) => d.dateTime).left;

    svg
      .append('path')
      .datum(sortedData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('class', 'line')
      .attr(
        'd',
        line()
          .x((d) => xScale(d.dateTime))
          .y((d) => yScale(d.weight))
        //   .curve(curveCardinal)
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
      const i = bisect(sortedData, mouseDate, 1);
      if (mouseDate > maxX) {
        return;
      }
      const d0 = sortedData[i - 1];
      const d1 = sortedData[i];
      const selectedData =
        mouseDate - d0.dateTime > d1.dateTime - mouseDate ? d1 : d0;
      setHoverText(
        selectedData.weight +
          'kg' +
          ' at ' +
          dayjs(selectedData.dateTime).format('DD/MM/YY - HH:mm')
      );
      focus
        .attr('cx', xScale(selectedData.dateTime))
        .attr('cy', yScale(selectedData.weight));
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
  }, [width, height, weightData]);

  if (!weightData[0]) {
    return <p>Display graph by adding more weights.</p>;
  }

  return (
    <Wrapper>
      <p>{hoverText}</p>
      <SVG ref={d3Container} width={width} height={height} />
    </Wrapper>
  );
};

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default LineChart;
