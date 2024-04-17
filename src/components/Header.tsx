import { useState } from "react";
import { Container, Group, Burger, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Image } from "@mantine/core";
import Logo from '/logo_text.png';
import classes from "../css/HeaderSimple.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/contribute", label: "Contribute" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
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
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Anchor onClick={() => navigate('/')} className={classes.logo}>
        <Image
          src={Logo}
          alt="TQ Logo"
          height={28}
        />
        </Anchor>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
