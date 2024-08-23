import { BarChart } from '@mantine/charts';
import { data } from './data';
import { useMantineTheme } from '@mantine/core';

interface CashFlowData {
    year: number;
    amount: number;
  }
function Demo({cashFlowData} : { cashFlowData: CashFlowData[]}) {
    const theme = useMantineTheme();
  return (
    <BarChart
      h={300}
      data={cashFlowData}
      dataKey="year"
      cursorFill={theme.colors.brand[8]}
      series={[{ name: 'amount', color: 'blue' }]}
    />
  );
}

export default Demo