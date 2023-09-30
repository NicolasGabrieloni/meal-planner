/*
  Warnings:

  - The primary key for the `recomendados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_recomendados_recipes` on the `recomendados` table. All the data in the column will be lost.
  - You are about to drop the column `idrecomendados` on the `recomendados` table. All the data in the column will be lost.
  - Added the required column `id` to the `recomendados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `recomendados` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `id_recomendados_recipes_idx` ON `recomendados`;

-- AlterTable
ALTER TABLE `recomendados` DROP PRIMARY KEY,
    DROP COLUMN `id_recomendados_recipes`,
    DROP COLUMN `idrecomendados`,
    ADD COLUMN `descripcion` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `ingredientes` TEXT NULL,
    ADD COLUMN `instrucciones` TEXT NULL,
    ADD COLUMN `nombre` TEXT NOT NULL,
    ADD COLUMN `tiempo_preparacion` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);
