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

type Props = {
  data: User;
  fetchUsers: () => void;
};

const RegistrationCard: React.FC<Props> = ({ data, fetchUsers }) => {
  const { status, error, performAction } = useAction();

  const handleApprove = async () => {
    await performAction(ColumnStatus.APPROVED, data);
    fetchUsers();
  };

  const handleReprove = async () => {
    await performAction(ColumnStatus.REPROVED, data);
    fetchUsers();
  };

  const handleReview = async () => {
    await performAction(ColumnStatus.REVIEW, data);
    fetchUsers();
  };

  const handleDelete = async () => {
    await performAction(ColumnStatus.DELETED, data);
    fetchUsers();
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status != ColumnStatus.REPROVED && (
          <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={handleReprove}>
            Reprovar
          </ButtonSmall>
        )}
        {data.status != ColumnStatus.APPROVED && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={handleApprove}
          >
            Aprovar
          </ButtonSmall>
        )}
        {data.status != ColumnStatus.REVIEW && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={handleReview}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash onClick={handleDelete} />
      </S.Actions>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
    </S.Card>
  );
};

export default RegistrationCard;
