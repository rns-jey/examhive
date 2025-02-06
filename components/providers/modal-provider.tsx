"use client";

import CreateExamModal from "../organisms/modals/create-exam-modal";
import CreateQuestionModal from "../organisms/modals/create-question-modal";
import PublishExamModal from "../organisms/modals/publish-exam-modal copy";

export default function ModalProvider() {
  return (
    <>
      <CreateExamModal />
      <CreateQuestionModal />
      <PublishExamModal />
    </>
  );
}
