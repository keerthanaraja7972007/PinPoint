import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteConfirmDialog({ location, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 overlay-enter"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50">
              <Trash2 className="w-4.5 h-4.5 text-red-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-base font-bold text-slate-800">
              Delete Location?
            </h2>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3 mb-5 p-3 rounded-xl bg-red-50 border border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              Are you sure you want to remove{" "}
              <span className="font-bold text-slate-800">"{location.name}"</span>?
              This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(location.id)}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 shadow-sm transition-all"
            >
              <Trash2 className="w-4 h-4" strokeWidth={2.5} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
