import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Ap from "../components/factors/Ap";


test("calculate correct A/P factor and Amount", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ap />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
  const presentWorth = screen.getByLabelText("Present Worth P");
  const interestRate = screen.getByLabelText("Interest Rate i %");
  const years = screen.getByLabelText("No. of periods n");
  const solveBtn = screen.getByRole('button', { name: /solve/i });

  fireEvent.change(presentWorth, { target: { value: 1000 } });
  fireEvent.change(interestRate, { target: { value: 5 } });
  fireEvent.change(years, { target: { value: 3 } });
  fireEvent.click(solveBtn);

  const factor = screen.getByRole("factor").innerHTML;
  const amount = screen.getByRole("amount").innerHTML;

  expect(factor).toBe("0.36721");
  expect(amount).toBe("$367.21");
});
