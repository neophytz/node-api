// we simply want to export a function that formats thee HTTP response!!

const http_formatter = (data, message = 'ok', success = true) => {
    return { message, data, success };
}

module.exports = http_formatter;