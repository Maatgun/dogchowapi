import jwt from "jsonwebtoken";

const generateJWT = (id: string = ""): Promise<string> =>{
    return new Promise ((res, rej)=>{
        const payload = {id};
        jwt.sign(
            payload,
            process.env.CLAVESECRETA as string,
            {
                expiresIn: "30d",
            },
            (err: Error|null, token: string |undefined)=>{
                if (err){
                    console.log(err);
                    rej('No se pudo generar el token')
                }else{
                    res(token as string);
                }
            }
        )
    })
}

export default generateJWT