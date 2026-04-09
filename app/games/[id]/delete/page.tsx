import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function DeleteGamePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
        include: { console: true },
    });

    if (!game) notFound();

    async function deleteGame() {
        "use server";
        await prisma.game.delete({ where: { id: parseInt(id) } });
        redirect("/games?success=deleted");
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="border-2 border-red-500 rounded-lg p-6 flex flex-col gap-4">
                <h1 className="text-2xl text-red-400">Delete Game</h1>
                <p className="text-white/70">
                    Are you sure you want to delete <span className="text-white font-bold">{game.title}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-2">
                    <form action={deleteGame}>
                        <button type="submit" className="btn btn-error">
                            Yes, Delete
                        </button>
                    </form>
                    <Link href="/games" className="btn btn-ghost">
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
}