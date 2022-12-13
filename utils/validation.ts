import * as yup from "yup";

export const RegisterFormScheme = yup.object().shape({
  name: yup.string().min(3, "Неверное значение").required("Обязательное поле"),
  email: yup.string().email("Неверное значение").required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Обязательное поле"),
});
