const classname = (names: (string | undefined | boolean)[]) =>
  names.filter((name) => !!name).join(" ");
export default classname;
