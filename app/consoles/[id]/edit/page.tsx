import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { consoleSchema } from "@/lib/validations";
import ConsoleForm from "@/components/ConsoleForm";

async function updateConsole(_: unknown, formData: FormData) {
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

    const consoleId = parseInt(formData.get("id") as string);
    await prisma.console.update({
        where: { id: consoleId },
        data: {
            name: result.data.name,
            image: result.data.cover || "no-image.png",
            releaseDate: new Date(result.data.releaseDate),
            manuFacturer: result.data.manuFacturer,
            description: result.data.description,
        },
    });
    redirect("/consoles?success=updated");
}

export default async function EditConsolePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const console = await prisma.console.findUnique({ where: { id: parseInt(id) } });

    if (!console) notFound();

    const releaseDateStr = console.releaseDate.toISOString().split("T")[0];

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Edit Console</h1>
                    <p className="text-white/40 text-sm mt-1">{console.name}</p>
                </div>
                <Link href="/consoles" className="btn btn-ghost btn-sm">← Back</Link>
            </div>

            <div className="bg-base-200 border border-white/10 rounded-2xl p-6 shadow-xl">
                <ConsoleForm
                    action={updateConsole}
                    defaultValues={{
                        id: console.id,
                        name: console.name,
                        manuFacturer: console.manuFacturer,
                        releaseDate: releaseDateStr,
                        description: console.description,
                        image: console.image,
                    }}
                    submitLabel="Update Console"
                    submitClass="btn-warning"
                    cancelHref="/consoles"
                />
            </div>
        </div>
    );
}