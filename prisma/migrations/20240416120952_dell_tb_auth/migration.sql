/*
  Warnings:

  - You are about to drop the `auths` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "auths" DROP CONSTRAINT "auths_id_user_fkey";

-- DropTable
DROP TABLE "auths";
