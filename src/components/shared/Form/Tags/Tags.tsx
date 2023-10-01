import { FC, ReactNode, useEffect, useMemo } from "react";
import { Select as SelectAnt, SelectProps } from "antd";
import { Controller, ControllerProps, FieldError } from "react-hook-form";

import styles from "./Tags.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { IRulesType } from "../../../../models/Form";
import { formSagaActions, formSelectors } from "../../../../store/form";

interface ICustomTagsProps extends SelectProps {
  error?: string | undefined;
  checked?: boolean | undefined;
  label?: string | undefined;
}

interface IControlledTagsProps extends Omit<SelectProps, "error"> {
  name: string;
  control: ControllerProps["control"];
  rules?: IRulesType | undefined;
  error?: FieldError | undefined;
  footer?: ReactNode | undefined;
  entity?: string | undefined;
  url?: string | undefined;
  parseItem?: ((item: any) => { value: string; label: string }) | undefined;
  isMultiple?: boolean | undefined;
}

const Tags = ({ error, ...props }: ICustomTagsProps) => (
  <div className={styles["tags-container"]}>
    <SelectAnt
      className={styles["tags-container__select"]}
      {...props}
      mode="tags"
    >
      {props?.label}
    </SelectAnt>
    {error && <label>{error}</label>}
  </div>
);

const ControlledTags: FC<IControlledTagsProps> = ({
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
  isMultiple = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const isLoader = useSelector(formSelectors.isLoader(entity));
  const options = useSelector(formSelectors.getSelect(entity));

  const parsedOptions = useMemo(() => {
    if (entity) {
      if (parseItem && options) return options?.map((o: any) => parseItem(o));
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
        <Tags
          onChange={onChange}
          value={
            value ? (isMultiple ? value : value?.[value?.length - 1]) : _value
          }
          error={error?.message}
          loading={entity ? isLoader : undefined}
          disabled={entity ? isLoader : false}
          options={parsedOptions}
          {...props}
        />
      )}
    />
  );
};

Tags.Controlled = ControlledTags;
export { Tags };
