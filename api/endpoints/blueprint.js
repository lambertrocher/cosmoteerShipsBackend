const express = require("express");

const auth = require("../middlewares/auth");
const {
  createBlueprintSchema,
  searchBlueprintSchema,
  blueprintSchemaOutput,
} = require("../schemas/blueprint");
const {
  getOneBlueprint,
  downloadOneBlueprintFile,
  searchBlueprint,
  createBlueprint,
  uploadFile,
} = require("../services/blueprints");

const router = express.Router();
router.use(auth);

/**
 * Get one blueprint info by id.
 */
router.get("/:id", async (req, res, next) => {
  let blueprint;
  try {
    blueprint = await getOneBlueprint(req.params.id);
  } catch (error) {
    if (error.name === "BlueprintNotFoundError") {
      return res.status(404).send("Blueprint not found");
    } else {
      return next(error);
    }
  }
  const output = blueprintSchemaOutput.validate(blueprint);
  return res.send(output.value);
});

/**
 * Download one blueprint file by blueprint id.
 */
router.get("/:id/file", async (req, res, next) => {
  try {
    const fileStream = await downloadOneBlueprintFile(req.params.id);
    fileStream.Body.pipe(res);
  } catch (error) {
    if (error.name === "BlueprintNotFoundError") {
      return res.status(404).send("Blueprint file not found");
    }
    next(error);
  }
});

/**
 * Search for blueprints, filtering on name, souls cost and authorId.
 */
router.get("/", async (req, res, next) => {
  console.log(req.decodedToken);
  const searchBlueprintInput = searchBlueprintSchema.validate(req.query);
  try {
    const blueprints = await searchBlueprint(searchBlueprintInput);
    return res.send(blueprints);
    //todo pagination + output data validation
  } catch (error) {
    return next(error);
  }
});

/**
 * Create one blueprint and upload file.
 */
router.post("/", uploadFile.single("file"), async (req, res, next) => {
  const createBlueprintInput = createBlueprintSchema.validate(req.body);
  try {
    const blueprintId = await createBlueprint({
      ...createBlueprintInput.value,
      id: req.file.key,
      authorId: req.decodedToken.userId,
    });
    res.send(blueprintId);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
