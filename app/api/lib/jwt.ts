import jwt ,{ JwtPayload } from "jsonwebtoken";

interface SigninOtion {
    expiresIn?: string | number;
}

const DEFAULT_EXPIRES_IN: SigninOtion = {
    expiresIn: '1h',
}

export function signInJwtAcessToken(payload: JwtPayload, options: SigninOtion = DEFAULT_EXPIRES_IN){
    const secret_key = process.env.SECRET_KEY;
    const accesstoken = jwt.sign(payload, secret_key!, options);

    const token = { accesstoken}

    return token;
    
}

export function verifyJwtAccessToken(token: string): JwtPayload | string {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function refreshAccessToken(token: JwtPayload): string {
    const secret_key = process.env.SECRET_KEY;
    const newToken = jwt.sign(token, secret_key!, DEFAULT_EXPIRES_IN);
    return newToken;
}
