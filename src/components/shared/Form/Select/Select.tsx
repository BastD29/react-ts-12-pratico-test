import { FC, ReactNode, useEffect, useMemo } from "react";
import { Select as SelectAnt, SelectProps } from "antd";
import { Controller, ControllerProps, FieldError } from "react-hook-form";

import styles from "./Select.module.scss";

import { useDispatch, useSelector } from "react-redux";
// import { formSagaActions, formSelectors } from "store/form";

import { IRulesType } from "../../../../models/Form";
import classname from "../../../../utils/classname";
import { formSagaActions, formSelectors } from "../../../../store/form";

interface ICustomSelectProps extends SelectProps {
  error?: string | undefined;
  checked?: boolean | undefined;
  label?: string | undefined;
}

interface IControlledSelectProps extends Omit<SelectProps, "error"> {
  name: string;
  control: ControllerProps["control"];
  rules?: IRulesType | undefined;
  error?: FieldError | undefined;
  footer?: ReactNode | undefined;
  entity?: string | undefined;
  url?: string | undefined;
  parseItem?: ((item: any) => { value: string; label: string }) | undefined;
}

const Select = ({ error, ...props }: ICustomSelectProps) => (
  <div className={styles["select-container"]}>
    <SelectAnt
      className={classname([
        styles["select-container__element"],
        error && styles["select-container__element--error"],
      ])}
      {...props}
    >
      {props?.label}
    </SelectAnt>
    {error && <label>{error}</label>}
  </div>
);

const ControlledSelect: FC<IControlledSelectProps> = ({
  control,
  name,
  rules,
  value: _value,
  error: _error,
  footer,
  entity,
  url,
  options: _options,
  parseItem,
  ...props
}) => {
  const dispatch = useDispatch();
  const isLoader = useSelector(formSelectors.isLoader(entity));
  const options = useSelector(formSelectors.getSelect(entity));

  const parsedOptions = useMemo(() => {
    if (entity) {
      if (parseItem && options)
        return options?.results?.map((o: any) => parseItem(o));
      return options;
    }
    return _options;
  }, [options]);

  useEffect(() => {
    entity && url && dispatch(formSagaActions.sagaGetSelect({ entity, url }));
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          onChange={onChange}
          value={_value || value}
          error={error?.message}
          loading={entity ? isLoader : undefined}
          disabled={entity ? isLoader : false}
          dropdownRender={(menu) => (
            <>
              {menu}
              {footer}
            </>
          )}
          options={parsedOptions}
          {...props}
        />
      )}
    />
  );
};

Select.Controlled = ControlledSelect;
export { Select };
