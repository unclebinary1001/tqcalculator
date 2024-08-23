import { BarChart } from "@mantine/charts";
import { useMantineTheme } from "@mantine/core";

export interface CashFlowData {
  year: number;
  amount: number;
}

// TODO: remove when testing is complete, dummy data for testing
const testData: CashFlowData[] = [
  { year: 0, amount: -1.0 },
  { year: 1, amount: 2000.0 },
  { year: 2, amount: 2000.0 },
  { year: 3, amount: 2000.0 },
  { year: 4, amount: 2000.0 },
  { year: 5, amount: 2000.0 },
  { year: 6, amount: 3000.0 },
  { year: 7, amount: 3000.0 },
  { year: 8, amount: 3000.0 },
];

function Chart({ cashFlowData }: { cashFlowData: CashFlowData[] }) {
  const theme = useMantineTheme();
  return (
    <BarChart
      h={300}
      data={cashFlowData}
      dataKey="year"
      cursorFill={theme.colors.brand[8]}
      series={[{ name: "amount", color: "blue" }]}
    />
  );
}

export default Chart;
