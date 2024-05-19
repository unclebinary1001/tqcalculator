import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import Af from "../components/factors/Af";
import { Route, Routes, BrowserRouter } from "react-router-dom";


test("calculate correct factor and future value", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Af />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
  const futureValue = screen.getByLabelText("Future worth F");
  const interestRate = screen.getByLabelText("Interest Rate i%");
  const years = screen.getByLabelText("No. of periods n");
  const solveBtn = screen.getByRole('button', { name: /solve/i });

  fireEvent.change(futureValue, { target: { value: 1000 } });
  fireEvent.change(interestRate, { target: { value: 5 } });
  fireEvent.change(years, { target: { value: 3 } });
  fireEvent.click(solveBtn);

  const factor = screen.getByRole("factor").innerHTML;
  const amount = screen.getByRole("amount").innerHTML;

  expect(factor).toBe("0.31721");
  expect(amount).toBe("$317.21");
});
