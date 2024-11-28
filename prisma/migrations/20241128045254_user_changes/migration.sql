/*
  Warnings:

  - Added the required column `updated_At` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_At" TIMESTAMP(3) NOT NULL;
