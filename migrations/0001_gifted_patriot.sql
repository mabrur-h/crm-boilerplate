CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`company` text,
	`note` text,
	`stage` text DEFAULT 'new' NOT NULL,
	`nextContactDate` text,
	`createdBy` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `clients_stage_idx` ON `clients` (`stage`);--> statement-breakpoint
CREATE INDEX `clients_next_contact_date_idx` ON `clients` (`nextContactDate`);