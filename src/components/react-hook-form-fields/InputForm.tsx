import React, { FC } from 'react';

import { Control, Controller, } from 'react-hook-form';

import { InputText } from '../InputText';

type TInputFormProp = {
  name: string;
  control: any;
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
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
  multiline,
  maxLength,
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
          styleText={{ marginTop: 0 }}
          style={{ marginTop: mt, width: width, alignItems: 'center' }}
          placeholder={placeholder}
          multiline={multiline}
          maxLength={maxLength}
          placeholderToLabel

        />
      )}
    />
  );
};

