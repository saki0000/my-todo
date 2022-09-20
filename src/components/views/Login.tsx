import {
  Autocomplete,
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const createUserWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            uid: user.uid,
            displayName: username,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ...
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };
  return (
    <div style={{ height: "100%" }}>
      <Container style={{ height: "100%" }}>
        <Stack
          spacing="xl"
          align="center"
          justify="center"
          style={{ height: "100%" }}
        >
          <Text>
            <Title>{register ? "Register" : "Login"}</Title>
          </Text>
          {register && (
            <Autocomplete
              value={username}
              onChange={setUsername}
              placeholder="name"
              data={[]}
              style={{ width: 180 }}
            />
          )}
          <Autocomplete
            value={email}
            onChange={setEmail}
            placeholder="email"
            data={[]}
            style={{ width: 180 }}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
            style={{ width: 180 }}
          />

          {register ? (
            <Button style={{ width: 180 }} onClick={createUserWithEmail}>
              Register
            </Button>
          ) : (
            <Button onClick={signInWithEmail} style={{ width: 180 }}>
              Login
            </Button>
          )}

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
    </div>
  );
};

export default Login;
