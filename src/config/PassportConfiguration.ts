import BearerStrategies from "./Bearer";

export default class PassportConfiguration {
    static register(){
        BearerStrategies.bearerRegister();
    }

}