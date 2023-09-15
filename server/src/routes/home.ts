import MySQLDB from "../db/DB";

export const TestDatabase = async(req: any, res: any, DB: MySQLDB) => {
    DB.getDatabases()
        .then((r) => res.json({
            status: "Success",
            value: r
        }))
        .catch((r) => res.json({
            status: "Failed",
            value: null
        }));
}