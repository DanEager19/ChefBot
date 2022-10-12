import { Client } from "pg";
import { Response } from 'express';
import { ListAttendanceRequest } from "../types"

export const listAttendance = async (client: Client, req: ListAttendanceRequest, res: Response) => {
    const data = req.body;

    await client.query(`SELECT meetingsAttended, meetingsHistory FROM attendance WHERE userId=$1;`,
        [data.userId],
        (e: Error, result: any) => {
            if(e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                console.log(`[~] - ${data.userTag} requested their attendance history.`);
                res.status(200).send(result.rows[0]);
                return;
            }
        }
    )
    return;
}