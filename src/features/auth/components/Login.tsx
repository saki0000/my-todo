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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/error/ErrorMessage";
import { auth } from "../../../firebase";
import { login } from "../../../redux/userSlice";
import { signInSchema, SignInSchema } from "../type/type";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
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
          case "auth/wrong-password":
            setError("パスワードが正しくありません");
            break;
          case "auth/user-not-found":
            setError("メールアドレスが正しくありません。");
            break;
          default: //想定外
            setError(
              "認証に失敗しました。通信環境がいい所で再度やり直してください。"
            );
        }
      });
  };
  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
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
              <div className="w-60 space-y-2">
                <TextInput
                  placeholder="Email"
                  {...register("email")}
                  className="w-full"
                />
                {errors.email?.message && (
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>
                )}
              </div>

              <div className="w-60 space-y-2">
                <PasswordInput
                  placeholder="Password"
                  {...register("password")}
                  required
                  className="w-full"
                />
                {errors.password?.message && (
                  <ErrorMessage>{errors.password?.message}</ErrorMessage>
                )}
              </div>

              <div className="w-60 space-y-2">
                <Button
                  className="w-full"
                  color="dark"
                  radius="md"
                  type="submit"
                  disabled={
                    !!errors.email?.message || !!errors.password?.message
                  }
                >
                  Login
                </Button>
                {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
              </div>

              <Link
                to="/signUp"
                className="font-semibold text-white no-underline hover:underline decoration-white cursor-pointer"
              >
                <Text>新規登録</Text>
              </Link>
            </Stack>
          </div>
        </Container>
      </div>
    </form>
  );
};

export default Login;
