import { render, fireEvent, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Pf from "../components/factors/Pf";


test("calculate correct P/F factor and Present value", () => {
  render(
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pf />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
  const futureValue = screen.getByLabelText("Future Worth F");
  const interestRate = screen.getByLabelText("Interest Rate i %");
  const years = screen.getByLabelText("No. of periods n");
  const solveBtn = screen.getByRole('button', { name: /solve/i });

  fireEvent.change(futureValue, { target: { value: 1000 } });
  fireEvent.change(interestRate, { target: { value: 5 } });
  fireEvent.change(years, { target: { value: 3 } });
  fireEvent.click(solveBtn);

  const factor = screen.getByRole("factor").innerHTML;
  const presentValue = screen.getByRole("presentValue").innerHTML;

  expect(factor).toBe("0.8638");
  expect(presentValue).toBe("$863.84");
});
