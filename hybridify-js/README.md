# native webview 通信中间件
为解决h5页面在多种不同环境下（ios，android，微信浏览器，微信小程序，普通浏览器）下hybrid开发体验不一致导致的代码无法共用的问题。
# 安装
### NPM

```
package.json:
"dependencies": {
    "hybridify-js": "git+ssh://git@code.aliyun.com:tst-sku360/hybridify-js.git"
}
```

* 注意某些情况下会发生npm通过git clone失败的情况`(项目权限问题)`，应先确认能否直接clone成功，再尝试npm

# 使用
### 引用

``` 
import hybrid from 'hybridify-js';
```

### 调用
* 函数后缀带Sync返回Promise，请自行通过async/await或Promise标准处理方法处理。

1. storage
   
    ```
    v1.0.*
    hybrid.storage.getItem('accessJwt', function(response) {
        ...
    });
    await hybrid.storage.getItemSync('accessJwt');
    ```
    ```
    v1.0.*
    hybrid.storage.setItem('{"a":"1","b":2}', function(response) {
        ...
    });
    ```
    ```
    v1.0.*
    hybrid.storage.delItem('a', function(response) {
        ...
    });
    ```
   * 保护字段无法进行删改操作： 'uid', 'accountToken', 'userKey', 'deviceId', 'accessJwt' 
2. app

    ```
    v1.0.* 分享图片
    hybrid.app.share(obj);
    obj {
        "url":分享的图片链接,
        "type":分享到微信朋友圈传circle/微信聊天框传wechat
    }
    ```
    ```
    v1.0.* 分享链接
    hybrid.app.toShare(obj);
    obj {
        "url":分享的页面链接,
        "type":分享到微信朋友圈传circle/微信聊天框传wechat
        "title":标题
        "description":小标题
        "image":缩略图
    }
    ```
    ```
    v1.0.* 下载图片
    hybrid.app.download('url');
    ```
    ```
    v1.2.* 下载视频
    hybrid.app.downloadVideo('url');
    ```
    ```
    v1.0.* 录制视频
    hybrid.app.takeVedio();
    ```
    ```
    v1.0.* 获取商城域名
    hybrid.app.getHost(function(response) {
    ...
    });
    response {
        "host":商城域名，
        "uid"：用户uid，
        "accessJwt":用户accessJwt
    }
    ```
    ```
    v1.1.* 获取所在环境
    const response = hybrid.app.whereamiSync();
    response:
    App@Android,
    App@IOS,
    Browser,
    Weixin@miniprogram,
    unknown
    ```
    
3. nav
    ``` 
    v1.0.* 开webview/跳转
    hybrid.nav.push('url');
    ```
    ``` 
    v1.0.* 关webview/回退
    hybrid.nav.back();
    ```
    ``` 
    v1.0.* 加载失败
    hybrid.nav.loadFail();
    ```
    ``` 
    v1.0.* 首页
    hybrid.nav.toHome();
    ```
    ``` 
    v1.0.* 聊天
    hybrid.nav.toChat();
    ```
    ``` 
    v1.0.* 我的
    hybrid.nav.toMe();
    ```
    ``` 
    v1.0.* 通知
    hybrid.nav.toNotice();
    ```
    ``` 
    v1.0.* 海报公告
    hybrid.nav.toPoster();
    ```
    ``` 
    v1.0.* 官方相册
    hybrid.nav.toAlbum();
    ```
    ``` 
    v1.0.* 商城
    hybrid.nav.toMall();
    ```
    ``` 
    v1.0.* 社区
    hybrid.nav.toCommunity();
    ```
    ``` 
    v1.0.* 红榜排名
    hybrid.nav.toRankList();
    ```
    ``` 
    v1.0.* 发票
    hybrid.nav.toInvoice(obj);
    obj {
        "url":发票链接，
        "title"：分享发票的标题
    }

    ```
4. pay
    ``` 
    v1.0.* 招行
    hybrid.nav.cmbpay(sign);
    ```
    ``` 
    v1.0.* 支付宝
    hybrid.nav.alipay(sign);
    ```
    ``` 
    v1.0.* 银联
    hybrid.nav.unifyPay(sign);
    ```
5. user
    ``` 
    v1.0.* 获得用户是否首次登陆
    hybrid.user.firstLogin(null,function(resposne){
        response == "1" 用户第一次登陆
        ...
    });
    ```