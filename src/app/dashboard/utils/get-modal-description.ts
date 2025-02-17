import type { formOperationMode } from "@/lib/types";
import type { ModalType } from "@/lib/types/modal";

export const getModalDescription = (
  type: ModalType,
  mode: formOperationMode,
) => {
  const descriptions: Record<ModalType, Record<formOperationMode, string>> = {
    board: {
      create: "Set up your board with a name, description, and template.",
      edit: "Modify the board details below.",
    },
    task: {
      create:
        "Create a task to outline your work and track progress effortlessly.",
      edit: "Refine your task details to better align with your goals.",
    },
    column: {
      create:
        "Pick a status for your new column to manage tasks and prioritize your work efficiently.",
      edit: "Refine the column details to better align with your workflow.",
    },
  };
  return descriptions[type]?.[mode] || "";
};
