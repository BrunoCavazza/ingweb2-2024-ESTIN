-- CreateTable
CREATE TABLE "_GamesToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToUsers_AB_unique" ON "_GamesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToUsers_B_index" ON "_GamesToUsers"("B");

-- AddForeignKey
ALTER TABLE "_GamesToUsers" ADD CONSTRAINT "_GamesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUsers" ADD CONSTRAINT "_GamesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
