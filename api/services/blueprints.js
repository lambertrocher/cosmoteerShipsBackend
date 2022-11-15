const { PrismaClient } = require("@prisma/client");
const {
  BlueprintNotFoundError,
  RepositoryError,
  FileStorageError,
} = require("../errors/errors");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const s3 = new S3Client({ endpoint: process.env.AWS_ENDPOINT_URL });

async function getOneBlueprint(blueprintId) {
  let blueprint;
  try {
    blueprint = await prisma.blueprint.findUnique({
      where: {
        id: blueprintId,
      },
    });
  } catch (error) {
    console.log(error);
    throw RepositoryError;
  }
  if (!blueprint) {
    throw BlueprintNotFoundError;
  }
  return blueprint;
}

async function downloadOneBlueprintFile(blueprintId) {
  try {
    return await s3.send(
      new GetObjectCommand({
        Key: blueprintId,
        Bucket: process.env.S3_BUCKET_NAME,
      })
    );
  } catch (error) {
    if (error.Code === "NoSuchKey") {
      throw BlueprintNotFoundError;
    } else {
      console.log(error);
      throw FileStorageError;
    }
  }
}

async function searchBlueprint(searchBlueprintInput) {
  //todo how to type the input ? typescript ?
  try {
    return await prisma.blueprint.findMany({
      where: searchBlueprintInput.value,
    });
  } catch (error) {
    console.log(error);
    throw RepositoryError;
  }
}

async function createBlueprint(createBlueprintInput) {
  try {
    const blueprint = await prisma.blueprint.create({
      data: createBlueprintInput,
    });
    return blueprint.id;
  } catch (error) {
    console.log(error);
    throw RepositoryError;
  }
}

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, uuidv4());
    },
  }),
});

module.exports = {
  getOneBlueprint,
  downloadOneBlueprintFile,
  searchBlueprint,
  createBlueprint,
  uploadFile,
};
