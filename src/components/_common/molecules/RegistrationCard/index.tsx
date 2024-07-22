import { ButtonSmall } from "~/components/_common/atoms/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { User } from "~/types/userTypes";
import useAction from "~/hooks/useActions";
import { ColumnStatus } from "~/enums/ColumnStatus";
import LoadingBarComponent from "~/components/_common/atoms/LoadingBar";

type Props = {
  data: User;
  fetchUsers: () => void;
};

const RegistrationCard: React.FC<Props> = ({ data, fetchUsers }) => {
  const { status, error, performAction } = useAction();

  const handleAction = async (status: ColumnStatus) => {
    await performAction(status, data);
    fetchUsers();
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser aria-label="Employee Name" />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail aria-label="Email" />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar aria-label="Admission Date" />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status !== ColumnStatus.REPROVED && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => handleAction(ColumnStatus.REPROVED)}
          >
            Reprovar
          </ButtonSmall>
        )}
        {data.status !== ColumnStatus.APPROVED && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => handleAction(ColumnStatus.APPROVED)}
          >
            Aprovar
          </ButtonSmall>
        )}
        {data.status !== ColumnStatus.REVIEW && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => handleAction(ColumnStatus.REVIEW)}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash
          aria-label="Delete"
          onClick={() => handleAction(ColumnStatus.DELETED)}
        />
      </S.Actions>
      {status === "loading" && <LoadingBarComponent />}
      {status === "failed" && <p>Error: {error}</p>}
    </S.Card>
  );
};

export default RegistrationCard;
