import { FC } from "react";
import { Switch as SwitchAnt, SwitchProps } from "antd";
import { Controller, ControllerProps, FieldError } from "react-hook-form";

import styles from "./Switch.module.scss";

import { IRulesType } from "../../../../models/Form";
import classname from "../../../../utils/classname";

interface ICustomSwitchProps extends SwitchProps {
  error?: string | undefined;
  checked?: boolean | undefined;
  label?: string | undefined;
}

interface IControlledSwitchProps extends Omit<SwitchProps, "error"> {
  name: string;
  control: ControllerProps["control"];
  rules?: IRulesType | undefined;
  error?: FieldError | undefined;
}

const Switch = ({ error, label, disabled, ...props }: ICustomSwitchProps) => (
  <div className={styles["switch"]}>
    {label && !error ? (
      <label
        className={classname([
          styles["switch__label"],
          disabled && styles["switch__label--disabled"],
        ])}
      >
        {label}
      </label>
    ) : null}

    {error && <label className={styles["switch__error"]}>{error}</label>}

    <SwitchAnt
      className={styles["switch__element"]}
      disabled={disabled}
      {...props}
    />
  </div>
);

const ControlledSwitch: FC<IControlledSwitchProps> = ({
  control,
  name,
  rules,
  checked,
  error: _error,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Switch
          onChange={onChange}
          checked={checked !== undefined ? checked : value}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};

Switch.Controlled = ControlledSwitch;
export { Switch };
