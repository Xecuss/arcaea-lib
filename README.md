# arcaea-lib

A simple Arcaea lib, It can help you to simulate various operations in Arcaea.

## install
```shell
npm install arcaea-lib
```

## usage

### import 

```typescript
import { Arcaea, ArcDifficulty } from 'arcaea-lib';

let arc: Arcaea = new Arcaea(arg);
```

The parameter contains a token field. It's not required, but if you do not provide token here, you should use login to get a token first.

### login

```typescript
let token: string = await arc.login(username, password);
```

This method will return a token, you should save it for reuse.

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

### get friends Rank

```typescript
let res: IArcRankResponse = await arc.getFriendsRank(song_id,difficulty);
```
difficulty is a enumeration value.

You can find song_id from songList.

### get world rank

```typescript
let res: IArcRankResponse = await arc.getWorldRank(song_id,difficulty);
```

Same as get friends rank.

### get self rank

```typescript
let res: IArcSelfRankResponse = await arc.getSelfRank(song_id,difficulty);
```
Simular to get friends rank, there is an extra rank field in this response.