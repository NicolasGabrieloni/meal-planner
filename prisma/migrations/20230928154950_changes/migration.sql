/*
  Warnings:

  - You are about to drop the column `alacena` on the `despensa` table. All the data in the column will be lost.
  - You are about to drop the column `carnes` on the `despensa` table. All the data in the column will be lost.
  - You are about to drop the column `frutas` on the `despensa` table. All the data in the column will be lost.
  - You are about to drop the column `lacteos` on the `despensa` table. All the data in the column will be lost.
  - You are about to drop the column `vegetales` on the `despensa` table. All the data in the column will be lost.
  - You are about to drop the column `alacena` on the `shop_list` table. All the data in the column will be lost.
  - You are about to drop the column `carnes` on the `shop_list` table. All the data in the column will be lost.
  - You are about to drop the column `frutas` on the `shop_list` table. All the data in the column will be lost.
  - You are about to drop the column `lacteos` on the `shop_list` table. All the data in the column will be lost.
  - You are about to drop the column `vegetales` on the `shop_list` table. All the data in the column will be lost.
  - Added the required column `id` to the `recetas_ingredientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `despensa` DROP FOREIGN KEY `user_id_la_ptqp`;

-- DropForeignKey
ALTER TABLE `destacados` DROP FOREIGN KEY `fk_id_recipes_destacados`;

-- DropForeignKey
ALTER TABLE `recetas` DROP FOREIGN KEY `id_user`;

-- DropForeignKey
ALTER TABLE `recetas` DROP FOREIGN KEY `recetas_id`;

-- DropForeignKey
ALTER TABLE `recetas_favoritas` DROP FOREIGN KEY `fk_favourite_recipes_recipes_id`;

-- DropForeignKey
ALTER TABLE `recetas_favoritas` DROP FOREIGN KEY `user_id_rf`;

-- DropForeignKey
ALTER TABLE `recetas_ingredientes` DROP FOREIGN KEY `ingrediente_id`;

-- DropForeignKey
ALTER TABLE `recetas_ingredientes` DROP FOREIGN KEY `receta_id`;

-- DropForeignKey
ALTER TABLE `recomendados` DROP FOREIGN KEY `fk_id_recomendados_recipes`;

-- DropForeignKey
ALTER TABLE `shop_list` DROP FOREIGN KEY `user_id`;

-- AlterTable
ALTER TABLE `despensa` DROP COLUMN `alacena`,
    DROP COLUMN `carnes`,
    DROP COLUMN `frutas`,
    DROP COLUMN `lacteos`,
    DROP COLUMN `vegetales`,
    ADD COLUMN `cantidad` INTEGER NULL,
    ADD COLUMN `nombre_alimento` TEXT NULL,
    ADD COLUMN `tipo_alimento` TEXT NULL;

-- AlterTable
ALTER TABLE `recetas_ingredientes` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `shop_list` DROP COLUMN `alacena`,
    DROP COLUMN `carnes`,
    DROP COLUMN `frutas`,
    DROP COLUMN `lacteos`,
    DROP COLUMN `vegetales`,
    ADD COLUMN `cantidad` INTEGER NULL,
    ADD COLUMN `nombre_alimento` TEXT NULL,
    ADD COLUMN `tipo_alimento` TEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(256) NOT NULL;
