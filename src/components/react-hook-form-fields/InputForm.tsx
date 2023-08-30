import React, { FC } from 'react';

import { Control, Controller, } from 'react-hook-form';

import { InputText } from '../InputText';

type TInputFormProp = {
  name: string;
  control: Control;
  required?: boolean;
  placeholder: string;
  rules?: { [x: string]: any };
  width?: number | string;
  mt?: number | string;
};


export const InputForm: FC<TInputFormProp> = ({
  name,
  control,
  required,
  placeholder,
  rules = {},
  width,
  mt
}) => {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <InputText
          value={value}
          onChangeText={onChange}
          required={required}
          style={{ marginTop: mt, width: width }}
          label={placeholder}

        />
      )}
    />
  );
};

