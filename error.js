//list of error codes

let error = {};

const codes = {
    BAD_REQUEST: {name: "BAD REQUEST", status: 400},
    UNAUTHORIZED: {name: "UNAUTHORIZED", status: 401},
    PAYMENT_REQUIRED: {name: "PAYMENT REQUIRED", status: 402},
    FORBIDDEN: {name: "FORBIDDEN", status: 403},
    NOT_FOUND: {name: "NOT FOUND", status: 404}, 
    METHOD_NOT_ALLOWED: {name: "METHOD NOT ALLOWED", status: 405},
    NOT_ACCEPTABLE: {name: "NOT ACCEPTABLE", status: 406},
    PROXY_AUTHENTICATION_REQUIRED: {name: "PROXY_AUTHENTICATION_REQUIRED", status: 407},
    REQUEST_TIMEOUT: {name: "REQUEST_TIMEOUT", status: 408},
    CONFLICT: {name: "CONFLICT", status: 409},
    GONE: {name: "GONE", status: 410},
    LENGTH_REQUIRED: {name: "LENGTH_REQUIRED", status: 411},
    PRECONDITION_FAILED: {name: "PRECONDITION_FAILED", status: 412},
    PAYLOAD_TOO_LARGE: {name: "PAYLOAD_TOO_LARGE", status: 413},
    URI_TOO_LONG: {name: "URI_TOO_LONG", status: 414},
    UNSUPPORTED_MEDIA_TYPE: {name: "UNSUPPORTED_MEDIA_TYPE", status: 415},
    TOO_MANY_REQUESTS: {name: "TOO_MANY_REQUESTS", status: 429},
    REQUEST_HEADER_FIELDS_TOO_LARGE: {name: "REQUEST_HEADER_FIELDS_TOO_LARGE", status: 431},
    UNAVAILABLE_FOR_LEGAL_REASONS: {name: "UNAVAILABLE_FOR_LEGAL_REASONS", status: 451},
    INTERNAL_SERVER_ERROR: {name: "INTERNAL_SERVER_ERROR", status: 500},
    NOT_IMPLEMENTED: {name: "NOT_IMPLEMENTED", status: 501},
    SERVICE_UNAVAILABLE: {name: "SERVICE_UNAVAILABLE", status: 503},
    HTTP_VERSION_NOT_SUPPORTED: {name: "HTTP_VERSION_NOT_SUPPORTED", status: 505},
    INSUFFICIENT_STORAGE: {name: "INSUFFICIENT_STORAGE", status: 507},
    LOOP_DETECTED: {name: "LOOP_DETECTED", status: 508}
};

module.exports = error = {
    codes,
    respond,
    respondWithArr,
    new: newError
};


function respond (error, response) {
    response.status(error.status).send(error.name + ": " + error.message).end();
    return;
}

function respondWithArr (error, response) {
    response.status(error.status).json(error.message).end();
    return;
}

function newError (code, message = null) {
    return {name: code.name, status: code.status, message: message};
}

