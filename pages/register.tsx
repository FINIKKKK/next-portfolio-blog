import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { setCookie } from "nookies";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import registerImg from "../assets/img/register__img.jpg";
import { FormInput } from "../components";
import { MiniLayout } from "../layouts/MiniLayot";
import { Api } from "../utils/api";
import { UserDto } from "../utils/api/types";
import { RegisterFormScheme } from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserApi } from "../utils/api/user";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormScheme),
  });

  const onSubmitForm = async (dto: UserDto) => {
    try {
      const data = await Api().user.register(dto);
      console.log('data', data);
      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MiniLayout>
      <div className="register">
        <div className="inner">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="form">
              <h2 className="title">Регистрация</h2>
              <p className="text">
                Пожалуйста, заполните данные, чтобы зарегистрироваться
              </p>
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
          <div className="img">
            <Image src={registerImg} alt="register" />
          </div>
        </div>
      </div>
    </MiniLayout>
  );
};

export default RegisterPage;
