"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useToast } from "@/hooks/use-toast";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function PublishExamModal() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "publishExam";
  const { exam } = data;

  const handleClose = () => {
    onClose();
  };

  const { toast } = useToast();
  const router = useRouter();

  async function onAction() {
    try {
      await axios.patch(`/api/exam/${exam?.id}/publish`, { examId: exam?.id, isPublished: true });

      toast({
        description: `Successfully published exam!`,
      });

      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to publish this exam?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onAction()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
