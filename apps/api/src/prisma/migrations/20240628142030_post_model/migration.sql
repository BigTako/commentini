-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "text" VARCHAR(512) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostReplies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "post_email_key" ON "post"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PostReplies_AB_unique" ON "_PostReplies"("A", "B");

-- CreateIndex
CREATE INDEX "_PostReplies_B_index" ON "_PostReplies"("B");

-- AddForeignKey
ALTER TABLE "_PostReplies" ADD CONSTRAINT "_PostReplies_A_fkey" FOREIGN KEY ("A") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostReplies" ADD CONSTRAINT "_PostReplies_B_fkey" FOREIGN KEY ("B") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
