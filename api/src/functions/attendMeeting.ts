import { Client } from "pg";
import { Response } from 'express';
import { AttendMeetingRequest } from "../types"

export const attendMeeting = async (client: Client, req: AttendMeetingRequest, res: Response) => {
    const data = req.body;
    const d = new Date();
    const attendedToday = false; 
    console.log(data.userId)
    await client.query(`SELECT meetingsHistory FROM attendance WHERE userId=$1;`,
        [data.userId], 
        async (e: Error, result: any) => {
            const attended = result.rows[0].meetingsHistory.pop();
            console.log(e, result);
            if (attended === d) {
                console.log(`[~] - ${data.userTag} tried to attend twice.`);
                res.status(403).send(`You can't attend a meeting twice in one day!`);
            } else {
                await client.query(`UPDATE attendance SET meetingsAttended=meetingsAttended + 1, meetingsHistory = array_append(meetingsHistory, $1) WHERE userId=$2;`,
                [d, data.userId],
                async (e: Error, result: any) => {
                    if (e) {
                        res.status(500).send(e);
                        console.log(`[x] - ${e}`);
                        return;
                    } else {
                        await client.query(`SELECT meetingsAttended FROM attendance WHERE userId=$1;`, [data.userId],  (e: Error, result: any) => {
                            if (e) {
                                res.status(500).send(e);
                                console.log(`[x] - ${e}`);
                                return;
                            } else {
                                console.log(result.rows[0].meetingsAttended);
                                console.log(`[~] - ${data.userTag} attended today's meeting!`);
                                res.status(200).send(result.rows[0].meetingsAttended);
                                return;
                            }
                        });
                    }
                }
            )
            }
        }
    )
}