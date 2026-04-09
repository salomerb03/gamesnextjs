import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import SuccessAlert from "@/components/SuccessAlert";

export default async function ConsolesInfo() {
    const consoles = await prisma.console.findMany({
        orderBy: { id: "asc" },
    });

    return (
        <div>
            <SuccessAlert />

            {/* Header */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-6">
                <h1 className="text-4xl">Consoles</h1>
                <Link href="/consoles/new" className="btn btn-outline btn-success">
                    + Add Console
                </Link>
            </div>

            {/* Grid de consolas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {consoles.map((console) => (
                    <div
                        key={console.id}
                        className="card shadow-sm flex flex-col border-2 border-white/20"
                    >
                        <figure className="w-full h-60 relative">
                            <Image
                                src={`/imgs/${console.image}`}
                                alt={console.name}
                                fill
                                className="object-cover"
                            />
                        </figure>

                        <div className="card-body flex flex-col justify-between bg-black/40 text-white p-4">
                            <h2 className="card-title text-lg font-bold">{console.name}</h2>
                            <h4 className="text-white/60">By {console.manuFacturer}</h4>
                            <h4 className="text-white/60">
                                {new Date(console.releaseDate).getFullYear()}
                            </h4>

                            <div className="card-actions flex items-center gap-2 mt-4">
                                <Link
                                    href={`/consoles/${console.id}/edit`}
                                    className="btn btn-outline btn-warning btn-sm"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/consoles/${console.id}`}
                                    className="btn btn-outline btn-info btn-sm"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/consoles/${console.id}/delete`}
                                    className="btn btn-outline btn-error btn-sm"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}