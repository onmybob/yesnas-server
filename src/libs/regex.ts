/**
 * To validate a filename based on filesystem requirements.
 */
export const REGEX_FILENAME =
  /^[\p{L}\p{M}\p{N}\p{P}\p{S}\s\-_.!@#$%^&*()+=\[\]{};:'",<>?/\\|`~]+(\.[\p{L}\p{M}\p{N}\p{P}\p{S}\s\-_.!@#$%^&*()+=\[\]{};:'",<>?/\\|`~]+)?(\.[\p{L}\p{M}\p{N}]{1,10})?$/u;
