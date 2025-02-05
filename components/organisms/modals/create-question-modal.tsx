"use client";

import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  question: z.string().nonempty(),
  choices: z.string().array().nonempty().length(4),
  correctAnswer: z.string().nonempty(),
});

export default function CreateQuestionModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: "",
    },
  });

  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "createQuestion";
  const { exam } = data;

  const handleClose = () => {
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/questions`, { ...values, examId: exam?.id });

      toast({
        description: `Successfully added new question!`,
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Question</DialogTitle>
          <DialogDescription>
            Add a new question with multiple choice answers. Make sure to select the correct answer.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your question" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            {[0, 1, 2, 3].map((index) => (
              <FormField
                key={index}
                control={form.control}
                name={`choices.${index}`} // Use array notation for choices
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2 items-center">
                    <FormLabel>{String.fromCharCode(65 + index)}.</FormLabel> {/* A, B, C, D */}
                    <FormControl>
                      <Input
                        placeholder={`Enter choice ${String.fromCharCode(65 + index)}.`}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-1">
                      {[0, 1, 2, 3].map((index) => (
                        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={`${form.watch(`choices.${index}`).toLowerCase()}`} />
                          </FormControl>
                          <FormLabel className="font-normal">{form.watch(`choices.${index}`)}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
