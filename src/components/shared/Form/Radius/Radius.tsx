import { FC } from "react";
import { CheckboxProps, Radio } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

import styles from "./Radius.module.scss";

import { IRulesType } from "../../../../models/Form";
import classname from "../../../../utils/classname";

interface ICustomRadiusProps extends CheckboxProps {
  error?: string | undefined;
  value?: string | undefined;
  label?: string | undefined;
}

interface IControlledRadiusProps extends Omit<CheckboxProps, "error"> {
  name: string;
  control: Control<any, any>;
  rules?: IRulesType | undefined;
  error?: FieldError | undefined;
  options?: { label: string; value: string }[];
}

const Radius = ({ error, type, ...props }: ICustomRadiusProps) => (
  <div className={styles["radius-container"]}>
    <Radio
      {...props}
      className={classname([
        styles["radius-container__element"],
        error && styles["radius-container__element--error"],
      ])}
    >
      {props?.label}
    </Radio>
    {error && <label>{error}</label>}
  </div>
);

const ControlledRadius: FC<IControlledRadiusProps> = ({
  control,
  name,
  rules,
  value: _value,
  error: _error,
  options,
  style,
}) => {
  console.log({ _error });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        // return (
        //   <Radius
        //     onChange={onChange}
        //     value={_value}
        //     error={error?.message}
        //     {...props}
        //   />
        return (
          <Radio.Group
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={classname(["someClass", _error && "errorClass"])}
            style={style}
          >
            {options?.map((option) => (
              <Radio value={option.value} key={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      }}
    />
  );
};

Radius.Controlled = ControlledRadius;
export { Radius };
