import React from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const TEST_ID = "testID";

export interface IData {
  key: number;
  line: number;
  extraLine?: number;
}

interface IProps {
  data: IData[];
  showExtraLine: boolean;
}

const MyChart = ({ data, showExtraLine }: IProps) => {
  console.log("Chart data", data);
  console.log("showExtraLine", showExtraLine);
  return (
    <div style={{ height: "50vh" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" horizontal={true} vertical={false} />
          <XAxis
            tick={{ fontSize: 12, fill: "#9B9B9B" }}
            dataKey="key"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: "#9B9B9B" }}
            tickLine={false}
            axisLine={false}
            orientation="left"
            allowDataOverflow={false}
          />

          <Line
            data-testid={TEST_ID}
            type="monotone"
            strokeWidth={3}
            dataKey="line"
            stroke="#FFE86D"
          />
          {showExtraLine && (
            <Line
              data-testid={TEST_ID}
              type="monotone"
              strokeWidth={3}
              dataKey="extraLine"
              stroke="#1F71FB"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      ;
    </div>
  );
};

export default MyChart;
