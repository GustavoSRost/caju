import { useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import useRegistrations from "~/hooks/useRegistration";
import Columns from "~/components/_common/molecules/Columns";
import * as S from "./styles";
import Loading from "~/components/_common/templates/Loading";
import useActionHandler from "~/hooks/useActionHandler";
import { SearchBar } from "~/components/_common/molecules/Searchbar";

const DashboardPage: React.FC = () => {
  const { users, status, error, fetchUsers } = useRegistrations();
  const toastRef = useRef<Toast>(null);
  const { confirmAction } = useActionHandler(toastRef);

  return (
    <>
      <S.Container>
        <SearchBar fetchUsers={fetchUsers} error={error ?? undefined} />
        {status === "loading" && <Loading />}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <Columns registrations={users} fetchUsers={fetchUsers} />
        )}
      </S.Container>
      <ConfirmDialog />
      <Toast ref={toastRef} />
    </>
  );
};

export default DashboardPage;
