import type {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  HTMLAttributes,
} from "react";

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type HTMLInputAreaProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
export type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type HTMLSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
export type HTMLFormProps = DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>;
