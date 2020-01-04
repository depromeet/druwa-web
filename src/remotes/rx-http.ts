/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax, AjaxResponse as _AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

type AjaxRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type AjaxHeaders = Record<string, string>;

interface AjaxRequestOptions {
  headers?: AjaxHeaders;
  timeout?: number;
  crossDomain?: boolean;
}

export interface AjaxResponse<Data> extends _AjaxResponse {
  response: Data;
}

function request<T = any>(
  url: string,
  method: AjaxRequestMethod,
  options: AjaxRequestOptions & { body?: any } = {},
) {
  const { headers, timeout, crossDomain, body } = options;

  return ajax({
    url,
    method,
    headers,
    timeout,
    crossDomain,
    body,
    responseType: 'json',
  }).pipe(map(data => data.response as T));
}

function get<T = any>(url: string, options?: AjaxRequestOptions) {
  return request<T>(url, 'GET', options);
}

function post<T = any>(url: string, body?: any, options?: AjaxRequestOptions) {
  return request<T>(url, 'POST', { ...options, body });
}

function put<T = any>(url: string, body?: any, options?: AjaxRequestOptions) {
  return request<T>(url, 'PUT', { ...options, body });
}

function _delete<T = any>(url: string, body?: any, options?: AjaxRequestOptions) {
  return request<T>(url, 'DELETE', { ...options, body });
}

export const rxHttp = {
  get,
  post,
  put,
  delete: _delete,
};
