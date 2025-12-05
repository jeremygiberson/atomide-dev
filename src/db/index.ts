import { drizzle } from 'drizzle-orm/d1';

export interface Env {
    ATOMIDE_DB: D1Database;
}

export const createDb = (env: Env) => {
    return drizzle(env.ATOMIDE_DB);
};
