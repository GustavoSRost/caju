import { ColumnStatus } from "~/enums/ColumnStatus";
import { User } from "~/types/userTypes";
import useAction from "~/hooks/useActions";
import { useToast } from "~/context/ToastContext";
import { confirmDialog } from "primereact/confirmdialog";

const useActionHandler = (_toastRef?: unknown) => {
  const { performAction, error } = useAction();
  const { show } = useToast();

  const handleToast = (message: string, severityColor: string) => {
    show(severityColor, "Notification", message);
  };

  const confirmAction = (
    status: ColumnStatus = ColumnStatus.REVIEW,
    user: User,
    fetchUsers?: () => void,
    onSuccess?: () => void
  ) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          await performAction(status, user);
          if (error) {
            handleToast("Failed to perform action.", "error");
            return;
          }

          handleToast("Action performed successfully!", "success");
          if (fetchUsers) fetchUsers();
          if (onSuccess) onSuccess();
        } catch (err) {
          handleToast("Failed to perform action.", "error");
        }
      },
      reject: () => handleToast("Action cancelled.", "info"),
    });
  };

  return { confirmAction };
};

export default useActionHandler;
