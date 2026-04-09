"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlert() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");

        if (success === "updated") {
            Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "El juego fue actualizado correctamente.",
                confirmButtonColor: "#9333ea",
                background: "#1d1d1d",
                color: "#ffffff",
                timer: 3000,
                timerProgressBar: true,
            });
        }

        if (success === "created") {
            Swal.fire({
                icon: "success",
                title: "¡Creado!",
                text: "El juego fue agregado correctamente.",
                confirmButtonColor: "#9333ea",
                background: "#1d1d1d",
                color: "#ffffff",
                timer: 3000,
                timerProgressBar: true,
            });
        }

        if (success === "deleted") {
            Swal.fire({
                icon: "success",
                title: "¡Eliminado!",
                text: "El juego fue eliminado correctamente.",
                confirmButtonColor: "#9333ea",
                background: "#1d1d1d",
                color: "#ffffff",
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [searchParams]);

    return null;
}