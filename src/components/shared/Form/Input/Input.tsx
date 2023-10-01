import { FC } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { Input as InputAnt, InputProps, Tooltip, TooltipProps } from "antd";
import Search from "antd/es/input/Search";
import { Controller, ControllerProps, FieldError } from "react-hook-form";

import style from "./Input.module.scss";

import { InfoCircleOutlined } from "@ant-design/icons";

import { IRulesType } from "../../../../models/Form";
import { Icon } from "../../Icon/Icon";
import classname from "../../../../utils/classname";

export interface ICustomInputProps extends InputProps {
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  search?: boolean | undefined;
  secureTextEntry?: boolean | undefined;
  error?: string | undefined;
  value?: string | undefined;
  hint?: TooltipProps["title"];
  mask?: InputMaskProps | undefined;
  label?: string;
  onSearch?: ((value: string) => void) | undefined;
  labelClassName?: string;
}

export interface IControlledInputProps extends Omit<InputProps, "error"> {
  name: string;
  control: ControllerProps["control"];
  rules?: IRulesType | undefined;
  error?: string | undefined;
}

const renderInput = ({
  secureTextEntry,
  search,
  mask,
  onSearch,
  ...props
}: ICustomInputProps) => {
  if (secureTextEntry) return <InputAnt.Password {...props} />;
  if (search) return <Search allowClear {...props} onSearch={onSearch} />;
  /* @ts-ignore */
  if (mask && !props.disabled)
    return (
      <InputMask {...mask} {...props}>
        {/* @ts-ignore */}
        {(maskProps: InputMaskProps) => <InputAnt {...maskProps} />}
      </InputMask>
    );

  return <InputAnt {...props} />;
  // return <input />;
};

const Input = ({
  error,
  secureTextEntry,
  hint,
  search,
  onSearch,
  className,
  label,
  labelClassName,
  ...props
}: ICustomInputProps) => {
  return (
    <div
      className={classname([
        style["input-container__element"],
        error && style["input-container__element--error"],
        className,
      ])}
    >
      <div className={style["input-container__input-wrapper"]}>
        {/* {label ? (
          <label className={classname([style["input-container__label"], labelClassName])}>
            {label}
          </label>
        ) : null} */}
        {renderInput({
          error,
          secureTextEntry,
          hint,
          search,
          onSearch,
          className,
          label,
          ...props,
        })}

        {error && (
          <label className={style["input-container__space"]}>
            <Icon icon="Info" size={16} color="red" />
            &nbsp;{error}
          </label>
        )}
      </div>
      {hint && (
        <Tooltip title={hint} className={style["input-container__hint"]}>
          <InfoCircleOutlined />
        </Tooltip>
      )}
    </div>
  );
};

const ControlledInput: FC<IControlledInputProps> = ({
  control,
  name,
  rules,
  value: _value,
  error: _error,
  ...props
}) => {
  // const emailAlreadyInUse: FieldError | undefined = useMemo(() => {
  //   if (
  //     name === 'email' &&
  //     (/auth\/email-already-in-use/.test(registerError) || /user already exists/.test(registerError))
  //   ) {
  //     return { message: i18n.t('validator.email.already_use') } as FieldError;
  //   }
  // }, [registerError]);

  // const externalErrors: FieldError | undefined = useMemo(
  //   () => emailAlreadyInUse || wrongPassword || userNotFound,
  //   [emailAlreadyInUse, wrongPassword, userNotFound],
  // );
  const externalErrors: FieldError | undefined = { type: "", message: "" };
  // const { methods, errors, isFocused, maxLength, handleFocus, handleBlur } = useInput(name, rules);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Input
            onChange={onChange}
            value={value !== undefined ? value : _value}
            error={
              _error ?? error?.message ?? externalErrors?.message ?? undefined
            }
            {...props}
          />
        </>
      )}
    />
  );
};

const PasswordHint = ({ hints }: { hints: string[] }) => (
  <div className={style["password-hint"]}>
    {hints.map((hint) => (
      <label>{hint}</label>
    ))}
  </div>
);

Input.Controlled = ControlledInput;
Input.PasswordHint = PasswordHint;
export { Input };
