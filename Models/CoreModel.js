import { Database } from "../Lib/Database.js";

export class CoreModel {
    db;
    constructor() {
        this.db = new Database();
    }
}