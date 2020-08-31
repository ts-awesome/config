interface IConfigDriver {
  has(path: string): boolean;
  get<T>(path: string): T;
}
type Class = new (...args: any) => any;
export interface IConfig {
  has(path: string): boolean;
  /**
   * @deprecated
   */
  get<T>(path: string): T;
  /* string*/
  get(path: string, Model: typeof String): string;
  get(path: string, Model: typeof String, nullable: true): string | null;
  get(path: string, Model: [typeof String]): ReadonlyArray<string>;
  get(path: string, Model: [typeof String], nullable: true): ReadonlyArray<string> | null;
  /* number*/
  get(path: string, Model: typeof Number): number;
  get(path: string, Model: typeof Number, nullable: true): number | null;
  get(path: string, Model: [typeof Number]): ReadonlyArray<number>;
  get(path: string, Model: [typeof Number], nullable: true): ReadonlyArray<number> | null;
  /* boolean*/
  get(path: string, Model: typeof Boolean): boolean;
  get(path: string, Model: typeof Boolean, nullable: true): boolean | null;
  get(path: string, Model: [typeof Boolean]): ReadonlyArray<boolean>;
  get(path: string, Model: [typeof Boolean], nullable: true): ReadonlyArray<boolean> | null;
  /* model*/
  get<T extends Class>(path: string, Model: T): InstanceType<T>;
  get<T extends Class>(path: string, Model: T, nullable: true): InstanceType<T> | null;
  get<T extends Class>(path: string, Model: [T]): ReadonlyArray<InstanceType<T>>;
  get<T extends Class>(path: string, Model: [T], nullable: true): ReadonlyArray<InstanceType<T>> | null;
}

import _ from '@viatsyshyn/ts-model-reader';
import { ConfigError } from './errors';

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
      return _(this.driver.get(path), Model, path, !nullable);
    } catch (e) {
      throw new ConfigError(e.message);
    }
  }
}