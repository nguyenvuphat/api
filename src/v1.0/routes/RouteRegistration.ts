import {CategoryRoute} from "./CategoryRoute";
import kernel from "./IocConfig";
import {UserRoute} from "./UserRoute";
import {ProductRoute} from "./ProductRoute";
import {ShipmentRoute} from "./ShipmentRoute";
import {UploadRoute} from "./UploadRoute";
import {AddressRoute} from "./AddressRoute";
import {OrderRoute} from "./OrderRoute";
import {PaymentRoute} from "./PaymentRoute";

export default class RouteRegistration {
    static register(app) {
        global["IocContainer"] = kernel;
        let iocContainer = global["IocContainer"];

        app.use("/categories", new CategoryRoute(iocContainer).routes);
        app.use("/users", new UserRoute(iocContainer).routes);
        app.use("/products", new ProductRoute(iocContainer).routes);
        app.use("/shipments", new ShipmentRoute(iocContainer).routes);
        app.use("/uploads", new UploadRoute(iocContainer).routes);
        app.use("/addresses", new AddressRoute(iocContainer).routes);
        app.use("/orders", new OrderRoute(iocContainer).routes);
        app.use("/payments", new PaymentRoute(iocContainer).routes);
    }
}