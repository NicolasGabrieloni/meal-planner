/*
  Warnings:

  - You are about to drop the column `recetas_id` on the `recetas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `recetas_id_idx` ON `recetas`;

-- AlterTable
ALTER TABLE `recetas` DROP COLUMN `recetas_id`;
