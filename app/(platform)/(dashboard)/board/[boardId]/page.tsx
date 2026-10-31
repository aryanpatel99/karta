import { db } from "@/src/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { orgId } = await auth()

    if (!orgId) {
        redirect("/select-org")
    }

    const { boardId } = await params

    // List has no orgId, so check the board belongs to this org first
    const board = await db.orm.public.Board
        .where({ id: boardId, orgId })
        .select("id")
        .first()

    if (!board) {
        notFound()
    }

    const lists = await db.orm.public.List
        .where({ boardId })
        .select("id", "title", "order", "boardId", "updatedAt")
        .orderBy((l) => l.order.asc())
        .include("cards", (card) =>
            card
                .select("id", "title", "order", "description", "listId", "updatedAt")
                .orderBy((c) => c.order.asc())
        )
        .all()

    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer
            boardId={boardId}
            data={lists}
            />
        </div>
    )
}

export default BoardIdPage
