class AuthenticationError extends Error {}

class DuplicatedUserEmailError {}

class BlueprintNotFoundError extends Error {}

class BlueprintFileNotFoundError extends Error {}

class RepositoryError extends Error {}

class FileStorageError extends Error {}

module.exports = {
  AuthenticationError,
  DuplicatedUserEmailError,
  BlueprintNotFoundError,
  BlueprintFileNotFoundError,
  RepositoryError,
  FileStorageError,
};
