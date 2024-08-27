import { Container, Group, Burger, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Image } from "@mantine/core";
import Logo from "/logo_text.png";
import classes from "../css/HeaderSimple.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/contribute", label: "Contribute" },
];

export function Header() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.link);
        if (opened) {
          toggle();
        }
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Anchor onClick={() => navigate("/")}>
          <Image src={Logo} alt="TQ Logo" height={28} />
        </Anchor>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          color={theme.colors.brand[8]}
          opened={opened}
          onClick={toggle}
          transitionDuration={300}
          hiddenFrom="xs"
          size="md"
          style={{ zIndex: 100 }}
        />

          {/* Mobile navbar */}
          {opened && (
            <Group gap={5} className={classes.mobileNavbar}>
              {items}
            </Group>
          )}
      </Container>
    </header>
  );
}
