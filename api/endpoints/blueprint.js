const { PrismaClient } = require("@prisma/client");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { v4: uuidv4 } = require("uuid");
const s3 = new S3Client({ endpoint: process.env.AWS_ENDPOINT_URL });
const Joi = require("joi");
const auth = require("../middlewares/auth");
const {
  createBlueprintSchema,
  searchBlueprintSchema,
  blueprintSchemaOutput,
} = require("../schemas/blueprint");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, uuidv4());
    },
  }),
});

const prisma = new PrismaClient();

const router = express.Router();
router.use(auth);

router.get("/:id", async (req, res) => {
  const blueprint = await prisma.blueprint.findUnique({
    where: {
      id: req.params.id,
    },
  });
  output = blueprintSchemaOutput.validate(blueprint);
  return res.send(output.value);
});

// https://gist.github.com/Arunmainthan/bf8ad85d00fcac2ee70e6fb2d5a34544
router.get("/:id/file", async (req, res) => {
  const fileStream = await s3.send(
    new GetObjectCommand({
      Key: req.params.id,
      Bucket: process.env.S3_BUCKET_NAME,
    })
  );
  fileStream.Body.pipe(res);
});

router.get("/", async (req, res) => {
  console.log(req.decodedToken);
  const searchBlueprintInput = searchBlueprintSchema.validate(req.query);
  const blueprints = await prisma.blueprint.findMany({
    where: searchBlueprintInput.value,
  });
  res.send(blueprints);
});

router.post("/", upload.single("file"), async (req, res, next) => {
  const createBlueprintInput = createBlueprintSchema.validate(req.body);
  const blueprint = await prisma.blueprint.create({
    data: {
      ...createBlueprintInput.value,
      id: req.file.key,
      authorId: req.decodedToken.userId,
    },
  });
  res.send(blueprint.id);
});

module.exports = router;
