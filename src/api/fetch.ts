import 'whatwg-fetch'

function POST(url, data?) {
    return fetch(url, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
    })
        .then(async response => {
            return response.json()
        })
}
function GET(url, data?) {
    if (data) {
        const paramsArray: string[] = [];
        // 拼接参数  
        Object.keys(data).forEach(index => paramsArray.push(`${index}=${data[index]}`))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
        .then(async response => {
            return response.json()
        })
}

function DELETE(url, data?) {
    if (data) {
        const paramsArray: string[] = [];
        // 拼接参数  
        Object.keys(data).forEach(index => paramsArray.push(`${index}=${data[index]}`))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    })
        .then(async response => {
            return response.json()
        })
}
export { POST, GET ,DELETE}