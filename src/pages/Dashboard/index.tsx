import Collumns from "~/components/_common/molecules/Collumns";
import * as S from "./styles";
import { SearchBar } from "~/components/_common/molecules/Searchbar";

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </S.Container>
  );
};
export default DashboardPage;
