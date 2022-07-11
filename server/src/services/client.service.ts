import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

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

    public async setExpire(key: string, expireTime: number, value: string): Promise<string | null> {
        return this.client.setEx(key, expireTime, value);
    }

    public async getKey(key: string): Promise<string[]> {
        return this.client.keys(key);
    }

    public generateClientKey(nickName:string, type: ClientEnum) : string {
        let clientKey = '';

        if (type === ClientEnum.AUTHTOKEN) {
            clientKey = `${ClientEnum.AUTHTOKEN}:${nickName}:${uuidv4()}`;
        }
        if (type === ClientEnum.FORGOTTOKEN) {
            clientKey = `${ClientEnum.FORGOTTOKEN}:${nickName}:${uuidv4()}`;
        }

        return clientKey;
    }

    public async delete(key: string): Promise<any> {
        return this.client.del(key);
    }
}
export const clientService = new ClientService();
