import { CorsOptions } from "cors";

const frontEnd = process.env.FRONTEND_URL;

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if(origin === frontEnd) {
            callback(null, true)
        } else{
            callback(new Error('Error de CORS'))
        }
    }
}