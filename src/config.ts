

import _ from '@viatsyshyn/ts-model-reader';
import { ConfigError } from './errors';
import { IConfig, IConfigDriver } from './interfaces';

export class Config implements IConfig {
  constructor(private driver: IConfigDriver = require('config')) {
  }

  public has(path: string): boolean {
    return this.driver.has(path);
  }

  public get(path: string, Model: any = Object, nullable = false): any {
    const exists = this.has(path);
    if (nullable && !exists) {
      return null;
    }
    if (!exists) {
      throw new ConfigError(`${path} is missing`);
    }
    try {
      return _(this.driver.get(path), Model, !nullable as true);
    } catch (e) {
      throw new ConfigError(e.message);
    }
  }
}