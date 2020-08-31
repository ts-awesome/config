
export class ConfigError extends Error {
  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}
