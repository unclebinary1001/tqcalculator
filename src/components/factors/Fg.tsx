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
  
  export default function Fg() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
  
    const [ans, setAns] = useState({
      factor: "0",
      futureValue: "0",
    }); 
  
    const calculateAns = () => {
      const { G, i, n } = form.values;
      const rate = i/100;
      const fg = (1/rate) * (((Math.pow(1 + rate,n) - 1)/rate) - n);
      const amount = G * fg;
      setAns({ factor: formatDecimals(fg, 4), futureValue: (G === 0)? "0": formatDecimals(amount, 2) });
    }
  
    const resetAll = () => {
      form.setValues({ G: 0, i: 0, n: 0 });
      setAns({ factor: "0", futureValue: "0" });
    }
  
    
    const form = useForm({
      initialValues: {
        G: 0,
        i: 0,
        n: 0,
      },
      validate: {
        // F: (value) => (value > 0 ? null : 'Future worth must be greater than 0'),
        i: (value) => (value > 0 ? null : 'Interest must be greater than 0'),
        n: (value) => (value > 1 ? null : 'N must be greater than 1'),
      },
    });
    return (
      <Container p={40}>
        <Title ta={"center"} order={2} fw={600} mb={8}>
          Convert G to F
        </Title>
        <form
          onSubmit={form.onSubmit(() => {
            calculateAns();
          })}
        >
          <Grid>
            <Grid.Col span={4}>
              <NumberInput
                label="Gradient G"
                placeholder="Dollars"
                prefix="$"
                hideControls
                defaultValue={form.values.G}
                {...form.getInputProps('G')}
                mb={"md"}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Interest Rate i %"
                placeholder="i%"
                hideControls
                defaultValue={form.values.i}
                {...form.getInputProps('i')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="No. of periods n"
                placeholder="N"
                hideControls
                defaultValue={form.values.n}
                {...form.getInputProps('n')}
                mb="md"
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={6} size={"md"} fw={600}>
                F/G factor:
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
                Future Worth F:
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
  