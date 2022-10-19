import { Client } from "pg";
import { Response } from 'express';
import { RegisterRequest } from "../types";

export const register = async (client: Client, req: RegisterRequest, res: Response): Promise<void> => {
    const data = req.body;
    const name: RegExp = /^[a-zA-Z ]+$/
    const email: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (data.name === null) {
        res.status(403).send('Name cannot be null.');
        console.log('[x] - Someone tried to register for attendance without a name.');
    } else if (!name.test(data.name)) {
        res.status(403).send('Invalid name provided.');
        console.log('[x] - Someone tried to register for attendance with a bad name.');
    } else if (data.email === null) {
        res.status(403).send('Email cannot be null.');
        console.log('[x] - Someone tried to register for attendance without an email.');
    // } else if (!email.test(data.name)) {
    //     res.status(403).send('Invalid email provided.');
    //     console.log('[x] - Someone tried to register for attendnace with a bad email.');
    } else {
        await client.query(`INSERT INTO attendance(
            userId,
            userTag,
            name,
            email,
            meetingsAttended,
            meetingsHistory,
            isMember
        ) VALUES($1, $2, $3, $4, $5, $6, $7);`, [
            data.userId,
            data.userTag,
            data.name,
            data.email,
            0,
            [],
            false,
        ],
        (e: Error, result: any) => {
            if(e) {
                res.status(500).send(e);
                console.log(`[x] - ${e}`);
                return;
            } else {
                console.log(`[+] - ${data.userTag} registered for attendance!`);
                res.status(201).send(`Success! ${data.userTag} registered for attendance!`);
                return;
            }
        });
    }
    return;
}