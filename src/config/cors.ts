import { CorsOptions } from "cors";

const frontEnd = process.env.FRONTEND_URL;

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [frontEnd]
        if (process.argv[2] === '--api') {
            whiteList.push(undefined)
        }
        if(whiteList.includes(origin)) {
            callback(null, true)
        } else{
            callback(new Error('Error de CORS'))
        }
    }
}