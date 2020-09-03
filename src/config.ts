import _ from '@viatsyshyn/ts-model-reader';
import { ConfigError } from './errors';
import { IConfig, IConfigDriver } from './interfaces';

type Class = new (...args: any) => any;

export class Config implements IConfig {
  constructor(private driver: IConfigDriver = require('config')) {
  }

  public has(path: string): boolean {
    return this.driver.has(path);
  }

  /**
   * @deprecated
   */
  get<T>(path: string): T;
  /* string*/
  get(path: string, Model: typeof String, nullable?: false): string;
  get(path: string, Model: typeof String, nullable: true): string | null;
  get(path: string, Model: [typeof String], nullable?: false): ReadonlyArray<string>;
  get(path: string, Model: [typeof String], nullable: true): ReadonlyArray<string> | null;
  /* number*/
  get(path: string, Model: typeof Number, nullable?: false): number;
  get(path: string, Model: typeof Number, nullable: true): number | null;
  get(path: string, Model: [typeof Number], nullable?: false): ReadonlyArray<number>;
  get(path: string, Model: [typeof Number], nullable: true): ReadonlyArray<number> | null;
  /* boolean*/
  get(path: string, Model: typeof Boolean, nullable?: false): boolean;
  get(path: string, Model: typeof Boolean, nullable: true): boolean | null;
  get(path: string, Model: [typeof Boolean], nullable?: false): ReadonlyArray<boolean>;
  get(path: string, Model: [typeof Boolean], nullable: true): ReadonlyArray<boolean> | null;
  /* model*/
  get<T extends Class>(path: string, Model: T, nullable?: false): InstanceType<T>;
  get<T extends Class>(path: string, Model: T, nullable: true): InstanceType<T> | null;
  get<T extends Class>(path: string, Model: [T], nullable?: false): ReadonlyArray<InstanceType<T>>;
  get<T extends Class>(path: string, Model: [T], nullable: true): ReadonlyArray<InstanceType<T>> | null;
  public get<T extends Class>(path: string, Model: any = Object, nullable = false): any {
    const exists = this.has(path);
    if (nullable && !exists) {
      return null;
    }
    if (!exists) {
      throw new ConfigError(`${path} is missing`);
    }
    try {
      const value = this.driver.get<unknown>(path);
      if (Model == null) {
        return value;
      } else {
        // required cast due to overload resolution in TS
        return _<T>(value, Model, path, !nullable as true);
      }
    } catch (e) {
      throw new ConfigError(e.message);
    }
  }
}
