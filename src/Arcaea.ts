import xs from 'xs-io';
import { IArcAppregateResponse, IArcAddResponse, IArcRankResponse, IArcSelfRankResponse, IArcLoginResponse } from './Arcaea.interface';
import { TokenNotFoundException } from './Arcaea.Exception';

const loginUrl: string = 'https://arcapi.lowiro.com/8/auth/login',
      addUrl: string = "https://arcapi.lowiro.com/8/friend/me/add",
      delUrl: string = "https://arcapi.lowiro.com/8/friend/me/delete",
      friendInfo: string = "https://arcapi.lowiro.com/8/compose/aggregate?calls=%5B%7B%20%22endpoint%22%3A%20%22user%2Fme%22%2C%20%22id%22%3A%200%20%7D%2C%20%7B%20%22endpoint%22%3A%20%22purchase%2Fbundle%2Fpack%22%2C%20%22id%22%3A%201%20%7D%5D",
      friendRankUrl: string = "https://arcapi.lowiro.com/8/score/song/friend?start=0&limit=10",
      worldRankUrl: string = "https://arcapi.lowiro.com/8/score/song?start=0&limit=20",
      selfRankUrl : string= "https://arcapi.lowiro.com/8/score/song/me?start=4&limit=18";

const header: Object = {
    "Accept-Encoding":"gzip, deflate",
    "Content-Type":"application/x-www-form-urlencoded; charset=utf-8",
    "Accept-Language":"zh-cn",
    "Accept":"*/*",
    "Connection":"keep-alive",
    "Proxy-Connection":"keep-alive",
};

function btoa(src: string): string{
    return Buffer.from(src).toString('base64');
}

interface IArcArg{
    token?: string;
    deviceId?: string;
    appVersion?: string;
    userAgent?: string;
}

export const enum ArcDifficulty{
    Past = 0,
    Present = 1,
    Future = 2
}
export class Arcaea{
    private token: string;
    private deviceId: string;
    private opt: any;
    constructor(Arg?: IArcArg){
        let arg: IArcArg = Arg || {};
        this.token = arg.token || '';
        this.deviceId = arg.deviceId || '';
        let headers = Object.assign(header,{
            Authorization: "Bearer "+this.token,
            AppVersion: arg.appVersion || '2.4.7',
            'User-Agent': arg.userAgent || "Arc-mobile/2.4.7.0 CFNetwork/811.5.4 Darwin/16.7.0"
        });
        this.opt = {
            headers: headers,
            gzip: true
        };
    }
    private checkToken(): void{
        if(this.token){
            return;
        }
        throw new TokenNotFoundException();
    }
    private createLoginAuth(name: string, pass: string): string{
        let authStr = btoa(unescape(encodeURIComponent(`${name}:${pass}`)));
        return `Basic ${authStr}`;
    }
    public async login(name: string, pass: string): Promise<string>{
        let auth = this.createLoginAuth(name, pass),
            loginHeaders = Object.assign({}, this.opt.headers, {
                Authorization: auth,
                DeviceId: this.deviceId
            }),
            loginOpt: any = {
                headers: loginHeaders,
                gzip: true
            },
            res: string = await xs.post(loginUrl,'grant_type=client_credentials', loginOpt),
            data: IArcLoginResponse = JSON.parse(res);
        if(data.success){
            this.token = data.token_type + ' ' + data.access_token;
            this.opt.headers.Authorization = this.token;
            return this.token;
        }
        return '';
    }
    public async appregate(): Promise<IArcAppregateResponse>{
        this.checkToken();
        let res: Buffer = await xs.read(friendInfo, this.opt),
            data: IArcAppregateResponse = JSON.parse(res.toString());
        return data;
    }
    public async addFriend(friend_code: string): Promise<IArcAddResponse>{
        this.checkToken();
        let res: string = await xs.post(addUrl, `friend_code=${friend_code}`, this.opt),
            data: IArcAddResponse = JSON.parse(res);
        return data;
    }
    public async delFriend(user_id:number): Promise<boolean>{
        this.checkToken();
        let res: string = await xs.post(delUrl, `friend_id=${user_id}`, this.opt),
            data: {success: boolean,friends: any[]} = JSON.parse(res);
        return data.success;
    }
    public async getFriendsRank(song_id: string, difficulty: ArcDifficulty): Promise<IArcRankResponse>{
        this.checkToken();
        let targetUrl: string = friendRankUrl + `&song_id=${song_id}&difficulty=${difficulty}`,
            res: Buffer = await xs.read(targetUrl, this.opt),
            data: IArcRankResponse = JSON.parse(res.toString());
        return data;
    }
    public async getWorldRank(song_id: string, difficulty: ArcDifficulty): Promise<IArcRankResponse>{
        this.checkToken();
        let targetUrl: string = worldRankUrl + `&song_id=${song_id}&difficulty=${difficulty}`,
            res: Buffer = await xs.read(targetUrl, this.opt),
            data: IArcRankResponse = JSON.parse(res.toString());
        return data;
    }
    public async getSelfRank(song_id: string, difficulty: ArcDifficulty): Promise<IArcSelfRankResponse>{
        this.checkToken();
        let targetUrl: string = selfRankUrl + `&song_id=${song_id}&difficulty=${difficulty}`,
            res: Buffer = await xs.read(targetUrl, this.opt),
            data: IArcSelfRankResponse = JSON.parse(res.toString());
        return data;
    }
}