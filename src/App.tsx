import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from "./components/Header";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HeaderSimple />
    </MantineProvider>
  );
}
