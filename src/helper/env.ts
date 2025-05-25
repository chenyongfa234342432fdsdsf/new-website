/** 获取是否是 NodeJs 服务器环境 */
export const envIsServer = typeof window === 'undefined'
/** 获取是否是客户端环境 */
export const envIsClient = typeof window !== 'undefined'
