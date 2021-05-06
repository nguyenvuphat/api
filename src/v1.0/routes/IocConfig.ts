import {Container} from "inversify";
import CategoryController from "../controllers/CategoryController";
import CategoryService from "../services/CategoryService";
import CategoryRepository from "../repositories/CategoryRepository";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";
import UserRepository from "../repositories/UserRepository";
import TokenService from "../services/TokenService";
import TokenRepository from "../repositories/TokenRepository";
import TokenController from "../controllers/TokenController";
import RoleService from "../services/RoleService";
import RoleRepository from "../repositories/RoleRepository";
import ProductService from "../services/ProductService";
import ProductRepository from "../repositories/ProductRepository";
import ProductController from "../controllers/ProductController";
import ShipmentController from "../controllers/ShipmentController";
import ShipmentService from "../services/ShipmentService";
import RequestService from "../services/RequestService";
import UploadController from "../controllers/UploadController";
import AddressRepository from "../repositories/AddressRepository";
import AddressController from "../controllers/AddressController";
import AddressService from "../services/AddressService";
import OrderService from "../services/OrderService";
import OrderController from "../controllers/OrderController";
import OrderRepository from "../repositories/OrderRepository";
import PaymentController from "../controllers/PaymentController";
import PaymentService from "../services/PaymentService";
import UploadService from "../services/UploadService";
import UploadRepository from "../repositories/UploadRepository";

class IocConfig {
    static init(){
        let container = new Container();

        container.bind<CategoryController>("CategoryController").to(CategoryController);
        container.bind<CategoryService>("CategoryService").to(CategoryService);
        container.bind<CategoryRepository>("CategoryRepository").to(CategoryRepository);

        container.bind<UserController>("UserController").to(UserController);
        container.bind<UserService>("UserService").to(UserService);
        container.bind<UserRepository>("UserRepository").to(UserRepository);

        container.bind<TokenController>("TokenController").to(TokenController);
        container.bind<TokenService>("TokenService").to(TokenService);
        container.bind<TokenRepository>("TokenRepository").to(TokenRepository);

        container.bind<RoleService>("RoleService").to(RoleService);
        container.bind<RoleRepository>("RoleRepository").to(RoleRepository);

        container.bind<ProductController>("ProductController").to(ProductController);
        container.bind<ProductService>("ProductService").to(ProductService);
        container.bind<ProductRepository>("ProductRepository").to(ProductRepository);

        container.bind<ShipmentController>("ShipmentController").to(ShipmentController);
        container.bind<ShipmentService>("ShipmentService").to(ShipmentService);

        container.bind<RequestService>("RequestService").to(RequestService);

        container.bind<AddressController>("AddressController").to(AddressController);
        container.bind<AddressService>("AddressService").to(AddressService);
        container.bind<AddressRepository>("AddressRepository").to(AddressRepository);

        container.bind<OrderController>("OrderController").to(OrderController);
        container.bind<OrderService>("OrderService").to(OrderService);
        container.bind<OrderRepository>("OrderRepository").to(OrderRepository);

        container.bind<PaymentController>("PaymentController").to(PaymentController);
        container.bind<PaymentService>("PaymentService").to(PaymentService);

        container.bind<UploadController>("UploadController").to(UploadController);
        container.bind<UploadService>("UploadService").to(UploadService);
        container.bind<UploadRepository>("UploadRepository").to(UploadRepository);

        return container;
    }
}

export default IocConfig.init();
