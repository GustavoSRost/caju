import { SearchBar } from "~/components/_common/molecules/Searchbar";
import useRegistrations from "~/hooks/useRegistration";
import Columns from "~/components/_common/molecules/Columns";
import * as S from "./styles";
import Loading from "~/components/_common/templates/Loading";

const DashboardPage: React.FC = () => {
  const { users, status, error, fetchUsers } = useRegistrations();

  return (
    <S.Container>
      <SearchBar fetchUsers={fetchUsers} error={error ?? undefined}/>
      {status === "loading" && <Loading />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && <Columns registrations={users} fetchUsers={fetchUsers}/>}
    </S.Container>
  );
};

export default DashboardPage;
