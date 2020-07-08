import { Arcaea, ArcDifficulty } from './src/Arcaea';
import { IArcRankItem, IArcAggregateEndpointItem, ARCAEA_ENDPOINT, IArcAggregateValueItem } from './src/Arcaea.interface';
type songInfoGroup = IArcAggregateValueItem<IArcRankItem[]>[];

function wait(t: number): Promise<void>{
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
};

async function main(){
    let a = new Arcaea({
        token: '[token here]'
    }),
    userid: number = 0;
    // try{
    //     let deviceId = a.createDeviceId(); //to use login/registered, create device ID first!
    //     console.log(deviceId);

    //     let token = await a.login('example', 'examplePassword');
    //     console.log(token);

    //     await a.registered('example', 'examplePassword', 'example@example.com');
    // }
    // catch(e){
    //     console.log(e);
    // }
    console.log('5 sec to add friend');
    await wait(5000);
    await a.addFriend('[friend code here]');

    console.log('5 sec to get Appregate');
    await wait(5000);
    let res = await a.aggregate();
    if(res.success){
        let friendList = res.value[0].value.friends;
        for(let friend of friendList){
            console.log(`${friend.name} - ${friend.user_id}`);
            userid = friend.user_id;
        }
    }

    console.log('5 sec to get Friend Rank');
    await wait(5000);
    let frRes = await a.getFriendsRank('sayonarahatsukoi', 2);
    if(frRes.success){
        let friendList = frRes.value;
        for(let friend of friendList){
            console.log(`${friend.name} - ${friend.user_id} - ${friend.score}`);
        }
    }

    console.log('5 sec to get World Rank');
    await wait(5000);
    let wrRes = await a.getWorldRank('sayonarahatsukoi', 2);
    if(wrRes.success){
        let friendList = wrRes.value;
        for(let friend of friendList){
            console.log(`${friend.name} - ${friend.user_id} - ${friend.score}`);
        }
    }

    console.log('5 sec to get Self Rank');
    await wait(5000);
    let srRes = await a.getSelfRank('sayonarahatsukoi', 2);
    if(srRes.success){
        let friendList = srRes.value;
        for(let friend of friendList){
            console.log(`${friend.name} - ${friend.user_id} - ${friend.score}`);
        }
    }

    console.log('5 sec to get new Aggregate');
    await wait(5000);
    let endpoints: IArcAggregateEndpointItem[] = [];
    endpoints.push({
        endPoint: ARCAEA_ENDPOINT.friendRankUrl,
        params: {
            song_id: 'sayonarahatsukoi',
            difficulty: '2',
            start: '0',
            limit: '10'
        }
    },
    {
        endPoint: ARCAEA_ENDPOINT.friendRankUrl,
        params: {
            song_id: 'lostcivilization',
            difficulty: '2',
            start: '0',
            limit: '10'
        }
    },
    {
        endPoint: ARCAEA_ENDPOINT.friendRankUrl,
        params: {
            song_id: 'goodtek',
            difficulty: '2',
            start: '0',
            limit: '10'
        }
    },
    {
        endPoint: ARCAEA_ENDPOINT.friendRankUrl,
        params: {
            song_id: 'viyella',
            difficulty: '2',
            start: '0',
            limit: '10'
        }
    },
    {
        endPoint: ARCAEA_ENDPOINT.friendRankUrl,
        params: {
            song_id: 'rise',
            difficulty: '2',
            start: '0',
            limit: '10'
        }
    });
    let grRes = await a.aggregate<songInfoGroup>(endpoints);
    if(grRes.success){
        for(let item of grRes.value){
            for(let item2 of item.value){
                console.log(`${item2.name} - ${item2.song_id} - ${item2.score}`);
            }
        }
    }

    console.log('5 sec to delete friend');
    await wait(5000);
    await a.delFriend(userid);
}
main();