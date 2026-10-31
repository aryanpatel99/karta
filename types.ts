import { Card, List } from "@/src/prisma/db";

// Only the fields the board page selects. createdAt is left out because
// Temporal.Instant can't be passed to client components.
export type CardItem = Pick<Card, "id" | "title" | "order" | "description" | "listId" | "updatedAt">;

export type ListWithCards = Pick<List, "id" | "title" | "order" | "boardId" | "updatedAt"> & {
  cards: CardItem[];
};
