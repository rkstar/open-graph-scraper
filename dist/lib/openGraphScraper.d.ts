import type { OpenGraphScraperOptions } from './types';
/**
 * sets up options for the fetch request and calls extract on html
 *
 * @param {object} options - options for ogs
 * @return {object} object with ogs results
 *
 */
export default function setOptionsAndReturnOpenGraphResults(ogsOptions: OpenGraphScraperOptions): Promise<{
    ogObject: import("./types").OgObjectInteral;
    response: {
        body: string;
    };
    html: string;
} | {
    ogObject: import("./types").OgObjectInteral;
    response: import("axios").AxiosResponse<any, any>;
    html: any;
}>;
