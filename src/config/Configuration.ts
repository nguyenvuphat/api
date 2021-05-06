import RouteRegistration from "../v1.0/routes/RouteRegistration";
import PassportConfiguration from "./PassportConfiguration";
import Log from "../core/logs/Log";
const bodyParser = require("body-parser");
const passport = require("passport");

export default class Configuration {
    static setupRouting(app) {
        Log.info("Start setup routing ");
        RouteRegistration.register(app);
        Log.info("Setup routing successfully");
    }

    static setupAuthentication(app) {
        Log.info("Start setup Authentication");
        app.use(passport.initialize());
        PassportConfiguration.register();
        Log.info("Start setup Authentication successfully");

    }

    static setup(app) {
        try {
            Configuration.setupExpress(app);
            Configuration.setupCORS(app);
            Configuration.setupAuthentication(app);
            Configuration.setupRouting(app);
        }
        catch (e) {
            Log.error("There is an error when starting server", e);

            throw e;
        }
    }


    static setupExpress(app) {
        Log.info("Start setup Express");

        app.use(bodyParser.json({
            limit: "100mb"
        }));

        Log.info("Setup Express successfully");
    }

    static setupCORS(app) {
        Log.info("Start setup CORS");

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Nonce, Signature, Timestamp, No-Cache, Client-Request");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

            if ("OPTIONS" === req.method) {
                res.status(200).end();
            } else {
                next();
            }
        });

        Log.info("Setup CORS successfully");
    }
}
