export type IFormSubmitState = "idle" | "submit" | "end";

export interface IFormInitialState {
  loader: { [key: string]: boolean | undefined } | undefined;

  submit:
    | { [key: string]: { status: IFormSubmitState; data: any } }
    | undefined;
  select: { [key: string]: any } | undefined;
  upload: { [key: string]: any[] } | undefined;

  error: { [key: string]: boolean | undefined } | undefined;
}
