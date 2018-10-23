var baseUrl = "http:";
var HOST = process.env.WSHOST || 'localhost';
var Port = '3000';
export default {

        Api:{
            TOPICS: "/api/Topics/",
            TYPES: "/api/Types/"
        },
        BaseURL: `${baseUrl}//${HOST}:${Port}`
}
