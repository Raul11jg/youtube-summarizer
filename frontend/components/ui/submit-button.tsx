import { Spinner } from "./spinner";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function SubmitButton({
  isLoading,
  loadingText = "Loading...",
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="from-primary to-primary/90 text-primary-foreground shadow-primary/25 hover:shadow-primary/30 w-full rounded-xl bg-linear-to-r px-6 py-4 font-semibold shadow-lg transition-all hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
