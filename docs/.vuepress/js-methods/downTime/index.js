/**
 * 传value是设置时间，不传value是返回当前倒计时时间对象，通过setInterval调用即可实现倒计时更新。
 * 返回{end, day, hour, minute, second}，end可用于即时检查倒计时是否结束。
 * @param {String} key 计时器唯一的key
 * @param {Number} value 服务器返回离倒计时结束的时间戳（单位：秒）
 */
export default function downTime(key, value) {
    console.log(key, value, 'key, value')
    if (!key || typeof key != 'string') {
        throw Error('downTime key fail');
    } else if (!sessionStorage) {
        throw Error('Not support sessionStorage');
    }

    const keyPrefix = '_down_time_';
    key = keyPrefix + key;

    if (typeof value != 'undefined') {
        //设置时间
        if (isNaN(value)) {
            throw Error('downTime value must be number');
        } else {
            value = parseInt(value);
            sessionStorage.setItem(key, JSON.stringify([value, Math.round(new Date().getTime() / 1000)]));
        }
    } else {
        //取出倒计时
        const data = sessionStorage.getItem(key);
        if (data && /\[\d+,\d+\]/.test(data)) {
            const arr = JSON.parse(data);

            //剩余秒数 = 服务器返回时间 - (当前系统时间 - 服务器响应时间点)
            const seconds = Math.max(0, Math.round(arr[0] - (new Date().getTime() / 1000 - new Date(arr[1] * 1000).getTime() / 1000)));

            const end = seconds <= 0;
            if (end) {
                return { end, seconds, day: '00', hour: '00', minute: '00', second: '00' };
            }

            let s = seconds;
            let day = Math.floor(s / 86400); s -= day * 86400;
            let hour = Math.floor(s / 3600); s -= hour * 3600;
            let minute = Math.floor(s / 60); s -= minute * 60;
            let second = Math.floor(s);
            day = day < 10 ? '0' + day : day.toString();
            hour = hour < 10 ? '0' + hour : hour.toString();
            minute = minute < 10 ? '0' + minute : minute.toString();
            second = second < 10 ? '0' + second : second.toString();

            return { end, seconds, day, hour, minute, second };
        }
        return null;
    }
}
