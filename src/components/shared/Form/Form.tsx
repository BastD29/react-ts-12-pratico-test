import { Col, FormProps } from "antd";
import { FC, ReactNode, RefObject, useMemo } from "react";
import {
  Control,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { IFormStructure } from "../../../models/Form";
import classname from "../../../utils/classname";
import styles from "./Form.module.scss";

import { Input } from "./Input/Input";
import { Switch } from "./Switch/Switch";
import { Select } from "./Select/Select";
import { Tags } from "./Tags/Tags";
import { Checkbox } from "./Checkbox/Checkbox";
import { Radius } from "./Radius/Radius";
// import { DatePick } from "./DatePicker/DatePicker";

interface ICustomFormProps
  extends Pick<FormProps, "layout" | "size" | "id">,
    Pick<HTMLFormElement, "onSubmit"> {
  children: ReactNode;
  innerRef?: RefObject<HTMLButtonElement> | undefined;
  methods?: UseFormReturn<any>;
  onSubmitSuccess?: SubmitHandler<any>;
  formOptions?: UseFormProps;
  onSubmitError?: SubmitErrorHandler<any>;
  className?: string;
}

interface IFormBuilderProps {
  structure: IFormStructure;
  readOnly?: boolean;
  control: Control<any, any>;
}

const Form = ({
  layout,
  size,
  children,
  onSubmit,
  ...props
}: ICustomFormProps) => {
  const layoutClasssName = useMemo(() => {
    switch (layout) {
      case "inline":
        return "ant-form-inline";
      case "horizontal":
        return "ant-form-horizontal";
      default:
        return "ant-form-vertical";
    }
  }, [layout]);

  const sizeClasssName = useMemo(() => {
    switch (size) {
      case "small":
        return "ant-form-small";
      case "large":
        return "ant-form-large";
      default:
        return "ant-form-middle";
    }
  }, [size]);

  return (
    <form
      className={classname([
        "ant-form",
        styles["form"],
        layoutClasssName,
        sizeClasssName,
      ])}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

const FormItem = ({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string | undefined;
  label?: string | undefined;
}) => (
  <div className={classname(["ant-form-item", className])}>
    {label && (
      <div className="ant-col ant-form-item-label">
        <label title={label}>{label}</label>
      </div>
    )}
    {children}
  </div>
);

const FormBuilder: FC<IFormBuilderProps> = ({
  structure,
  control,
  readOnly = false,
}) => (
  <>
    <Col
      span={structure?.col || 8}
      key={structure.name}
      {...structure?.responsive}
    >
      <Form.Item className="mb-2" key={structure.name} label={structure.label}>
        {structure.inputType === "input" && (
          <Input.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {structure.inputType === "switch" && (
          <Switch.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {structure.inputType === "select" && (
          <Select.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {structure.inputType === "tags" && (
          <Tags.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {structure.inputType === "checkbox" && (
          <Checkbox.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {structure.inputType === "radio" && (
          <Radius.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )}
        {/* {structure.inputType === "datePicker" && (
          <DatePick.Controlled
            control={control}
            {...structure}
            disabled={readOnly}
          />
        )} */}
        {structure.inputType === "empty" && <div />}
      </Form.Item>
    </Col>
  </>
);

Form.Item = FormItem;
Form.FormBuilder = FormBuilder;
export { Form };
