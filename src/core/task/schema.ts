import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
	id: serial('id').primaryKey(),
	task: text('task'),
    description: text('description'),
	progress: text('progress'),
    createBy: text('create_by'),
    });