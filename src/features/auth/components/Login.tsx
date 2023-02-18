import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { login } from "../../../redux/userSlice";
import { Schema } from "../type/type";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({});
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const signInWithEmail = (email: string, password: string) => {
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
  const onSubmit: SubmitHandler<Schema> = (data) => {
    signInWithEmail(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="bg-darkBlue" style={{ height: "100%" }}>
        <Container style={{ height: "100%" }}>
          <div className="h-full grid place-content-center">
            <Stack
              spacing="xl"
              align="center"
              justify="center"
              className="gap-y-4 "
            >
              <Text>
                <Title className="text-8xl text-white pb-10">Login</Title>
              </Text>
              <TextInput
                placeholder="Email"
                {...register("email")}
                className="w-60"
              />
              {errors.email?.message && <p>{errors.email?.message}</p>}

              <PasswordInput
                placeholder="Password"
                {...register("password")}
                required
                className="w-60"
              />
              {errors.password?.message && <p>{errors.password?.message}</p>}

              <Button
                style={{ width: 240 }}
                color="dark"
                radius="md"
                type="submit"
              >
                Login
              </Button>
              {error !== "" && (
                <>
                  <Text color="red">{error}</Text>
                </>
              )}

              <Text
                onClick={() => {}}
                className="font-semibold text-white no-underline hover:underline decoration-white cursor-pointer"
              >
                新規登録
              </Text>
            </Stack>
          </div>
        </Container>
      </div>
    </form>
  );
};

export default Login;
