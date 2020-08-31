export interface IConfigDriver {
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
