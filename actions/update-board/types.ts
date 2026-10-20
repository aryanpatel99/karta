import { z } from "zod";
import UpdateBoard from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@/src/prisma/db";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Pick<Board, "id" | "title">>;