"use client";
import { useActionState } from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

type ConsoleFormProps = {
    action: (prevState: unknown, formData: FormData) => Promise<{ errors?: Record<string, string[]> }>;
    defaultValues?: {
        id?: number;
        name?: string;
        manuFacturer?: string;
        releaseDate?: string;
        description?: string;
        image?: string;
    };
    submitLabel: string;
    submitClass: string;
    cancelHref: string;
};

const initialState = { errors: {} };

export default function ConsoleForm({
    action,
    defaultValues = {},
    submitLabel,
    submitClass,
    cancelHref,
}: ConsoleFormProps) {
    const [state, formAction] = useActionState(action, initialState);
    const errors = state?.errors ?? {};

    return (
        <form action={formAction} className="flex flex-col gap-5">

            {defaultValues.id && (
                <input type="hidden" name="id" value={defaultValues.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Name</span>
                    <input
                        name="name"
                        defaultValue={defaultValues.name}
                        className={`input input-bordered bg-base-300 ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && <span className="text-xs text-red-400">{errors.name[0]}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/50 uppercase tracking-widest">Manufacturer</span>
                    <input
                        name="manuFacturer"
                        defaultValue={defaultValues.manuFacturer}
                        className={`input input-bordered bg-base-300 ${errors.manuFacturer ? "input-error" : ""}`}
                    />
                    {errors.manuFacturer && <span className="text-xs text-red-400">{errors.manuFacturer[0]}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 uppercase tracking-widest">Release Date</span>
                <input
                    name="releaseDate"
                    type="date"
                    defaultValue={defaultValues.releaseDate}
                    className={`input input-bordered bg-base-300 ${errors.releaseDate ? "input-error" : ""}`}
                />
                {errors.releaseDate && <span className="text-xs text-red-400">{errors.releaseDate[0]}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50 uppercase tracking-widest">Description</span>
                <textarea
                    name="description"
                    defaultValue={defaultValues.description}
                    className={`textarea textarea-bordered bg-base-300 h-28 ${errors.description ? "textarea-error" : ""}`}
                />
                {errors.description && <span className="text-xs text-red-400">{errors.description[0]}</span>}
            </div>

            <ImageUpload currentCover={defaultValues.image ?? "no-image.png"} />

            <div className="border-t border-white/10 pt-4 flex justify-end gap-3">
                <Link href={cancelHref} className="btn btn-ghost">Cancel</Link>
                <button type="submit" className={`btn px-8 ${submitClass}`}>
                    {submitLabel}
                </button>
            </div>

        </form>
    );
}