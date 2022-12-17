import { NextPage } from "next";
import Link from "next/link";
import { setCookie } from "nookies";
import React from "react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { FormInput } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormScheme, RegisterFormScheme } from "../utils/validation";
import { Api } from "../utils/api";
import { UserLoginDto, UserRegisterDto } from "../utils/api/types";
import { useRouter } from "next/router";
import { AuthLayout } from "../layouts/AuthLayout";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUser } = useActions();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormScheme),
  });

  const onSubmitForm = async (dto: UserLoginDto) => {
    try {
      const user = await Api().user.login(dto);
      setCookie(null, "token", user.token, {
        maxAge: 30 * 60 * 24 * 60,
        path: "/",
      });
      dispatch(setUser(user));
      setErrorMessage("");
      router.push("/");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="form">
          <h2 className="title">Вход</h2>
          <p className="text">
            Пожалуйста, заполните данные, чтобы войти в аккаунт
          </p>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
          <div className="inputs">
            <FormInput name="email" label="Email:" />
            <FormInput name="password" label="Пароль:" />
          </div>
          <Link href="/forgot" className="forgot">
            Забыли пароль?
          </Link>
          <button className="btn">Вход</button>
          <div className="link">
            Еще нет аккаунта? <Link href="/register">Зарегистрируйтесь</Link>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default LoginPage;
