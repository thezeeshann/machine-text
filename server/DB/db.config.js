import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "error"],
    errorFormat: "pretty"
});
export default prisma;
