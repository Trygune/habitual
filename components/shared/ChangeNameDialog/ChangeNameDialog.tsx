"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChangeNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ChangeNameDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ChangeNameDialogProps) => {
  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl border-[#d4d4cf] bg-[#f8f8f6] dark:border-[#333] dark:bg-[#161616]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold tracking-tight">
            Change your name?
          </DialogTitle>

          <DialogDescription className="text-xs leading-5 text-gray-400 dark:text-[#999]">
            You&apos;ll be taken back to the welcome screen to enter a new name.
            Your habits and history will stay untouched.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 flex-row gap-2 sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-lg text-xs font-semibold text-gray-500 sm:flex-none"
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            className="flex-1 rounded-lg text-xs font-semibold sm:flex-none"
          >
            Yes, change it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeNameDialog;
