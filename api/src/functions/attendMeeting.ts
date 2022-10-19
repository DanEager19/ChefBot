import { Client } from "pg";
import { Response } from 'express';
import { AttendMeetingRequest } from "../types"

export const attendMeeting = async (client: Client, req: AttendMeetingRequest, res: Response) => {
    const data = req.body;
    const d = new Date();

    await client.query(`UPDATE attendance SET meetingsAttended=meetingsAttended + 1, meetingsHistory = array_append(meetingsHistory, $1) WHERE userId=$2;`,
        [d.toString().slice(0,10), data.userId],
        async (e: Error, result: any) => {
            if (e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                console.log(`[~] - ${data.userTag} attended today's meeting!`);
                res.status(200).send('Success! You attended today\'s meeting!');
                return;
            }
        }
    );
}