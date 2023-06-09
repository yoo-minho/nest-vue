-- CreateTable
CREATE TABLE "Access" (
    "id2" SERIAL NOT NULL,
    "createrId" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id2")
);

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
