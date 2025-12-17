-- AlterTable
ALTER TABLE `users` ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
