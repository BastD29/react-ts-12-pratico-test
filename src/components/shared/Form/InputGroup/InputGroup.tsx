import { FC } from "react";
import {
  IControlledInputProps,
  ICustomInputProps,
  Input,
} from "../Input/Input";

import styles from "./InputGroup.module.scss";
import { Controller } from "react-hook-form";

interface ICustomInputGroupProps {
  inputs: ICustomInputProps[];
}

interface IControlledInputGroupProps {
  controlledInputs: IControlledInputProps[];
}

const InputGroup: FC<ICustomInputGroupProps> = ({
  inputs,
}: ICustomInputGroupProps) => (
  <div className={styles["input-group"]}>
    {inputs.map(() => (
      <Input />
    ))}
  </div>
);

export { InputGroup };
