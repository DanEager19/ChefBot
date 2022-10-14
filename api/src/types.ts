export interface Item {
    id: number,
    name: string,
    description: string,
    inventory: number,
}

export interface Reservation {
    id: number,
    itemName: string,
    itemId: number, 
    email: string,
    returned: boolean
}

export interface ReserveRequest extends Express.Request {
    body: {
        itemId: number, 
        email: string,
    }
}

export interface ReturnRequest extends Express.Request {
    body: {
        id: number, 
    }
}

export interface AddItemRequest extends Express.Request {
    body: {
        name: string,
        description: string, 
        inventory: number
    }
}
export interface UpdateItemRequest extends Express.Request {
    body: {
        id: number,
        name: string,
        description: string, 
        inventory: number
    }
}
export interface RemoveItemRequest extends Express.Request {
    body: {
        id: number,
    }
}

export interface RegisterRequest extends Express.Request {
    body: {
        userId: string,
        userTag: string,
        name: string,
        email: string,
    }
}

export interface AttendMeetingRequest extends Express.Request {
    body: {
        userTag: string,
        userId: string,
    }
}

export interface ListAttendanceRequest extends Express.Request {
    body: {
        userId: string,
        userTag: string,
    }
}