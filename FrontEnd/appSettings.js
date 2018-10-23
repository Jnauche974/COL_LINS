var baseUrl = "http:";
var HOST = process.env.WSHOST || '10.0.0.100';
var Port = '3000';
export default {

        Api:{
            TOPICS: "/api/Topics/",
            TYPES: "/api/Types/"
        },
        BaseURL: `${baseUrl}//${HOST}:${Port}`
}