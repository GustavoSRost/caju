import { User } from "~/types/userTypes";
import * as S from "./styles";
import RegistrationCard from "~/components/_common/molecules/RegistrationCard";
import { ColumnStatus } from "~/enums/ColumnStatus";

const allColumns = [
  { status: ColumnStatus.REVIEW, title: "Pronto para revisar" },
  { status: ColumnStatus.APPROVED, title: "Aprovado" },
  { status: ColumnStatus.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations: User[];
  fetchUsers: () => void;
};

const Columns: React.FC<Props> = ({ registrations, fetchUsers }) => {
  return (
    <S.Container>
      {allColumns.map((column) => (
        <S.Column status={column.status} key={column.title}>
          <>
            <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
            <S.columnContent>
              {registrations
                .filter((r) => r.status === column.status)
                .map((r) => (
                  <RegistrationCard
                    data={r}
                    key={r.id}
                    fetchUsers={fetchUsers}
                  />
                ))}
            </S.columnContent>
          </>
        </S.Column>
      ))}
    </S.Container>
  );
};

export default Columns;
