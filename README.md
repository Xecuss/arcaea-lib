# arc-lib

A simple Arcaea lib, It can help you to simulate various operations in Arcaea.

## install
```shell
npm install arcaea-lib
```

## usage

### import 

```typescript
import Arcaea from 'arcaea-lib'

let arc: Arcaea = new Arcaea();
```

### get user info

```typescript
let userInfo : IArcAppregateResponse = await arc.appregate();
```