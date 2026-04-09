import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { gameSchema } from "@/lib/validations";
import GameForm from "@/components/GameForm";

async function createGame(_: unknown, formData: FormData) {
    "use server";

    const raw = {
        title: formData.get("title") as string,
        developer: formData.get("developer") as string,
        genre: formData.get("genre") as string,
        console_id: parseInt(formData.get("console_id") as string),
        price: parseFloat(formData.get("price") as string),
        releaseDate: formData.get("releaseDate") as string,
        cover: (formData.get("cover") as string) || "no-cover.svg",
        description: formData.get("description") as string,
    };

    const result = gameSchema.safeParse(raw);
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    await prisma.game.create({
        data: {
            title: result.data.title,
            cover: result.data.cover || "no-cover.svg",
            developer: result.data.developer,
            releaseDate: new Date(result.data.releaseDate),
            price: result.data.price,
            genre: result.data.genre,
            description: result.data.description,
            console_id: result.data.console_id,
        },
    });
    redirect("/games?success=created");
}

export default async function NewGamePage() {
    const consoles = await prisma.console.findMany({ orderBy: { name: "asc" } });

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Add Game</h1>
                    <p className="text-white/40 text-sm mt-1">Nuevo juego</p>
                </div>
                <Link href="/games" className="btn btn-ghost btn-sm">← Back</Link>
            </div>

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl">
                <GameForm
                    consoles={consoles}
                    action={createGame}
                    submitLabel="Guardar juego"
                    submitClass="btn-success"
                    cancelHref="/games"
                />
            </div>
        </div>
    );
}