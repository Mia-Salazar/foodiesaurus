export async function deleteAccount(): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/account", { method: "DELETE" });
  } catch {
    throw new Error("No hemos podido eliminar la cuenta. Prueba otra vez.");
  }

  if (res.status === 401) {
    throw new Error("Tienes que iniciar sesión para eliminar la cuenta.");
  }
  if (!res.ok) {
    throw new Error("No hemos podido eliminar la cuenta. Prueba otra vez.");
  }
}
