import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('task', {
	id: serial('id').primaryKey(),
	task: text('task'),
    description: text('description'),
	progress: text('progress'),
    createBy: text('create_by'),
    });