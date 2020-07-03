export class TokenNotFoundException extends Error{
    constructor(){
        super('No token can be use. please login at first or provide a token in constructor.');
        this.name = 'ERR_ARCAEA_TOKEN_NOTFOUND';
    }
}

export class DeviceIdNotFoundException extends Error{
    constructor(){
        super('No device id can be use. To use login/registered method, You should provide device_id or call arc.createDeviceId first.');
        this.name = 'ERR_ARCAEA_DEVICE_ID_NOTFOUND';
    }
}