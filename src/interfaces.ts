export type ConfigDriver = {
  [key: string]: string | number | boolean;
} & {
  has(path: string): boolean;
  get<T>(path: string): T;
}

type Class = new (...args: any) => any;

export interface IConfig {
  has(path: string): boolean;
  /**
   * @deprecated
   */
  get<T=unknown>(path: string): T;
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

  /* all*/
  get<T extends Class>(Model: T): InstanceType<T>;
}
