import { RequestOptions, Headers } from '@angular/http';

export interface IPayload
{
    url: string;
    headers: Headers;
    requestOptions: RequestOptions;
}