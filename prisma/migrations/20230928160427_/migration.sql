/*
  Warnings:

  - Added the required column `unidad_medida` to the `despensa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidad_medida` to the `shop_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despensa` ADD COLUMN `unidad_medida` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shop_list` ADD COLUMN `unidad_medida` VARCHAR(191) NOT NULL;
