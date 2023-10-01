import { useTestForm } from "../../../hooks/form/useTestForm";
import { Form } from "../../shared/Form/Form";
import styles from "./Test.module.scss";

export default function Test() {
  const {
    methods: { handleSubmit, control },
    formStructure,
    onSubmit,
  } = useTestForm();

  return (
    <>
      <div className={styles["test"]}>
        <div className={styles["test__header"]}>Test</div>
      </div>

      <Form
        className={styles["test__form"]}
        onSubmit={handleSubmit(onSubmit)}
        id="test-form"
      >
        {formStructure.map((field) => (
          <Form.FormBuilder
            key={field.name}
            structure={field}
            control={control}
          />
        ))}
      </Form>
    </>
  );
}
