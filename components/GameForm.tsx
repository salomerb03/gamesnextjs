"use client";
import { useActionState } from "react";
import Link from "next/link";

type Console = { id: number; name: string };

type GameFormProps = {
    consoles: Console[];
    action: (prevState: unknown, formData: FormData) => Promise<{ errors?: Record<string, string[]> }>;
    defaultValues?: {
        id?: number;
        title?: string;
        developer?: string;
        genre?: string;
        console_id?: number;
        price?: number;
        releaseDate?: string;
        cover?: string;
        description?: string;
    };
    submitLabel: string;
    submitClass: string;
    cancelHref: string;
};

const initialState = { errors: {} };

export default function GameForm({
    consoles,
    action,
    defaultValues = {},
    submitLabel,
    submitClass,
    cancelHref,
}: GameFormProps) {
    const [state, formAction] = useActionState(action, initialState);
    const errors = state?.errors ?? {};

    return (
        <form action={formAction} className="flex flex-col gap-5">

            {defaultValues.id && (
                <input type="hidden" name="id" value={defaultValues.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Título</span>
                    <input
                        name="title"
                        defaultValue={defaultValues.title}
                        className={`input input-bordered bg-base-300 ${errors.title ? "input-error" : ""}`}
                    />
                    {errors.title && <span className="text-xs text-red-400">{errors.title[0]}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Desarrollador</span>
                    <input
                        name="developer"
                        defaultValue={defaultValues.developer}
                        className={`input input-bordered bg-base-300 ${errors.developer ? "input-error" : ""}`}
                    />
                    {errors.developer && <span className="text-xs text-red-400">{errors.developer[0]}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Género</span>
                    <input
                        name="genre"
                        defaultValue={defaultValues.genre}
                        className={`input input-bordered bg-base-300 ${errors.genre ? "input-error" : ""}`}
                    />
                    {errors.genre && <span className="text-xs text-red-400">{errors.genre[0]}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Consola</span>
                    <select
                        name="console_id"
                        defaultValue={defaultValues.console_id ?? ""}
                        className={`select select-bordered bg-base-300 ${errors.console_id ? "select-error" : ""}`}
                    >
                        <option value="" disabled>Selecciona una consola</option>
                        {consoles.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.console_id && <span className="text-xs text-red-400">{errors.console_id[0]}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Precio (USD)</span>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={defaultValues.price}
                        className={`input input-bordered bg-base-300 ${errors.price ? "input-error" : ""}`}
                    />
                    {errors.price && <span className="text-xs text-red-400">{errors.price[0]}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Fecha de lanzamiento</span>
                    <input
                        name="releaseDate"
                        type="date"
                        defaultValue={defaultValues.releaseDate}
                        className={`input input-bordered bg-base-300 ${errors.releaseDate ? "input-error" : ""}`}
                    />
                    {errors.releaseDate && <span className="text-xs text-red-400">{errors.releaseDate[0]}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 uppercase tracking-widest">Cover filename</span>
                <input
                    name="cover"
                    defaultValue={defaultValues.cover ?? "no-cover.svg"}
                    placeholder="no-cover.svg"
                    className="input input-bordered bg-base-300"
                />
                <span className="text-xs text-white/30">Nombre del archivo dentro de /public/imgs/</span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 uppercase tracking-widest">Descripción</span>
                <textarea
                    name="description"
                    defaultValue={defaultValues.description}
                    className={`textarea textarea-bordered bg-base-300 h-28 ${errors.description ? "textarea-error" : ""}`}
                />
                {errors.description && <span className="text-xs text-red-400">{errors.description[0]}</span>}
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-end gap-3">
                <Link href={cancelHref} className="btn btn-ghost">Cancelar</Link>
                <button type="submit" className={`btn px-8 ${submitClass}`}>
                    {submitLabel}
                </button>
            </div>

        </form>
    );
}