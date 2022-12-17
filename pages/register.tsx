import { NextPage } from "next";
import Link from "next/link";
import { setCookie } from "nookies";
import React from "react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { FormInput } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormScheme } from "../utils/validation";
import { Api } from "../utils/api";
import { UserRegisterDto } from "../utils/api/types";
import { useRouter } from "next/router";
import { AuthLayout } from "../layouts/AuthLayout";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormScheme),
  });

  const onSubmitForm = async (dto: UserRegisterDto) => {
    try {
      const user = await Api().user.register(dto);
      setCookie(null, "token", user.token, {
        maxAge: 30 * 60 * 24 * 60,
        path: "/",
      });
      setErrorMessage("");
      router.push("/");
    } catch (err) {
      if(err?.response?.data?.code === "23505") {
        setErrorMessage("Аккаунт с таким email уже существуют");
      } else {
        setErrorMessage("Ошибка при регистрации");
      }
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="form">
          <h2 className="title">Регистрация</h2>
          <p className="text">
            Пожалуйста, заполните данные, чтобы зарегистрироваться
          </p>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
          <div className="inputs">
            <FormInput name="name" label="Имя:" />
            <FormInput name="email" label="Email:" />
            <FormInput name="password" label="Пароль:" />
          </div>
          <button className="btn">Регистрация</button>
          <div className="link">
            Уже есть аккаунт? <Link href="/login">Войдите</Link>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default RegisterPage;
