import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { consoleSchema } from "@/lib/validations";
import ConsoleForm from "@/components/ConsoleForm";

async function createConsole(_: unknown, formData: FormData) {
    "use server";

    const raw = {
        name: formData.get("name") as string,
        manuFacturer: formData.get("manuFacturer") as string,
        releaseDate: formData.get("releaseDate") as string,
        description: formData.get("description") as string,
        cover: (formData.get("cover") as string) || "no-image.png",
    };

    const result = consoleSchema.safeParse(raw);
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    await prisma.console.create({
        data: {
            name: result.data.name,
            image: result.data.cover || "no-image.png",
            releaseDate: new Date(result.data.releaseDate),
            manuFacturer: result.data.manuFacturer,
            description: result.data.description,
        },
    });
    redirect("/consoles?success=created");
}

export default async function NewConsolePage() {
    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Add Console</h1>
                    <p className="text-white/40 text-sm mt-1">Nueva consola</p>
                </div>
                <Link href="/consoles" className="btn btn-ghost btn-sm">← Back</Link>
            </div>

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl">
                <ConsoleForm
                    action={createConsole}
                    submitLabel="Save Console"
                    submitClass="btn-success"
                    cancelHref="/consoles"
                />
            </div>
        </div>
    );
}