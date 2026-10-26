"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { deleteAccount } from "../api/deleteAccount";

export function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    setError(null);
    setPending(true);
    try {
      await deleteAccount();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "No hemos podido eliminar la cuenta. Prueba otra vez.",
      );
      setPending(false);
      return;
    }

    try {
      await signOut({ redirectTo: "/" });
    } catch {
      window.location.assign("/");
    }
  }

  return (
    <div className="mt-8 border-t border-neutral-200 pt-6">
      <h2 className="m-0 font-teko text-3xl font-semibold tracking-wide">
        Eliminar cuenta
      </h2>
      <p className="mt-2 mb-4 max-w-xl text-neutral-800">
        {confirming
          ? "Esto borra tu cuenta y tus opiniones. Los restaurantes se quedan."
          : "Puedes borrar tu cuenta y tus opiniones. Los restaurantes se quedan."}
      </p>
      {error && (
        <p role="alert" className="mb-4 text-neutral-800">
          {error}
        </p>
      )}
      {confirming ? (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={confirmDelete}
            disabled={pending}
            aria-busy={pending}
            className="inline-flex min-h-11 items-center justify-center rounded bg-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-white hover:opacity-80 disabled:opacity-60"
          >
            {pending ? "Eliminando la cuenta..." : "Sí, eliminar mi cuenta"}
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirming(false);
              setError(null);
            }}
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded border border-neutral-800 px-5 py-2.5 text-sm font-bold text-neutral-800 hover:opacity-80"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex min-h-11 items-center justify-center rounded border border-neutral-800 px-5 py-2.5 text-sm font-bold text-neutral-800 hover:opacity-80"
        >
          Eliminar cuenta
        </button>
      )}
    </div>
  );
}
