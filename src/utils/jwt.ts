import  Jwt, {JwtPayload}  from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET;

export const generateJWT = (payload: JwtPayload) => {
    const token = Jwt.sign(payload, jwtSecret,{
        expiresIn: '1h'
    })
    return token;
}