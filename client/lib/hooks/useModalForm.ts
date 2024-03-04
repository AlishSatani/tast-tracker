import { useState } from "react";

export const useModalForm = (onCompleted?: (data?: any) => void) => {
  const [editView, setEditView] = useState<string | null>(null);
  const onCreateEdit = (id?: string) => {
    setEditView(id || "create");
  };
  const onClose = () => {
    setEditView(null);
  };

  return {
    entityId: !editView || editView === "create" ? undefined : editView,
    onComplete: (data?: any) => {
      onClose();
      if (onCompleted) onCompleted(data);
    },
    onCancel: onClose,
    onClose,
    onCreateEdit,
    open: !!editView,
  };
};
