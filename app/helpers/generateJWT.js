import jwt from 'jsonwebtoken';

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                reject('Error al crear token');
            } else {
                resolve(token);
            }
        })
    })
}

export {
    generateJWT
}