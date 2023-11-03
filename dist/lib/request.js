"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const abortController = new AbortController();
/**
 * performs the fetch request and formats the body for ogs
 *
 * @param {object} options - options for ogs
 * @return {object} formatted request body and response
 *
 */
async function requestAndResultsFormatter(options) {
    try {
        const response = await axios_1.default.get(options.url || '', {
            signal: abortController.signal,
            headers: { Origin: options.url },
            ...options.fetchOptions,
        });
        const body = response.data;
        if (response && response.headers && response.headers['content-type'] && !response.headers['content-type']?.includes('text/')) {
            throw new Error('Page must return a header content-type with text/');
        }
        if (response && response.status && (response.status.toString().substring(0, 1) === '4' || response.status.toString().substring(0, 1) === '5')) {
            switch (response.status) {
                case 400:
                    throw new Error('400 Bad Request');
                case 401:
                    throw new Error('401 Unauthorized');
                case 403:
                    throw new Error('403 Forbidden');
                case 404:
                    throw new Error('404 Not Found');
                case 408:
                    throw new Error('408 Request Timeout');
                case 410:
                    throw new Error('410 Gone');
                case 500:
                    throw new Error('500 Internal Server Error');
                case 502:
                    throw new Error('502 Bad Gateway');
                case 503:
                    throw new Error('503 Service Unavailable');
                case 504:
                    throw new Error('504 Gateway Timeout');
                default:
                    throw new Error('Server has returned a 400/500 error code');
            }
        }
        if (body === undefined || body === '') {
            throw new Error('Page not found');
        }
        return { body, response };
    }
    catch (error) {
        if (error instanceof Error && error.message === 'fetch failed')
            throw error.cause;
        throw error;
    }
}
exports.default = requestAndResultsFormatter;
