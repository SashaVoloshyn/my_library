import { createClient } from 'redis';
import { ClientEnum } from '../enums/client.enum';

class ClientService {
    client;

    constructor() {
        this.client = createClient();
        (async () => {
            await this.client.connect();
        })();
    }

    public async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    public async set(key: string, data: string): Promise<string | null> {
        return this.client.set(key, data);
    }

    public generateClientKey(id:any, nickName:string, type: ClientEnum) {
        if (type === ClientEnum.AUTHTOKEN) {
            return `${ClientEnum.AUTHTOKEN}${id}${nickName}`;
        }
        if (type === ClientEnum.FORGOTTOKEN) {
            return `${ClientEnum.FORGOTTOKEN}${id}${nickName}`;
        }
    }

    public async delete(key: string): Promise<any> {
        return this.client.del(key);
    }
}
export const clientService = new ClientService();
