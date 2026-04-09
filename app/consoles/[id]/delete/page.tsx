import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function DeleteConsolePage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ error?: string }>;
}) {
    const { id } = await params;
    const { error } = await searchParams;

    const console = await prisma.console.findUnique({
        where: { id: parseInt(id) },
        include: { _count: { select: { games: true } } },
    });

    if (!console) notFound();

    async function deleteConsole() {
        "use server";
        const gamesCount = await prisma.game.count({
            where: { console_id: parseInt(id) },
        });
        if (gamesCount > 0) {
            redirect(`/consoles/${id}/delete?error=Esta consola tiene ${gamesCount} juego(s) asociado(s). Elimínalos primero desde la sección Games.`);
        }
        await prisma.console.delete({ where: { id: parseInt(id) } });
        redirect("/consoles?success=deleted");
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="border-2 border-red-500 rounded-2xl p-6 flex flex-col gap-4">
                <h1 className="text-2xl text-red-400">Delete Console</h1>

                <p className="text-white/70">
                    Estas seguro de que quieres eliminar?{" "}
                    <span className="text-white font-bold">{console.name}</span>?
                    Esta acción no se puede deshacer
                </p>

                {/* Muestra cuántos juegos tiene */}
                {console._count.games > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <p className="text-yellow-400 text-sm">
                            ⚠ Esta consola tiene{" "}
                            <span className="font-bold">{console._count.games} juego(s)</span>{" "}
                            asociado(s). Debes eliminarlos primero desde la sección Games.
                        </p>
                    </div>
                )}

                {/* Error de validación */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <p className="text-red-400 text-sm">⚠ {error}</p>
                    </div>
                )}

                <div className="flex gap-3 mt-2">
                    {/* Solo muestra el botón si no tiene juegos */}
                    {console._count.games === 0 && (
                        <form action={deleteConsole}>
                            <button type="submit" className="btn btn-error">
                                Yes, Delete
                            </button>
                        </form>
                    )}
                    <Link href="/consoles" className="btn btn-ghost">Cancel</Link>
                </div>
            </div>
        </div>
    );
}