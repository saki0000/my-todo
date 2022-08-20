import {
  Autocomplete,
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";

const Login = () => {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <Container style={{ height: "100%" }}>
      <Stack
        spacing="xl"
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Title>{register ? "Register" : "Login"}</Title>
        {register && <Autocomplete data={[]} style={{ width: 180 }} />}
        <Autocomplete data={[]} style={{ width: 180 }} />
        <PasswordInput placeholder="Password" required style={{ width: 180 }} />
        <Button style={{ width: 180 }}>
          {register ? "Register" : "Login"}
        </Button>
        {register || (
          <Text
            onClick={() => {
              setRegister(true);
            }}
          >
            新規登録
          </Text>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
