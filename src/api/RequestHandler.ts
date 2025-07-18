import { apiUrl } from '~/env';

import { HTTPError } from './HTTPError';

interface Response<T> {
    ok: boolean;
    data: T;
    status: number;
}

interface APIError {
    statusCode: number;
    timestamp: string;
    detail: string;
    path: string;
}

export class RequestHandler {
    public async request<T>(path: string, method?: string, body?: string, leagueId?: number): Promise<Response<T>> {
        try {
            return await this.execute(path, method, body, leagueId);
        } catch (error) {
            if (error instanceof HTTPError) {
                throw error;
            }
            throw new HTTPError('Something went wrong!');
        }
    }

    private async execute<T>(path: string, method?: string, body?: string, leagueId?: number): Promise<Response<T>> {
        // fetch doesn't have any timeout by default so implement by self. 30 seconds.
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(`${apiUrl}${path}`, {
            keepalive: true,
            credentials: 'include',
            method,
            body,
            signal: controller.signal,
            headers: leagueId
                ? { 'Content-Type': 'application/json', 'leagueid': String(leagueId) }
                : { 'Content-Type': 'application/json' }
        });
        clearTimeout(id);

        const data = (await response.json().catch(() => null)) as T;

        if (!response.ok) {
            throw new HTTPError((data as unknown as APIError).detail);
        }
        return { data, status: response.status, ok: response.status === 200 };
    }
}
