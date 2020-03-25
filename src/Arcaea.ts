import axios, { AxiosResponse } from 'axios';
import { IArcAppregateResponse, IArcAddResponse, IArcRankResponse, IArcSelfRankResponse, IArcLoginResponse, IArcPurchaseFriendResponse } from './Arcaea.interface';
import { TokenNotFoundException } from './Arcaea.Exception';

const baseUrl: string = 'https://arcapi.lowiro.com/';

const loginUrl: string = '/auth/login',
      addUrl: string = "/friend/me/add",
      delUrl: string = "/friend/me/delete",
      friendInfo: string = "/compose/aggregate?calls=%5B%7B%20%22endpoint%22%3A%20%22user%2Fme%22%2C%20%22id%22%3A%200%20%7D%2C%20%7B%20%22endpoint%22%3A%20%22purchase%2Fbundle%2Fpack%22%2C%20%22id%22%3A%201%20%7D%5D",
      friendRankUrl: string = "/score/song/friend?start=0",
      worldRankUrl: string = "/score/song?start=0&limit=20",
      selfRankUrl : string= "/score/song/me?start=4&limit=18",
      purchaseUrl: string = "/purchase/me/friend/fragment";

const header: Object = {
    "Accept-Encoding":"gzip, deflate",
    "Content-Type":"application/x-www-form-urlencoded; charset=utf-8",
    "Accept-Language":"zh-cn",
    "Accept":"*/*",
    "Connection":"keep-alive",
    "Proxy-Connection":"keep-alive",
    "Platform": "ios"
};

function btoa(src: string): string{
    return Buffer.from(src).toString('base64');
}

interface IArcArg{
    token?: string;
    deviceId?: string;
    appVersion?: string;
    userAgent?: string;
    apiVersion?: string;
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
    private apiVersion: string;

    constructor(Arg?: IArcArg){
        let arg: IArcArg = Arg || {};
        this.token = arg.token || '';
        this.deviceId = arg.deviceId || '';
        this.apiVersion = arg.apiVersion || '11';
        let headers = Object.assign({}, header,{
            Authorization: "Bearer "+this.token,
            AppVersion: arg.appVersion || '2.6.0',
            'User-Agent': arg.userAgent || "Arc-mobile/2.6.0.1 CFNetwork/811.5.4 Darwin/16.7.0"
        });
        this.opt = {
            headers
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
                headers: loginHeaders
            },
            res: AxiosResponse = await axios.post(`${baseUrl}${this.apiVersion}${loginUrl}`,'grant_type=client_credentials', loginOpt),
            data: IArcLoginResponse = res.data;
        if(data.success){
            this.token = data.token_type + ' ' + data.access_token;
            this.opt.headers.Authorization = this.token;
            return this.token;
        }
        return '';
    }
    public async appregate(): Promise<IArcAppregateResponse>{
        this.checkToken();
        let res: AxiosResponse = await axios.get(`${baseUrl}${this.apiVersion}${friendInfo}`, this.opt),
            data: IArcAppregateResponse = res.data;
        return data;
    }
    public async addFriend(friend_code: string): Promise<IArcAddResponse>{
        this.checkToken();
        let res: AxiosResponse = await axios.post(`${baseUrl}${this.apiVersion}${addUrl}`, `friend_code=${friend_code}`, this.opt),
            data: IArcAddResponse = res.data;
        return data;
    }
    public async delFriend(user_id: number): Promise<boolean>{
        this.checkToken();
        let res: AxiosResponse = await axios.post(`${baseUrl}${this.apiVersion}${delUrl}`, `friend_id=${user_id}`, this.opt),
            data: {success: boolean,friends: any[]} = res.data;
        return data.success;
    }
    public async getFriendsRank(song_id: string, difficulty: ArcDifficulty, limit?: number): Promise<IArcRankResponse>{
        this.checkToken();
        let limNum = limit || 10;
        let targetUrl: string = `${baseUrl}${this.apiVersion}${friendRankUrl}` + `&limit=${limNum}&song_id=${song_id}&difficulty=${difficulty}`,
            res: AxiosResponse = await axios.get(targetUrl, this.opt),
            data: IArcRankResponse = res.data;
        return data;
    }
    public async getWorldRank(song_id: string, difficulty: ArcDifficulty): Promise<IArcRankResponse>{
        this.checkToken();
        let targetUrl: string = `${baseUrl}${this.apiVersion}${worldRankUrl}` + `&song_id=${song_id}&difficulty=${difficulty}`,
            res: AxiosResponse = await axios.get(targetUrl, this.opt),
            data: IArcRankResponse = res.data;
        return data;
    }
    public async getSelfRank(song_id: string, difficulty: ArcDifficulty): Promise<IArcSelfRankResponse>{
        this.checkToken();
        let targetUrl: string = `${baseUrl}${this.apiVersion}${selfRankUrl}` + `&song_id=${song_id}&difficulty=${difficulty}`,
            res: AxiosResponse = await axios.get(targetUrl, this.opt),
            data: IArcSelfRankResponse = res.data;
        return data;
    }

    public async purchaseFriend(): Promise<IArcPurchaseFriendResponse>{
        this.checkToken();
        let res: AxiosResponse<IArcPurchaseFriendResponse> = await axios.post(`${baseUrl}${this.apiVersion}${purchaseUrl}`, '', this.opt);
        return res.data;
    }
}