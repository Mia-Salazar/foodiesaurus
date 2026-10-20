import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const isLoggedIn = await auth();

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <section className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-4 py-8">
      <form
        className="flex w-full max-w-md flex-col items-center rounded border border-slate-300 p-5"
        action={async () => {
          "use server";

          await signIn("google", {
            redirectTo: "/",
          });
        }}
      >
        <h1 className="mb-5 text-center text-xl font-semibold">
          Entra en Foodiesaurus
        </h1>
        <p className="mb-5 text-center text-sm text-neutral-800">
          Usa tu cuenta de Google para iniciar sesión.
        </p>

        <button
          type="submit"
          className="
            min-h-11
            w-full rounded bg-foodiesaurus
            px-5 py-2.5
            font-bold text-white
            hover:opacity-80
            focus-visible:ring-2
            focus-visible:ring-white
          "
        >
          Iniciar sesión con Google
        </button>
      </form>
    </section>
  );
}
