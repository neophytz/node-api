// we simply want to export a function that formats thee HTTP response!!

exports.http_formatter = (data, message = 'ok', success = true) => {
    if(!data) success = false;
    return { message, data, success };
}

