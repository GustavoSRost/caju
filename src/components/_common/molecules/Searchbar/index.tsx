import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/_common/atoms/Buttons";
import { IconButton } from "~/components/_common/atoms/Buttons/IconButton";
import TextField from "~/components/_common/atoms/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { cpfMask, removeCpfMask } from "~/utils/mask";
import { useState } from "react";

type Props = {
  fetchUsers: (cpf?: string) => void;
  error?: string;
};

export const SearchBar: React.FC<Props> = ({ fetchUsers, error }) => {
  const [maskedCpf, setMaskedCpf] = useState("");
  const history = useHistory();

  const handleRefresh = () => {
    setMaskedCpf("");
    fetchUsers();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaskedCpf(cpfMask(inputValue));
    if (inputValue.length === 14 || inputValue.length === 0) {
      fetchUsers(removeCpfMask(inputValue));
    }
  };

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        maxLength={14}
        onChange={handleSearchChange}
        value={maskedCpf}
        error={error ?? undefined}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
