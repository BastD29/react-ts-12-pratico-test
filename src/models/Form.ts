import type {
  ColProps,
  // DatePickerProps,
  InputProps,
  SelectProps,
  SwitchProps,
  UploadProps,
} from "antd";

import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type IRulesType = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type IFormStructure<FormValues = any> = Omit<
  // Partial<DatePickerProps> &
  Partial<InputProps> &
    Partial<SwitchProps> &
    Partial<SelectProps> &
    Partial<UploadProps> & {
      inputType:
        | "input"
        | "checkbox"
        | "switch"
        | "select"
        | "tags"
        | "upload"
        | "radio"
        | "empty"
        | "datePicker";
      name: FormValues extends Object ? keyof FormValues : string;
      label?: string | undefined;
      placeholder?: string | undefined;
      rules?: ControllerProps["rules"] | undefined;
      col?: number | undefined;
      entity?: string | undefined;
      url?: string | undefined;
      parseItem?: ((item: any) => { value: string; label: string }) | undefined;
      responsive?: ColProps | undefined;
      options?: { label: string; value: string }[];
    },
  "onChange" | "allowClear" | "type"
> & { type?: InputProps["type"] };
