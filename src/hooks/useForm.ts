import { useState, useCallback } from "react";
import * as Yup from "yup";
import { User } from "~/types/userTypes";
import { formatDate } from "~/utils/validations";
import useActionHandler from "~/hooks/useActionHandler";
import { ColumnStatus } from "~/enums/ColumnStatus";

type ValidationErrors = {
  [key: string]: string;
};

type FormValues = {
  admissionDate: string;
} & Record<string, any>;

const useFormValidation = <T extends FormValues>(
  initialValues: T,
  validationSchema: Yup.ObjectSchema<any>,
  createUser: (user: User) => Promise<void>,
  fetchUsers: () => void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { confirmAction } = useActionHandler();

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
        confirmAction(
          ColumnStatus.REVIEW, 
          formattedValues as unknown as User,
          fetchUsers,
          () => createUser(formattedValues as unknown as User)
        );
      }
      setIsSubmitting(false);
    },
    [validateForm, values, confirmAction, createUser, fetchUsers]
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
