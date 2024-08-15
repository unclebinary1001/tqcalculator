import { Image, Container, Title, Text, Button, SimpleGrid, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import image from '/not_found.svg';

export function NotFound() {
    const theme = useMantineTheme();
    return (
        <Container >
            <SimpleGrid mt={"xl"} spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
                <div>
                    <Title>Something is not right...</Title>
                    <Text c="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Link to="/">
                        <Button variant="outline" size="md" mt="xl" color={theme.colors.brand[2]}>
                            Get back to home page
                        </Button>
                    </Link>
                </div>
                <Image src={image} />
            </SimpleGrid>
        </Container>
    );
}