import { Client } from "pg";
import { Response } from 'express';
import { AttendanceInfo, AttendanceInfoRequest } from "../types"

export const attendanceInfo = async (client: Client, req: AttendanceInfoRequest, res: Response) => {
    const data = req.body;
    
    await client.query(`SELECT meetingsHistory, meetingsAttended, isMember FROM attendance WHERE userId=$1;`,
        [data.userId], 
        async (e: Error, result: any) => {
            if (e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                const userInfo: AttendanceInfo = {
                    meetingsHistory: result.rows[0].meetingshistory,
                    meetingsAttended: result.rows[0].meetingsattended,
                    isMember: result.rows[0].ismember,
                };
                const d = new Date();
                const lastMeeting = userInfo.meetingsHistory.pop();

                // if(lastMeeting === d.toString().slice(0,10)) {
                //     res.status(403).send('You can\'t attend am meeting twice silly!');
                //     console.log('[x] - Someone tried to attend a meeting twice!');
                //     return;
                // }

                if(userInfo.meetingsAttended >= 1 && userInfo.isMember === false) {
                    await client.query(`UPDATE attendance SET isMember=TRUE WHERE userId=$1`,
                    [data.userId], 
                    (e: Error, result: any) => {
                        if (e) {
                            res.status(500).send(e);
                            console.log(`[x] - ${e}`);
                            return;
                        } else {
                            res.status(201).send(`${data.userTag} is now a member!`)
                            console.log(`[~] - Gave the member role to ${data.userTag}`);
                            return;
                        }
                    });
                } else {
                    res.status(200).send('All good!');
                    console.log(`[~] - ${data.userTag} passed the prelim attendnace checks.`)
                }
            }
        }
    );

    return;
}