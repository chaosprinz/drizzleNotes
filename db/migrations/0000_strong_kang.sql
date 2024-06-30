CREATE TABLE `quotes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text,
	`quote` text,
	`created_at` text DEFAULT (current_timestamp)
);
