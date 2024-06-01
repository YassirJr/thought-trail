const {httpStatus} = require("../constants/index.constants");
const successDataResponse = (res , data) => {
    return res.status(httpStatus.OK)
        .json(
            {
                success : true,
                data
            }
        )
}

const createdResponse = (res , data) => {
    return res.status(httpStatus.CREATED)
        .json(
            {
                success : true,
                data
            }
        )
}

const internalServerErrorResponse = (res , message) => {
    return res?.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
            {
                success: false,
                message
            }
        )
}

const badRequestErrorResponse = (res , errors) => {
    return res.status(httpStatus.BAD_REQUEST)
        .json(
            {
                success : false,
                errors
            }
        )
}

const unauthorizedResponse = (res , errors) => {
    return res.status(httpStatus.UNAUTHORIZED)
        .json(
            {
                success : false,
                errors
            }
        )
}

const notFoundErrorResponse = (res , errors) => {
    return res.status(httpStatus.NOT_FOUND)
        .json(
            {
                success : false,
                errors
            }
        )
}

module.exports =
    {
        badRequestErrorResponse,
        internalServerErrorResponse,
        successDataResponse,
        unauthorizedResponse,
        createdResponse,
        notFoundErrorResponse
    }