type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

declare function myFetch<T = any>(url: string, method: HTTPMethod, data?: any): Promise<T>

declare namespace myFetch {
    const get: <T = any>(url: string) => Promise<T>
    const post: <T = any>(url: string, data?: any) => Promise<T>
}

// 类型文件

export = myFetch