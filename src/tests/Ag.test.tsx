import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import Ag from "../components/factors/Ag";
import { Route, Routes, BrowserRouter } from "react-router-dom";


test("calculate correct A/G factor and Amount", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ag />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
  const gradient = screen.getByLabelText("Gradient G");
  const interestRate = screen.getByLabelText("Interest Rate i %");
  const years = screen.getByLabelText("No. of periods n");
  const solveBtn = screen.getByRole('button', { name: /solve/i });

  fireEvent.change(gradient, { target: { value: 1000 } });
  fireEvent.change(interestRate, { target: { value: 5 } });
  fireEvent.change(years, { target: { value: 3 } });
  fireEvent.click(solveBtn);

  const factor = screen.getByRole("factor").innerHTML;
  const amount = screen.getByRole("amount").innerHTML;

  expect(factor).toBe("0.9675");
  expect(amount).toBe("$967.49");
});
