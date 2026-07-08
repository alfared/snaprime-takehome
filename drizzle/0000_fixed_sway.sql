CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`input_url` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`error` text,
	`extracted_text` text,
	`images` text DEFAULT '[]',
	`brand_profile` text,
	`ads` text DEFAULT '[]',
	`latency_ms` integer,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
