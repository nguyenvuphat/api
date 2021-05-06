import Mongoose = require("mongoose");
import Log from "../logs/Log";

export class DataContext {
    static mongooseInstance = Mongoose;
    static mongooseConnection = Mongoose.connection;

    static connect() {
        let databaseName = process.env.DATABASE_NAME;

        if (!databaseName){
            databaseName = "ecommerce";
        }

        let connectionString = "mongodb://" + process.env.DB_CONNECTION_STRING + "/" + databaseName;

        Log.info("Start connecting to database " + connectionString);

        let connectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            connectTimeoutMS: 10000 // Give up initial connection after 10 seconds
        };

        return Mongoose.connect(connectionString, connectOptions, (err) =>{
            if (err){
                Log.error("Can't connect to database", err);
            }
        });
    }

    static init() {
        DataContext.connect();

        this.mongooseConnection.on("connected", () =>{
            Log.info("Connect to database successfully")
        });

        this.mongooseConnection.on("error", (err) =>{
            Log.error("Error when connecting to database", err);
        });

        this.mongooseConnection.on("disconnected", () =>{
            Log.error("Database connection disconnected");
            Log.info("Database try with reconnect, in progress at the moment, retrying...");
            DataContext.connect();
        });
    }
}
