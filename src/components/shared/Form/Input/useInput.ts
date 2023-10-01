import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import type { UseControllerProps } from "react-hook-form";

export const useInput = (name: string, rules: UseControllerProps["rules"]) => {
  const methods = useFormContext();
  const errors = methods?.formState.errors?.[name];
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!rules) return;

    if (rules.maxLength) {
      setMaxLength(typeof rules.maxLength === "number" ? rules.maxLength : rules.maxLength.value);
    }
  }, [rules]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return {
    methods,
    errors,
    isFocused,
    maxLength,
    // Functions
    handleFocus,
    handleBlur,
  };
};
