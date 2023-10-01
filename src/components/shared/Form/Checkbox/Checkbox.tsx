import { FC } from "react";
import { Checkbox as CheckboxAnt, CheckboxProps } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from "./Checkbox.module.scss";

import { IRulesType } from "../../../../models/Form";
import classname from "../../../../utils/classname";

interface ICustomCheckboxProps extends CheckboxProps {
  error?: string | undefined;
  value?: string | undefined;
  label?: string | undefined;
}

interface IControlledCheckboxProps extends Omit<CheckboxProps, "error"> {
  name: string;
  control: Control<any, any>;
  rules?: IRulesType | undefined;
  error?: FieldError | undefined;
}

const Checkbox = ({ error, type, ...props }: ICustomCheckboxProps) => {
  console.log({ error });

  return (
    <div className={styles["checkbox-container"]}>
      <CheckboxAnt
        {...props}
        className={classname([
          styles["checkbox-container__element"],
          error && styles["checkbox-container__element--error"],
        ])}
      >
        {props?.label}
      </CheckboxAnt>
      {error && <label>{error}</label>}
    </div>
  );
};

const ControlledCheckbox: FC<IControlledCheckboxProps> = ({
  control,
  name,
  rules,
  value: _value,
  error: _error,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log({ value });

        return (
          <Checkbox
            onChange={onChange}
            checked={!!value}
            value={value}
            error={error?.message}
            {...props}
          />
        );
      }}
    />
  );
};

Checkbox.Controlled = ControlledCheckbox;
export { Checkbox };
