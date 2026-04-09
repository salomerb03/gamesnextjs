"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function GameSearchInput({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        params.delete("page"); // resetea a página 1 al buscar
        startTransition(() => {
            router.replace(`/games?${params.toString()}`);
        });
    }, 300);

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search games..."
                className="input input-bordered bg-base-300 w-full pr-10"
            />
            {isPending && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 loading loading-spinner loading-xs text-white/40" />
            )}
        </div>
    );
}