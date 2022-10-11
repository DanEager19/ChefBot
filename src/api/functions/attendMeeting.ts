import { Client } from "pg";
import { Response } from 'express';
import { AttendMeetingRequest } from "../types"

export const attendMeeting = async (client: Client, req: AttendMeetingRequest, res: Response) => {
    const data = req.body;
    const d = new Date();
    await client.query(`UPDATE attendance SET meetingsAttended=meetingsAttended + 1, meetingsAttended = array_append(meetingsAttended, $1) WHERE userId=$2;`,
        [d, data.userId],
        (e: Error, result: any) => {
            if (e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                console.log(`[+] - ${data.userTag} attended today's meeting!`);
                res.status(201).send(`Success! ${data.userTag} attended today's meeting!`);
                return;
            }
        }
    )
}