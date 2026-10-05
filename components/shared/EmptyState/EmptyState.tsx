import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { NotebookPen } from "lucide-react";

const EmptyState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotebookPen />
        </EmptyMedia>
        <EmptyTitle>No Habits Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any habit yet. Get started by adding your first
          habit.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyState;
