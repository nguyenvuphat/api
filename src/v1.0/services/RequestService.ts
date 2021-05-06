import {injectable} from "inversify";
import request, {AxiosResponse} from "axios";
import {HTTP_VERBS} from "../../core/common/Enum";

@injectable()
export default class RequestService {
    constructor() {
    }

    sendRequest(options: {
        url: string,
        method: string,
        data?: any,
        headers?: any
    }): any {
        const opts: any = {
            method: options.method,
            url: options.url,
        };

        if (options.method === HTTP_VERBS.POST || options.method === HTTP_VERBS.PUT) {
            let body = options.data ? options.data : null;

            if (body) {
                opts.data = body;
            }
        }

        if (options.headers) {
            opts.headers = options.headers;
        }

        return request(opts)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }
}
