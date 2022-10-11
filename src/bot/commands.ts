import { AddItem } from "./commands/AddItem";
import { Attend } from "./commands/Attend";
import { AttendanceHistory } from "./commands/AttendanceHistory";
import { GetItems } from "./commands/GetItems";
import { GetReservations } from "./commands/GetReservations";
import { MonadoMonday } from "./commands/MonadoMonday";
import { Register } from "./commands/Register";
import { RemoveItem } from "./commands/RemoveItem";
import { Reserve } from "./commands/Reserve";
import { Return } from "./commands/Return";
import { RoleReact } from "./commands/RoleReact";
import { Twitter } from "./commands/Twitter";
import { UpdateItems } from "./commands/UpdateItem";

export const commandFiles = [
    AddItem, 
    GetItems, 
    GetReservations, 
    MonadoMonday, 
    RemoveItem,
    Reserve,
    Return,
    RoleReact,
    Twitter, 
    UpdateItems,
    Attend,
    AttendanceHistory,
    Register,
];