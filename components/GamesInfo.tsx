// Agrega este import arriba
import GameSearchInput from "@/components/GameSearchInput";
import SuccessAlert from "@/components/SuccessAlert";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

type GamesInfoProps = {
    searchParams?: Promise<{
        page?: string;
        q?: string;
    }>;
};

export default async function GamesInfo({ searchParams }: GamesInfoProps) {
    const params = await searchParams;
    const currentPage = Number(params?.page) > 0 ? Number(params?.page) : 1;
    const query = params?.q ?? "";
    const itemsPerPage = 10;

    const where = query
        ? { title: { contains: query, mode: "insensitive" as const } }
        : {};

    const totalGames = await prisma.game.count({ where });
    const totalPages = Math.ceil(totalGames / itemsPerPage);

    const games = await prisma.game.findMany({
        where,
        include: { console: true },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: { id: "asc" },
    });

    return (
        <div>
            <SuccessAlert />
            {/* Header con título y botón agregar */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-6">
                <h1 className="text-4xl">Games</h1>
                <Link href="/games/new" className="btn btn-outline btn-success">
                    + Add Game
                </Link>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex items-center gap-2 mb-6">
                <GameSearchInput defaultValue={query} />
                {query && (
                    <Link href="/games" className="btn btn-ghost btn-sm">
                        Limpiar
                    </Link>
                )}
            </div>

            {/* Grid de juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="card shadow-sm flex flex-col border-2 border-white/20"
                    >
                        <figure className="w-full h-60 relative">
                            <Image
                                src={`/imgs/${game.cover}`}
                                alt={game.title}
                                fill
                                className="object-cover"
                            />
                        </figure>

                        <div className="card-body flex flex-col justify-between bg-black/40 text-white p-4">
                            <h4 className="text-purple-400">US$ {game.price}</h4>
                            <h2 className="card-title text-lg font-bold">{game.title}</h2>
                            <h4 className="text-white/60">
                                Disponible para {game.console.name}
                            </h4>
                            <h4 className="text-white/60">Genre: {game.genre}</h4>

                            <div className="card-actions flex items-center gap-2 mt-4">
                                <Link
                                    href={`/games/${game.id}/edit`}
                                    className="btn btn-outline btn-warning btn-sm"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/games/${game.id}`}
                                    className="btn btn-outline btn-info btn-sm"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/games/${game.id}/delete`}
                                    className="btn btn-outline btn-error btn-sm"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-8">
                    <Link
                        href={`/games?page=${currentPage - 1}${query ? `&q=${query}` : ""}`}
                        className={`px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition ${currentPage <= 1 ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        ← Anterior
                    </Link>
                    <span className="text-white">
                        Página {currentPage} de {totalPages}
                    </span>
                    <Link
                        href={`/games?page=${currentPage + 1}${query ? `&q=${query}` : ""}`}
                        className={`px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition ${currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        Siguiente →
                    </Link>
                </div>
            )}
        </div>
    );
}