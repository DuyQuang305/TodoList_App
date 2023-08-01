export const createResponse = (statusCode: number, message: string, data?: object) => {
    return {
        statusCode,
        message,
        data
    }
}