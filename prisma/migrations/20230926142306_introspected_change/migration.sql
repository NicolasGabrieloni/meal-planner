/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_creatorId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `despensa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vegetales` TEXT NULL,
    `frutas` TEXT NULL,
    `alacena` TEXT NULL,
    `carnes` TEXT NULL,
    `lacteos` TEXT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destacados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_recipes_destacados` INTEGER NOT NULL,

    INDEX `id_recipes_destacados_idx`(`id_recipes_destacados`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `categoria` VARCHAR(45) NULL,
    `unidad_medida` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recetas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` TEXT NOT NULL,
    `descripcion` TEXT NULL,
    `ingredientes` TEXT NULL,
    `instrucciones` TEXT NULL,
    `tiempo_preparacion` INTEGER NULL,
    `id_user` INTEGER NOT NULL,
    `recetas_id` INTEGER NOT NULL,

    INDEX `id_user_idx`(`id_user`),
    INDEX `recetas_id_idx`(`recetas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recetas_favoritas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipes_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `id_recipes_idx`(`recipes_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recetas_ingredientes` (
    `receta_id` INTEGER NULL,
    `ingrediente_id` INTEGER NULL,
    `cantidad` INTEGER NULL,

    INDEX `ingrediente_id_idx`(`ingrediente_id`),
    INDEX `receta_id_idx`(`receta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recomendados` (
    `idrecomendados` INTEGER NOT NULL AUTO_INCREMENT,
    `id_recomendados_recipes` INTEGER NOT NULL,

    INDEX `id_recomendados_recipes_idx`(`id_recomendados_recipes`),
    PRIMARY KEY (`idrecomendados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vegetales` TEXT NULL,
    `frutas` TEXT NULL,
    `alacena` TEXT NULL,
    `carnes` TEXT NULL,
    `lacteos` TEXT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `despensa` ADD CONSTRAINT `user_id_la_ptqp` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `destacados` ADD CONSTRAINT `fk_id_recipes_destacados` FOREIGN KEY (`id_recipes_destacados`) REFERENCES `recetas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas` ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas` ADD CONSTRAINT `recetas_id` FOREIGN KEY (`recetas_id`) REFERENCES `recetas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas_favoritas` ADD CONSTRAINT `fk_favourite_recipes_recipes_id` FOREIGN KEY (`recipes_id`) REFERENCES `recetas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas_favoritas` ADD CONSTRAINT `user_id_rf` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas_ingredientes` ADD CONSTRAINT `ingrediente_id` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recetas_ingredientes` ADD CONSTRAINT `receta_id` FOREIGN KEY (`receta_id`) REFERENCES `recetas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recomendados` ADD CONSTRAINT `fk_id_recomendados_recipes` FOREIGN KEY (`id_recomendados_recipes`) REFERENCES `recetas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop_list` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
