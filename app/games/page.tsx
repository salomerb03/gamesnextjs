import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GamesInfo from "@/components/GamesInfo";

type PageProps = {
    searchParams?: Promise<{
        page?: string;
    }>;
}

export default async function GamesPage({ searchParams }: PageProps) {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect('/');
    }

    return (
        <SideBar currentPath={'/games'}>
            <GamesInfo searchParams={searchParams} />
        </SideBar>
    );
}