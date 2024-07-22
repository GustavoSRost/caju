import { useState, useCallback } from "react";
import * as Yup from "yup";
import useAction from "./useActions";
import { User } from "~/types/userTypes";
import { formatDate } from "~/utils/validations";

type ValidationErrors = {
  [key: string]: string;
};

const useFormValidation = <T>(
  initialValues: T,
  validationSchema: Yup.ObjectSchema<any>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createUser } = useAction();

  const validateForm = useCallback(
    async (values: T) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        setErrors({});
        return true;
      } catch (err) {
        const validationErrors: ValidationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
        }
        setErrors(validationErrors);
        return false;
      }
    },
    [validationSchema]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formattedValues = {
        ...values,
        admissionDate: values.admissionDate
          ? formatDate(values.admissionDate)
          : "",
      };

      const isValid = await validateForm(formattedValues);
      if (isValid) {
        await createUser(formattedValues as unknown as User);
      }
      setIsSubmitting(false);
    },
    [validateForm, values, createUser]
  );
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
