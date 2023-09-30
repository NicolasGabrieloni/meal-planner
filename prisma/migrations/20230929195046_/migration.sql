/*
  Warnings:

  - You are about to drop the column `id_recipes_destacados` on the `destacados` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `destacados` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `id_recipes_destacados_idx` ON `destacados`;

-- AlterTable
ALTER TABLE `destacados` DROP COLUMN `id_recipes_destacados`,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `ingredientes` TEXT NULL,
    ADD COLUMN `instrucciones` TEXT NULL,
    ADD COLUMN `nombre` TEXT NOT NULL,
    ADD COLUMN `tiempo_preparacion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recetas` MODIFY `tiempo_preparacion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recetas_favoritas` MODIFY `tiempo_preparacion` VARCHAR(191) NULL;
