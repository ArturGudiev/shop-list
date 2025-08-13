import { Item } from "@/lib/prisma";

export type ItemWithoutId = Except<Item, 'id'>