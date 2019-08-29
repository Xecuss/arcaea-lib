# arc-lib

A simple Arcaea lib, It can help you to simulate various operations in Arcaea.

## install
```shell
npm install arc-lib
```

## usage

### import 

```typescript
import Arcaea from 'arc-lib'

let arc = new Arcaea();
```

### get user info

```typescript
let userInfo : IArcAppregateResponse = await arc.appregate();
```