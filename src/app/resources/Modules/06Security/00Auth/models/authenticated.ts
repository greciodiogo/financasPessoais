
import { Token } from "./token";
import { User } from "../../02Users/models/User";


export class Authenticated {
    user: User;
    token: Token;
    role: any;
    permissions: any;
}
