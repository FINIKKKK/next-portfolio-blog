import * as yup from "yup";

export const RegisterFormScheme = yup.object().shape({
  name: yup.string().min(3, "Неверное зачение").required("Обязательное поле"),
  email: yup.string().email("Неверное зачение").required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Обязательное поле"),
});

export const LoginFormScheme = yup.object().shape({
  email: yup.string().email("Неверное зачение").required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Обязательное поле"),
});
