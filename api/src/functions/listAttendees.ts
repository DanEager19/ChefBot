import { Request, Response } from 'express';
import { Client } from 'pg';

export const listAttendees = async (client: Client, req: Request, res: Response) => {
    await client.query(`SELECT * FROM attendance ORDER BY name ASC`,
        (e: Error, result: any) => {
            if(e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                res.status(200).send(result.rows);
                console.log(`[~] - Sent a list of attendees.`);
                return;
            }
        }
    );
    return;
}