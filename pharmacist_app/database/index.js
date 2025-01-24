import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { userSchema } from './schema';
import User from './models/user';



const adapter = new SQLiteAdapter({
  schema: userSchema,
});

export const database = new Database({
  adapter,
  modelClasses: [User],
  actionsEnabled: true,
});
