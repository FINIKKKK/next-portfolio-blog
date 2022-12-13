import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
};

export const FormInput: React.FC<FormInputProps> = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [inputName, setInputName] = React.useState("");
  const [showedPassword, setShowedPassword] = React.useState(false);
  const isPassword = name === "password";

  const clearInput = () => {
    setInputName("");
  };

  const showPassword = () => {
    setShowedPassword(!showedPassword);
  };

  return (
    <div className={`input ${isPassword ? "password" : ""}`}>
      <input
        {...register(name)}
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        type={isPassword && !showedPassword ? "password" : "text"}
        name={name}
        placeholder={label}
      />
      <div className="icons">
        {inputName && isPassword && (
          <svg onClick={showPassword} width="20" height="20">
            <use xlinkHref={`./static/img/icons/icons.svg#${!showedPassword ? 'eye' : 'noeye'}`} />
          </svg>
        )}
        {inputName && (
          <svg onClick={clearInput} width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#close" />
          </svg>
        )}
      </div>
      <div className="error">{errors[name]?.message}</div>
    </div>
  );
};
