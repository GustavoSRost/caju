import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { User } from "~/types/userTypes";
import { ColumnStatus } from "~/enums/ColumnStatus";
import RegistrationCard from "~/components/_common/molecules/RegistrationCard";
import useAction from "~/hooks/useActions";
import * as S from "./styles";

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
  const { performAction } = useAction();
  const [users, setUsers] = useState<User[]>(registrations);

  useEffect(() => {
    setUsers(registrations);
  }, [registrations]);

  const handleOnDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const user = users.find((u) => u.id === draggableId);
    if (!user) {
      return;
    }

    const newStatus = allColumns.find((column) => column.title === destination.droppableId)?.status;
    if (!newStatus) {
      return;
    }

    await performAction(newStatus, user);

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    setUsers(updatedUsers);

    fetchUsers();
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal">
        {(provided: any) => (
          <S.Container ref={provided.innerRef} {...provided.droppableProps}>
            {allColumns.map((column, index) => (
              <Droppable key={column.title} droppableId={column.title} direction="vertical">
                {(provided: any) => (
                  <S.Column
                    status={column.status}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <S.TitleColumn status={column.status}>
                      {column.title}
                    </S.TitleColumn>
                    <S.columnContent>
                      {users
                        .filter((user) => user.status === column.status)
                        .map((user, index) => (
                          <Draggable key={user.id} draggableId={user.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <RegistrationCard data={user} fetchUsers={fetchUsers} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </S.columnContent>
                  </S.Column>
                )}
              </Droppable>
            ))}
          </S.Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Columns;
