import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ConsoleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const console = await prisma.console.findUnique({
        where: { id: parseInt(id) },
        include: { games: true },
    });

    if (!console) notFound();

    return (
        <div className="max-w-2xl mx-auto py-6">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">{console.name}</h1>
                    <p className="text-white/40 text-sm mt-1">by {console.manuFacturer}</p>
                </div>
                <Link href="/consoles" className="btn btn-ghost btn-sm">← Back</Link>
            </div>

            <div className="relative w-full h-72 mb-6">
                <Image
                    src={`/imgs/${console.image}`}
                    alt={console.name}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-3 text-white">
                <p><span className="text-white/50">Manufacturer:</span> {console.manuFacturer}</p>
                <p><span className="text-white/50">Release Date:</span> {new Date(console.releaseDate).toLocaleDateString()}</p>
                <p><span className="text-white/50">Games available:</span> {console.games.length}</p>
                <p><span className="text-white/50">Description:</span> {console.description}</p>
            </div>

            <div className="flex gap-3 mt-6">
                <Link href={`/Consoles/${console.id}/edit`} className="btn btn-outline btn-warning">
                    Edit
                </Link>
                <Link href={`/Consoles/${console.id}/delete`} className="btn btn-outline btn-error">
                    Delete
                </Link>
            </div>
        </div>
    );
}