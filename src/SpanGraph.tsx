import * as React from 'react';

import moment from 'moment';

import { html5_colors } from './constants';
import { Span } from './types';

export interface Props {
  style?: undefined | React.CSSProperties
  width?: undefined | number | string
  height?: undefined | number | string
  between?: undefined | number | React.ComponentType<any>
  spans: ReadonlyArray<Span>
}

const get_cycled_color = (() => {
  let i = 0
  return () => {
    return html5_colors[i++ % html5_colors.length]
  }
})()

function Bar({
  span,
  color = get_cycled_color(),
  graph_start_time,
  graph_end_time,
  height = 20,
}: {
  graph_start_time: Date
  graph_end_time: Date
  color?: string
  span: Span
  height?: number
}) {
  const total_duration = graph_end_time.getTime() - graph_start_time.getTime()
  const marginLeft =
    ((span.start_date.getTime() - graph_start_time.getTime()) / total_duration) * 100
  const marginRight =
    ((graph_end_time.getTime() - span.end_date.getTime()) / total_duration) * 100
  const duration = span.end_date.getTime() - span.start_date.getTime()
  const width = `total_duration ${total_duration} duration ${(duration / total_duration) *
    100}%`
  const paddingHorizontal = 5
  return (
    <div
      style={{
        height,
        marginRight: `${marginRight}%`,
        marginLeft: `${marginLeft}%`,
        display: "flex",
        alignItems: "center",
        backgroundColor: color,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        fontSize: 12,
        width,
        fontWeight: "500",
      }}
    >
      <span style={{ flex: 1 }}>{span.name}</span>
      <span style={{ color: "#888", float: "right" }}>{duration}ms</span>
    </div>
  )
}

function Between({ between = 10 }: Pick<Props, "between">) {
  if (typeof between === "number") {
    return <div style={{ height: between }} />
  } else {
    const Between = between
    return <Between />
  }
}

function SpanGraph({
  spans = [
    {
      name: "method 11",
      start_date: moment("2022-04-04").toDate(),
      end_date: moment("2022-04-08").toDate(),
    },
    {
      name: "method 22",
      start_date: moment("2022-04-05").toDate(),
      end_date: moment("2022-04-10").toDate(),
    },
  ],
  between,
  style,
  height = 200,
  width = 300,
}: Props) {
  spans = [...spans].sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
  const start = spans[0]
  const end = spans[spans.length - 1]
  const graph_start_time = start.start_date
  const graph_end_time = end.end_date
  console.log(
    `graph_start_date`,
    moment(graph_start_time).format("YYYY-MM-DD"),
    `graph_end_date`,
    moment(graph_end_time).format("YYYY-MM-DD"),
  )
  return (
    <div
      style={{
        // border: "1px solid blue",
        // padding: "20px",
        ...style,
        height,
        width,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {spans.map((span, i) => (
          <div key={i}>
            <Bar {...{ graph_end_time, graph_start_time }} span={span} />
            <Between between={between} />
          </div>
        ))}
      </div>
    </div>
  )
}

export { SpanGraph };
