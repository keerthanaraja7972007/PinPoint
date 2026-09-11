import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => onDismiss(), 3000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed top-4 right-4 z-[3000] toast-enter">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border max-w-sm ${
          isSuccess
            ? "bg-white border-green-200"
            : isError
            ? "bg-white border-red-200"
            : "bg-white border-slate-200"
        }`}
      >
        {isSuccess && (
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
        )}
        {isError && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
        <p className="text-sm font-medium text-slate-700 flex-1">{toast.message}</p>
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="p-0.5 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
