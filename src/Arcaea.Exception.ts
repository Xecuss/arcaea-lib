export class TokenNotFoundException extends Error{
    constructor(){
        super('No token can be use. please login at first or provide a token in constructor.');
        this.name = 'ERR_ARCAEA_TOKEN_NOTFOUND';
    }
}