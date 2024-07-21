import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/_common/atoms/Buttons";
import { IconButton } from "~/components/_common/atoms/Buttons/IconButton";
import TextField from "~/components/_common/atoms/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

type Props = {
  fetchUsers: ()=> void;
}
export const SearchBar: React.FC<Props>  = ({fetchUsers}) =>{
  const history = useHistory();

  const handleRefresh = () => fetchUsers();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
