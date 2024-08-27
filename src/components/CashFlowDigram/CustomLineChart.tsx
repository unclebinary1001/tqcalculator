import React from "react";

interface CashFlowData {
  year: number;
  amount: number;
}

interface CustomLineChartProps {
  data: CashFlowData[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ data }) => {
  const years = data.map((point) => point.year);
  const values = data.map((point) => point.amount);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const width = 800;
  const trueHeight = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const scaleY = (amount: number) => {
    return (
        amount > 0? (
      height -
      margin.bottom -
      ((amount - 0 ) / (maxValue)) *
        (height - margin.top - margin.bottom) ): (
            height -
            margin.bottom +
            ((amount - 0) / (minValue)) *
              (height - margin.top - margin.bottom) 
        )
    );
  };

  const scaleX = (index: number) => {
    const xSpacing = (width - margin.left - margin.right) / (years.length - 1);
    return margin.left + index * xSpacing;
  };

  const getArrowDirection = (index: number) => {
    return values[index] > 0 ? "up" : "down";
  };

  return (
    <svg width={width} height={trueHeight}>
      <line
        x1={margin.left}
        y1={height - margin.bottom}
        x2={width - margin.right}
        y2={height - margin.bottom}
        stroke="black"
      />
      <div style={{ display: "none" }}>
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke="black"
        />
      </div>

      {data.map((point, index) => {
        const x = scaleX(index);
        const y = scaleY(point.amount);
        const direction = getArrowDirection(index);

        return (
          <React.Fragment key={index}>
            {(
              <line
                x1={x}
                y1={height - margin.bottom}
                x2={x}
                y2={y}
                stroke="blue"
                strokeWidth={2}
              />
            )}
            {direction === "up" && (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fill="blue"
                fontSize="16"
              >
                ▲
              </text>
            )}
            {direction === "down" && (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fill="blue"
                fontSize="16"
              >
                ▼
              </text>
            )}
            {/* Render the year labels */}
            <text
              x={x}
              y={height - 25}
              textAnchor="middle"
              fontSize="12"
              fill="black"
            >
              {point.year}
            </text> 
          </React.Fragment>
        );
      })}

      <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="16" fontWeight={"semi-bold"}>
        Year
      </text>
      <text
        x={-height / 2}
        y={margin.right}
        textAnchor="middle"
        transform={`rotate(-90, 0, 0)`}
        fontSize="14"
      >
        $ Amount
      </text>
    </svg>
  );
};

export default CustomLineChart;
