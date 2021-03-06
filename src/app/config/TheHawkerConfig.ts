import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TheHawkerConfig {

    private config: Config = null;
    private env:    Object = null;

    constructor(private http: Http) {

    }

    /**
     * Use to get the data found in the config file
     */
    public getConfig(propertyName: string) {
        return this.config[propertyName];
    }

    /**
     * Reads URL Properties from Config file. Takes canonical key as input and returns the value
     * 
     * @param  {string} cononicalKey
     * @returns string
     */
    public readCanonicalURLProperties(cononicalKey: string): string {
        let urlJson = JSON.parse(JSON.stringify(this.getConfig("URL-PROPERTIES")));

        cononicalKey.split(".").forEach(element => {
            urlJson = urlJson[element];
        });

        return urlJson;
    }

    /**
     * Use to get the data found in the env file
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/data/config/env.json').map( res => res.json() ).catch((error: any):any => {
                console.log(error+'Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse:EnvData) => {
                this.env = envResponse;
                let request:any = null;
                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('assets/data/config/config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('assets/data/config/config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}

class EnvData {
    env: string;
}

class Config {
    urlProperties: Array<string>;
}