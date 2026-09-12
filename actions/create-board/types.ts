import { z } from "zod";
import { CreateBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@/src/prisma/db";

export type InputType = z.infer<typeof CreateBoard>;

export type ReturnType = ActionState<InputType, Board>; 