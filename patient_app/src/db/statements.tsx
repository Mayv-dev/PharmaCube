import { Database } from "sqlite3";

export function dbQuery() {
    const db = new Database('./database.db');

    return new Promise((resolve,reject) => 
        db.all("SELECT * FROM schedule", (err, rows:any[]) =>
            err ? reject(err)
                : resolve(rows.map(row => row['time']))
        )
    );
}