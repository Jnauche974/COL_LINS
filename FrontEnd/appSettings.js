var baseUrl = 'http:';
var HOST = process.env.WSHOST || 'localhost';
var Port = '8080';
export default {

        Api:{
            TOPICS: '/api/Topics/',
            TYPES: '/api/Types/',
            MESSAGES: '/api/Messages/'
        },
        BaseURL: `${baseUrl}//${HOST}:${Port}`
}
