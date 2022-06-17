# @ts-awesome/config

Typescript friendly wrapper library over [config](https://github.com/node-config/node-config). 

Please check their documentation for all the details about configuration files [here](https://github.com/node-config/node-config/wiki/Configuration-Files)

We also get some spice from [@ts-awesome/model-reader](https://github.com/ts-awesome/model-reader)

## Basic use cases

```ts
import {Config} from '@ts-awesome/config';

const config = new Config();

// reads optional config property `some.value` and makes sure it is actually string
const someValue = config.get('some.value', String, true);

// reads required config property `some.number` and makes sure it is actually number
// also throws ConfigError is value is missing
const someNumeric = config.get('some.number', Number);
```

## Advanced example

```ts
import {Config} from '@ts-awesome/config';
import {readable} from "@ts-awesome/model-reader";

// lets declare config model
class SomeConfig {
  @readable
  public readonly host!: string;
  @readable
  public readonly username!: string;
  @readable
  public readonly password!: string;
  @readable(Boolean, true)
  public readonly secure!: true | null; 
}

const config = new Config();

// reads required configuration model based on SomeConfig declarations, 
// throws errors if configuration is invalid
const someConfig = config.get('some.cofing', SomeConfig);

// someConfig is instance of SomeConfig
```

## Custom config driver

`Config` class excepts a compatible config driver as first optional argument. 
Config driver should respect `ConfigDriver` type. Please check `src/interfaces.ts`
for more details


# License
May be freely distributed under the [MIT license](https://opensource.org/licenses/MIT).

Copyright (c) 2022 Volodymyr Iatsyshyn and other contributors
