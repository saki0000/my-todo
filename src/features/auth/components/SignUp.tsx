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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { login } from "../../../redux/userSlice";
import { signUpSchema, SignUpSchema } from "../type/type";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });
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
        navigation("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/network-request-failed":
            setError(
              "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
            );
            break;
          case "auth/invalid-email": //バリデーションでいかないようにするので、基本的にはこのコードはこない
            setError("メールアドレスが正しくありません");
            break;
          case "auth/email-already-in-use":
            setError(
              "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
            );
            break;
          default: //想定外
            setError(
              "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
            );
        }
      });
  };
  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    createUserWithEmail(data.email, data.password);
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
                <Title className="text-8xl text-white pb-10">Register</Title>
              </Text>
              <div>
                <TextInput
                  placeholder="Email"
                  {...register("email")}
                  className="w-60"
                />
                {errors.email?.message && (
                  <p className="m-0 text-red-500 text-sm">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="w-60">
                <PasswordInput
                  placeholder="Password"
                  {...register("password")}
                  required
                  className="w-60"
                />
                {errors.password?.message && (
                  <p className="m-0 text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="w-60">
                <PasswordInput
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  required
                  className="w-60"
                />
                {errors.confirmPassword?.message && (
                  <p className="m-0 text-red-500 text-sm">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <Button
                style={{ width: 240 }}
                color="dark"
                radius="md"
                type="submit"
              >
                Register
              </Button>

              {error !== "" && (
                <>
                  <Text color="red">{error}</Text>
                </>
              )}

              <Link
                to="/signIn"
                className="font-semibold text-white no-underline hover:underline decoration-white cursor-pointer"
              >
                <Text>ログイン画面へ</Text>
              </Link>
            </Stack>
          </div>
        </Container>
      </div>
    </form>
  );
};

export default SignUp;
