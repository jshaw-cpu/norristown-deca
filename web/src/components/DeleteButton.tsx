"use client";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!window.confirm(confirmMessage)) {
            e.preventDefault();
          }
        }}
        className="font-head font-bold text-xs uppercase tracking-wide text-silver hover:text-red-600 transition"
      >
        Delete
      </button>
    </form>
  );
}
