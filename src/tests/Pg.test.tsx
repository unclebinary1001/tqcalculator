import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Pg from "../components/factors/Pg";


test("calculate correct P/G factor and Present worth", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pg />} />
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
  const presentWorth = screen.getByRole("presentWorth").innerHTML;

  expect(factor).toBe("2.6347");
  expect(presentWorth).toBe("$2634.70");
});
