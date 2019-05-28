let prod = 'http://apienv.mnkfhjwxsz.eu-west-2.elasticbeanstalk.com/'
let dev = 'http://127.0.0.1:8000/'
let manager = dev
if (process.env['NODE_ENV'] === 'development') {
    manager = dev
} else {
    manager = prod
}

export const APIURL = prod
