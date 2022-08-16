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
      <Stack align="center" justify="center" style={{ height: "100%" }}>
        <Title>{register ? "Register" : "Login"}</Title>
        {register && <Autocomplete data={[]} />}
        <Autocomplete data={[]} />
        <PasswordInput placeholder="Password" required style={{ width: 150 }} />
        <Button>{register ? "Register" : "Login"}</Button>
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
