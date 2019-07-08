export type RequestMethod =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RequestConfig {
  url: string
  method?: RequestMethod
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface Response {
  data: any
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface ResponsePromise extends Promise<Response | RequestConfig> {}

export interface RequestErrorInterface extends Error {
  config: RequestConfig
  code?: number | null
  request: XMLHttpRequest
  response?: Response | null
}

export interface RequestInterface {
  [index: string]: any
  interceptors: {
    request: InterceptorsControllerInterface<RequestConfig>
    response: InterceptorsControllerInterface<Response>
  }

  request(url: string, config?: any): ResponsePromise
  request(config: RequestConfig): ResponsePromise

  get(url: string, config?: any): ResponsePromise

  delete(url: string, config?: any): ResponsePromise

  head(url: string, config?: any): ResponsePromise

  options(url: string, config?: any): ResponsePromise

  post(url: string, data?: any, config?: any): ResponsePromise

  put(url: string, data?: any, config?: any): ResponsePromise

  patch(url: string, data?: any, config?: any): ResponsePromise
}

export interface RequestMixins extends RequestInterface {
  (config: RequestConfig): ResponsePromise
}

export interface InterceptorResolvedFn<T> {
  (resolvedData: T): T
}

export interface InterceptorRejectedFn {
  (err: any): any
}

export interface InterceptorInterface<T> {
  resolved: InterceptorResolvedFn<T>
  rejected: InterceptorRejectedFn | undefined
}

export interface InterceptorsControllerInterface<T> {
  use: (resolvedFn: InterceptorResolvedFn<T>, rejectedFn?: InterceptorRejectedFn) => number
  eject: (id: number) => void
}
