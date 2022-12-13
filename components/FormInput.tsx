import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
};

export const FormInput: React.FC<FormInputProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();
  const [inputName, setInputName] = React.useState("");

  const clearInput = () => {
    setInputName("");
  };

  return (
    <div className="input">
      <input
        {...register(name)}
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        type="text"
        name={name}
        placeholder={label}
      />
      {inputName && (
        <svg onClick={clearInput} width="20" height="20">
          <use xlinkHref="./static/img/icons/icons.svg#close" />
        </svg>
      )}
    </div>
  );
};
