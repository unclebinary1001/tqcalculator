import {
  Container,
  Grid,
  Title,
  Button,
  useMantineTheme,
  Text,
  NumberInput,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDecimals from "../../utils/formatDecimals";

export default function Fp() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [ans, setAns] = useState({
    factor: "0",
    futureValue: "0",
  }); 

  const calculateAns = () => {
    const { P, i, n } = form.values;
    const rate = i/100;
    const f = Math.pow(1 + rate,n);
    const factor = formatDecimals(f, 4);
    const future = P * f;
    const futureValue = formatDecimals(future, 2);
    setAns({ factor, futureValue });
  }

  const resetAll = () => {
    form.setValues({ P: 0, i: 0, n: 0 });
    setAns({ factor: "0", futureValue: "0" });
  }

  
  const form = useForm({
    initialValues: {
      P: 0,
      i: 0,
      n: 0,
    },
    validate: {
      P: (value) => (value > 0 ? null : 'Principal must be greater than 0'),
      i: (value) => (value > 0 ? null : 'Interest must be greater than 0'),
      n: (value) => (value > 0 ? null : 'N must be greater than 0'),
    },
  });
  return (
    <Container p={40}>
      <Title ta={"center"} order={2} fw={600} mb={8}>
        Convert P to F
      </Title>
      <form
        onSubmit={form.onSubmit(() => {
          console.log("form submitted succesfully");
          calculateAns();
        })}
      >
        <Grid>
          <Grid.Col span={4}>
            <NumberInput
              label="Principal P"
              placeholder="Dollars"
              prefix="$"
              hideControls
              defaultValue={form.values.P}
              {...form.getInputProps('P')}
              mb={"md"}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Interest Rate i %"
              placeholder="i%"
              hideControls
              defaultValue={form.values.P}
              {...form.getInputProps('i')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="No. of periods n"
              placeholder="N"
              hideControls
              defaultValue={form.values.P}
              {...form.getInputProps('n')}
              mb="md"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={6} size={"md"} fw={600}>
              F factor:
            </Title>
            <Box
              px={8}
              py={4}
              mb="md"
              style={{
                borderRadius: 8,
                border: "1px solid",
                borderColor: theme.colors.brand[2],
                height: '2em'
              }}
            >
              <Text size={"md"}>{ans.factor == "0"? "": ans.factor}</Text>
            </Box>
           
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={6} size={"md"} fw={600}>
              Future Value F:
            </Title>
            <Box
              px={8}
              py={4}
              mb="md"
              style={{
                borderRadius: 8,
                border: "1px solid",
                borderColor: theme.colors.brand[2],
                height: '2em'
              }}
            >
              <Text size={"md"}>{ans.futureValue == "0"? "": "$" + ans.futureValue}</Text>
            </Box>
            </Grid.Col>
        </Grid>

        <Group justify="flex-start" mt="md">
          <Button
            type="submit"
            radius="xl"
            size="sm"
            color={form.isValid() == true? theme.colors.brand[5]: theme.colors.brand[11]}
            
          >
            <Text>Solve</Text>
          </Button>
          <Button radius="xl" size="sm" color={theme.colors.brand[13]} onClick={() => resetAll()}>
            <Text>Reset</Text>
          </Button>
          <Button
            radius="xl"
            size="sm"
            color={theme.colors.brand[12]}
            onClick={() => navigate(-1)}
          >
            <Text>Back</Text>
          </Button>
        </Group>
      </form>
    </Container>
  );
}
