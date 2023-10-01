import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from "antd";
import { FC } from "react";
import { Controller, ControllerProps, FieldError } from "react-hook-form";
import { IRulesType } from "models/Form";

import styles from "./DatePicker.module.scss";

type DatePickerProps = AntDatePickerProps;

interface CustomProps {
  error?: string | undefined;
}

type ICustomDatePickerProps = DatePickerProps & CustomProps;

interface IControlledDatePickerProps extends Omit<DatePickerProps, "error"> {
  name: string;
  control: ControllerProps["control"];
  rules?: IRulesType | undefined;
  error?: string | undefined;
}

const DatePick = ({}: ICustomDatePickerProps) => {
  return (
    <div className={styles["datepicker"]}>
      <AntDatePicker />
    </div>
  );
};

const ControlledDatePick: FC<IControlledDatePickerProps> = ({
  name,
  control,
  rules,
  error: _error,
  value: _value,
}) => {
  const externalErrors: FieldError | undefined = { type: "", message: "" };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePick
          onChange={onChange}
          value={value !== undefined ? value : _value}
          error={
            _error ?? error?.message ?? externalErrors?.message ?? undefined
          }
        />
      )}
    />
  );
};

DatePick.Controlled = ControlledDatePick;
export { DatePick };
