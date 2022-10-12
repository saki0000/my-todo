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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth } from "../../firebase";
import Password from "../parts/Password";

const Login = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
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
        setError(errorCode);
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
        setError(errorCode);
        console.log({ errorCode, errorMessage });
      });
  };
  return (
    <div className="bg-indigo-200" style={{ height: "100%" }}>
      <Container style={{ height: "100%" }}>
        <div className="h-full grid place-content-center">
          <Stack
            spacing="xl"
            align="center"
            justify="center"
            className="gap-y-4 "
          >
            <Text>
              <Title className="text-8xl text-white pb-10">
                {register ? "Register" : "Login"}
              </Title>
            </Text>
            {register && (
              <Autocomplete
                value={username}
                onChange={setUsername}
                placeholder="name"
                data={[]}
                className="w-60"
              />
            )}
            <Autocomplete
              value={email}
              onChange={setEmail}
              placeholder="email"
              data={[]}
              className="w-60"
            />
            {register ? (
              <Password password={password} setPassword={setPassword} />
            ) : (
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                required
                // style={{ width:  }}
                className="w-60"
              />
            )}

            {register ? (
              <Button
                disabled={password === "" || email === "" || username === ""}
                style={{ width: 240 }}
                onClick={createUserWithEmail}
                color="indigo"
                variant="light"
                radius="md"
              >
                Register
              </Button>
            ) : (
              <Button
                disabled={password === "" || email === ""}
                onClick={signInWithEmail}
                style={{ width: 240 }}
                color="indigo"
                // variant="light"
                radius="md"
              >
                Login
              </Button>
            )}
            {error !== "" && (
              <>
                <Text color="red">{error}</Text>
              </>
            )}
            {register ? (
              <>
                <Text
                  onClick={() => {
                    setRegister(false);
                  }}
                  className="font-semibold text-white no-underline hover:underline decoration-indigo-500 cursor-pointer"
                >
                  ログイン画面へ
                </Text>
              </>
            ) : (
              <Text
                onClick={() => {
                  setRegister(true);
                }}
                className="font-semibold text-white no-underline hover:underline decoration-indigo-500 cursor-pointer"
              >
                新規登録
              </Text>
            )}
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default Login;
