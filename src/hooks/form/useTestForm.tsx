import { useMemo } from "react";
import { IFormStructure } from "../../models/Form";
import { useForm } from "react-hook-form";

export type TestFormValues = {
  firstname: string;
  lastname: string;
  sex: string;
  birthDate: string;
  birthCountry: string;
  birthTown: string;
};

export const useTestForm = () => {
  const methods = useForm<TestFormValues>({
    defaultValues: {
      firstname: undefined,
      lastname: undefined,
    },
  });

  const formStructure = useMemo<IFormStructure<TestFormValues>[]>(
    () => [
      {
        inputType: "input",
        name: "firstname",
        placeholder: "first name",
        label: "first name",
        col: 24,
      },
      {
        inputType: "input",
        name: "lastname",
        placeholder: "last name",
        label: "last name",
        col: 24,
      },
      {
        inputType: "radio",
        name: "sex",
        label: "sex",
        col: 24,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
        style: {
          display: "flex",
          flexDirection: "column",
          border: "solid 1px red",
        },
      },
      {
        inputType: "input",
        name: "birthCountry",
        label: "birth country",
        col: 12,
      },
      {
        inputType: "input",
        name: "birthTown",
        label: "birth town",
        col: 12,
      },
      // {
      //   inputType: "group",
      //   name: "birthDetails",
      //   col: 24,
      //   group: [
      //     {
      //       inputType: "input",
      //       name: "birthCountry",
      //       label: "birth country",
      //       col: 12,
      //     },
      //     {
      //       inputType: "input",
      //       name: "birthTown",
      //       label: "birth town",
      //       col: 12,
      //     },
      //   ],
      // },
    ],
    []
  );

  const onSubmit = (values: TestFormValues) => {
    console.log("values:", values);
  };

  return { methods, formStructure, onSubmit };
};
