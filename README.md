# arcaea-lib

A simple Arcaea lib, It can help you to simulate various operations in Arcaea.

## install
```shell
npm install arcaea-lib
```

## usage

### import 

```typescript
import Arcaea from 'arcaea-lib'

let arc: Arcaea = new Arcaea(token);
```

This token is your arcaea token. login will be add later.

### get user info

```typescript
let userInfo : IArcAppregateResponse = await arc.appregate();
```

### add friend
```typescript
let response: IArcAddResponse = await arc.addFriend(friend_code);
```

You can find the friend_code in Arcaea.

### delete friend

```typescript
await arc.delFriend(friend_id);
```

You can get friend_id in response of appregate or addfriend.
