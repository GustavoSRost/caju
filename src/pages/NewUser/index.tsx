import TextField from "~/components/_common/atoms/TextField";
import * as S from "./styles";
import Button from "~/components/_common/atoms/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/_common/atoms/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { cpfMask } from "~/utils/mask";
import * as Yup from "yup";
import useFormValidation from "~/hooks/useForm";
import { FormData } from "~/types/form";
import { isValidCPF } from "~/utils/validations";
import useAction from "~/hooks/useActions";
import useRegistrations from "~/hooks/useRegistration";
import { ConfirmDialog } from "primereact/confirmdialog";

const validationSchema = Yup.object({
  employeeName: Yup.string()
    .required('Nome é obrigatório')
    .matches(/^[^\d][a-zA-Z\s]{2,}$/, 'Nome deve conter pelo menos duas letras, um espaço e não deve começar com um número'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório').test('is-valid-cpf', 'CPF inválido', (value) => {
    return value ? isValidCPF(value) : false;
  }),
  admissionDate: Yup.date()
    .nullable() 
    .required('Data de admissão é obrigatória')
    .typeError('Data inválida')
});

const NewUserPage: React.FC = () => {
  const history = useHistory();
  const { createUser } = useAction();
  const { fetchUsers } = useRegistrations();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormValidation<FormData>(
      { employeeName: "", email: "", cpf: "", admissionDate: "" },
      validationSchema,
      createUser,
      fetchUsers
    );

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const maskedValue = cpfMask(value);
    handleChange({
      target: { name, value: maskedValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <TextField
            name="employeeName"
            placeholder="Nome"
            label="Nome"
            value={values.employeeName}
            onChange={handleChange}
            error={errors.employeeName}
          />
          <TextField
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            name="cpf"
            placeholder="CPF"
            label="CPF"
            maxLength={14}
            value={values.cpf}
            onChange={handleCpfChange}
            error={errors.cpf}
          />
          <TextField
            name="admissionDate"
            label="Data de admissão"
            type="date"
            value={values.admissionDate}
            onChange={handleChange}
            error={errors.admissionDate}
          />
          <Button type="submit" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </form>
      </S.Card>
      <ConfirmDialog />
    </S.Container>
  );
};

export default NewUserPage;
