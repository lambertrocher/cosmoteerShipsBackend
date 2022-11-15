class BlueprintNotFoundError extends Error {}

class BlueprintFileNotFoundError extends Error {}

class RepositoryError extends Error {}

class FileStorageError extends Error {}

module.exports = {
  BlueprintNotFoundError,
  BlueprintFileNotFoundError,
  RepositoryError,
  FileStorageError,
};
