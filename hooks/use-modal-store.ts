import { ExamWithQuestions } from "@/types";
import { Exam } from "@prisma/client";
import { create } from "zustand";

interface ModalData {
  exam?: Exam;
  fullExam?: ExamWithQuestions;
}

export type ModalType = "createExam" | "createQuestion" | "publishExam";

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,

  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
