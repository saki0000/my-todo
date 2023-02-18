import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { login } from "../../../redux/userSlice";
import { schema, Schema } from "../type/type";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();
  const createUserWithEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            uid: user.uid,
            // displayName: username,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };
  const onSubmit: SubmitHandler<Schema> = (data) => {
    createUserWithEmail(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <Title className="text-8xl text-white pb-10">Register</Title>
              </Text>
              <TextInput
                placeholder="Email"
                {...register("email")}
                style={{ width: "auto" }}
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
                variant="light"
                radius="md"
                type="submit"
              >
                Register
              </Button>

              {/* {error !== "" && (
              <>
                <Text color="red">{error}</Text>
              </>
            )} */}

              <>
                <Text
                  onClick={() => {}}
                  className="font-semibold text-white no-underline hover:underline decoration-white cursor-pointer"
                >
                  ログイン画面へ
                </Text>
              </>
            </Stack>
          </div>
        </Container>
      </div>
    </form>
  );
};

export default SignUp;
