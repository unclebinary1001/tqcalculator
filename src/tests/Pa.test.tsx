import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Pa from "../components/factors/Pa";


test("calculate correct P/A factor and Present worth", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pa />} />
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
  const presentWorth = screen.getByRole("presentWorth").innerHTML;

  expect(factor).toBe("2.7232");
  expect(presentWorth).toBe("$2723.25");
});
