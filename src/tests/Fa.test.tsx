import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Fa from "../components/factors/Fa";


test("calculate correct F/A factor and future value", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fa />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
  const amount = screen.getByLabelText("Amount A");
  const interestRate = screen.getByLabelText("Interest Rate i %");
  const years = screen.getByLabelText("No. of periods n");
  const solveBtn = screen.getByRole('button', { name: /solve/i });

  fireEvent.change(amount, { target: { value: 1000 } });
  fireEvent.change(interestRate, { target: { value: 5 } });
  fireEvent.change(years, { target: { value: 3 } });
  fireEvent.click(solveBtn);

  const factor = screen.getByRole("factor").innerHTML;
  const futureValue = screen.getByRole("futureValue").innerHTML;

  expect(factor).toBe("3.1525");
  expect(futureValue).toBe("$3152.50");
});
