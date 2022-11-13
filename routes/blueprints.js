const {PrismaClient} = require('@prisma/client')
const {S3Client} = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const jwt = require("jsonwebtoken");
const router = express.Router()
const s3 = new S3Client(endpoint = "http://localhost:4566")

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.S3_BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })

const upload = multer()
const prisma = new PrismaClient()

router.get('/:id', async (req, res) => {
    // console.log(req.params.id);
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.send("Error no token.")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
    }
    catch (err) {
        return res.send("Invalid token.")
    }

    const blueprint = await prisma.blueprint.findUnique({
        where: {
            id: req.params.id,
        }
    })
    return res.send(blueprint)
})

    router.post('/', upload.single('file'), async (req, res, next) => {
        // req.file is the `avatar` file
        const blueprint = await prisma.blueprint.create({
            data: {
                name: req.body.name,
                souls: parseInt(req.body.souls),
                cost: parseInt(850000)
            }
        })
        // res.send(blueprint.id)
        res.send('Successfully uploaded ' + req.files.length + ' files!')
    })

// router.post('/', async (req, res, next) => {
//     const prisma = new PrismaClient()
//     const blueprint = await prisma.blueprint.create({
//         data: {
//             name: req.body.name,
//             souls: parseInt(req.body.souls),
//             cost: parseInt(850000)
//         }
//         ,
//     })
//     res.send(blueprint.id)
// })

    module.exports = router;

