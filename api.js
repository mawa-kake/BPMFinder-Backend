import fetch from 'node-fetch'

class Api {
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',

        }
    }


    static get(route, params, headers) {
        return this.xhr(route, params, 'GET', headers)
    }

    static put(route, params, headers) {
        return this.xhr(route, params, 'PUT', headers)
    }

    static post(route, params, headers) {
        return this.xhr(route, params, 'POST', headers)
    }

    static delete(route, params, headers) {
        return this.xhr(route, params, 'DELETE', headers)
    }

    static xhr(route, params, verb, headers) {

        let options = Object.assign({ method: verb }, {headers: headers}, params ? { body: params } : null )

        return fetch(route, options).then( resp => {
            if (resp.ok) {
                return resp.json()
            }
            return resp.then(err => {throw err})
        })


    }
}
export default Api
