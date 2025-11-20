"use client";

import { useState, useEffect, useRef } from "react";
import { submitQuestion } from "@/app/actions/video";
import { QuestionFormState, VideoQuestion } from "@/validations/video";
import { Loader2, Send } from "lucide-react";

interface VideoChatProps {
  videoSummaryId: number;
  initialQuestions: VideoQuestion[];
}

const INITIAL_STATE: QuestionFormState = {
  success: false,
  message: "",
  strapiError: null,
  isLoading: false,
  zodError: null,
  data: {},
  answer: null,
};

export function VideoChat({
  videoSummaryId,
  initialQuestions,
}: VideoChatProps) {
  const [questions, setQuestions] = useState<VideoQuestion[]>(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zodErrors, setZodErrors] = useState<Record<string, string[]> | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setZodErrors(null);

    try {
      const result = await submitQuestion(INITIAL_STATE, formData);

      if (result.success && result.answer) {
        // Add the new Q&A to the list
        const newQuestion: VideoQuestion = {
          id: Date.now(), // Temporary ID
          question: result.data.question || "",
          answer: result.answer,
          createdAt: new Date().toISOString(),
        };
        setQuestions((prev) => [...prev, newQuestion]);

        // Reset form
        formRef.current?.reset();
      } else {
        if (result.strapiError) setError(result.strapiError);
        if (result.zodError) setZodErrors(result.zodError);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 dark:bg-neutral-950">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Ask Questions</h3>
        <p className="text-muted-foreground text-sm">
          Chat with AI about this video
        </p>
      </div>

      {/* Chat history */}
      <div className="mb-4 max-h-[400px] space-y-4 overflow-y-auto rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-900">
        {questions.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            No questions yet. Ask something about this video!
          </div>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="space-y-2">
              {/* User question */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground max-w-[80%] rounded-lg rounded-tr-none px-4 py-2">
                  <p className="text-sm">{q.question}</p>
                </div>
              </div>
              {/* AI answer */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-neutral-800">
                  <p className="text-sm">{q.answer}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-lg rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-neutral-800">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      )}

      {zodErrors?.question && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {zodErrors.question[0]}
        </div>
      )}

      {/* Question input form */}
      <form ref={formRef} action={handleSubmit} className="flex gap-2">
        <input type="hidden" name="videoSummaryId" value={videoSummaryId} />
        <textarea
          name="question"
          rows={2}
          placeholder="Ask a question about this video..."
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          className="focus:ring-primary flex-1 resize-none rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center self-end rounded-lg px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}
