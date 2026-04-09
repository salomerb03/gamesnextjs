import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function GameDetailPage({
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

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                        Juegos / Detalle
                    </p>
                    <h1 className="text-2xl font-semibold text-white">{game.title}</h1>
                </div>
                <Link href="/games" className="btn btn-sm btn-ghost text-white/50 hover:text-white">
                    ← Volver
                </Link>
            </div>

            {/* Card principal */}
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-lg">

                {/* Portada */}
                <div className="relative w-full h-64">
                    <Image
                        src={`/imgs/${game.cover}`}
                        alt={game.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Sección: Información principal */}
                <Section title="Información principal">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Desarrollador">{game.developer}</Field>
                        <Field label="Género">{game.genre}</Field>
                        <Field label="Consola">{game.console.name}</Field>
                        <Field label="Fecha de lanzamiento">
                            {game.releasedate.toLocaleDateString("es-CO", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </Field>
                    </div>
                </Section>

                {/* Sección: Comercial */}
                <Section title="Comercial">
                    <Field label="Precio">
                        <span className="text-lg font-semibold text-white">
                            US$ {game.price.toFixed(2)}
                        </span>
                    </Field>
                </Section>

                {/* Sección: Descripción */}
                <Section title="Descripción">
                    <p className="text-sm text-white/70 leading-relaxed">
                        {game.description}
                    </p>
                </Section>

                {/* Footer con acciones */}
                <div className="bg-base-300/50 border-t border-white/10 px-6 py-4 flex justify-end gap-3">
                    <Link
                        href={`/games/${game.id}/edit`}
                        className="btn btn-warning btn-sm px-6"
                    >
                        Editar
                    </Link>
                    <Link
                        href={`/games/${game.id}/delete`}
                        className="btn btn-error btn-sm px-6"
                    >
                        Eliminar
                    </Link>
                </div>

            </div>
        </div>
    );
}

/* ── Componentes auxiliares ─────────────────────────────── */

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="px-6 py-5 border-b border-white/10 bg-base-200">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4">
                {title}
            </p>
            {children}
        </div>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[11px] text-white/40 uppercase tracking-widest">
                {label}
            </span>
            <span className="text-sm text-white/80">{children}</span>
        </div>
    );
}