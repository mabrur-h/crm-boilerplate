CREATE TABLE `client_files` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`size` integer NOT NULL,
	`contentType` text NOT NULL,
	`uploadedBy` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`uploadedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `client_files_key_unique` ON `client_files` (`key`);--> statement-breakpoint
CREATE INDEX `client_files_client_id_idx` ON `client_files` (`clientId`);