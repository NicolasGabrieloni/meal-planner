/*
  Warnings:

  - You are about to drop the column `recipes_id` on the `recetas_favoritas` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `recetas_favoritas` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `recetas_favoritas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `id_recipes_idx` ON `recetas_favoritas`;

-- DropIndex
DROP INDEX `user_id_idx` ON `recetas_favoritas`;

-- AlterTable
ALTER TABLE `recetas_favoritas` DROP COLUMN `recipes_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `ingredientes` TEXT NULL,
    ADD COLUMN `instrucciones` TEXT NULL,
    ADD COLUMN `nombre` TEXT NOT NULL,
    ADD COLUMN `tiempo_preparacion` INTEGER NULL,
    ADD COLUMN `usersId` INTEGER NULL;
