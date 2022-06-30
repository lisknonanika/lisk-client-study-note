let _transferSchema = "";
let _networkIdentifier = "";

/*
 * 初期化
 */
const initializeCommonValue = () => {
    _transferSchema = "";
    _networkIdentifier = "";
}

/*
 * アカウント情報取得
 */
const getAccount = async(address) => {
    const response = await fetch(`https://testnet-service.lisk.com/api/v2/accounts?address=${address}`);
    const json = await response.json();
    if (json.error) return json;
    return json.data[0];
}

/*
 * トランザクション情報取得
 */
const getTransactions = async(address) => {
    const response = await fetch(`https://testnet-service.lisk.com/api/v2/transactions?address=${address}&offset=0&limit=10`);
    const json = await response.json();
    if (json.error) return json;
    return json.data;
}

/*
 * 送信用スキーマ情報取得
 */
const getTransferSchema = async() => {
    if (!_transferSchema) {
        const schemeResponse = await fetch(`https://testnet-service.lisk.com/api/v2/transactions/schemas?moduleAssetId=2:0`);
        const schemes = await schemeResponse.json();
        _transferSchema = schemes.data[0].schema;
    }
    return _transferSchema;
}

/*
 * ネットワーク識別子取得
 */
const getNetworkIdentifier = async() => {
    if (!_networkIdentifier) {
        const networkResponse = await fetch(`https://testnet-service.lisk.com/api/v2/network/status`);
        const network = await networkResponse.json();
        _networkIdentifier = network.data.networkIdentifier;
    }
    return _networkIdentifier;
}
