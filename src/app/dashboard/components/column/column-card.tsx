import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import { Card, CardContent } from "@/components/ui/card";
import ColumnHeader from "./column-header";
import NoTasksMessage from "../task/no-tasks-message";
import SubtlePatternBackground from "@/components/ui/subtle-pattern-background";
import TaskCard from "../task/task-card";
import { Column } from "@prisma/client";
import { useKanbanStore } from "@/stores/kanban";
import { useShallow } from "zustand/react/shallow";

const ColumnCard = ({
  column,
  boardTitle,
}: {
  column: Column;
  boardTitle: string;
}) => {
  const tasks = useKanbanStore(
    useShallow((state) => state.getFilteredTasks(boardTitle, column.id)),
  );

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <Card
      className={`relative max-h-[500px] w-72 shrink-0 snap-start overflow-y-auto transition-all duration-300 md:w-80 ${
        isOver
          ? "before:absolute before:inset-0 before:animate-pulse before:bg-gradient-to-b before:from-blue-500/5 before:to-transparent before:opacity-100"
          : "border-border before:opacity-0"
      }`}
      ref={setNodeRef}
    >
      {tasks.length >= 1 && <SubtlePatternBackground />}
      <ColumnHeader
        column={column}
        tasksCount={tasks.length}
        boardTitle={boardTitle}
      />
      <CardContent className="flex-grow space-y-2 overflow-y-auto p-3">
        {tasks?.length === 0 ? (
          <NoTasksMessage columnId={column.id} />
        ) : (
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks?.map((task) => (
              <TaskCard key={task.id} task={task} columnId={column.id} />
            ))}
          </SortableContext>
        )}
      </CardContent>
    </Card>
  );
};

export default ColumnCard;
