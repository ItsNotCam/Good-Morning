import mysql, { Connection } from 'mysql2';

interface User {
    uuid: string;
    oAuth_key: string | null;
    username: string;
    password: string;
}

interface User_Settings {
    uuid: string;
    weather_cities: Array<string>;
    timezone_cities: Array<string>;
    dark_mode: boolean
}

export default class MySQLDB {
    dbUser: string;
    dbIP: string;
    dbPass: string;
    dbName: string;
    client: object;
    connection: Connection;
    isConnected: boolean;

    constructor(_ip: string, _user: string, _pass: string, _dbName: string) {
        this.dbUser = _user;
        this.dbPass = _pass;
        this.dbName = _dbName;
        this.isConnected = false;

        this.client = {
            host: _ip,
            user: this.dbUser,
            password: this.dbPass,
            database: this.dbName
        };
    }

    connect = async(): Promise<string> => {
        this.connection = await mysql.createConnection(this.client);

        var msg: string = "";
        await this.connection.promise().query("SHOW STATUS")
            .then(() => {
                this.isConnected = true
                msg = "Database Connected Successfully";
            })
            .catch((err) => {
                this.isConnected = false
                msg = `Database failed to connect\n${err}`;
            });

        return new Promise<string>((resolve, reject) => {
            this.isConnected ? resolve(msg) : reject(msg);
        })
    }

    getDatabases = async(): Promise<string> => {
        let response: any = await this.connection.promise().query("SHOW DATABASES");
        return new Promise<string>((resolve, reject) => {
            response === null ? reject(response) : resolve(response);
        });
    }
}