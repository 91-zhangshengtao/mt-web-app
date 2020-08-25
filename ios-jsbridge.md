# APP与Hybrid深度结合 【/iosDemo/】
## 一、js bridge原理
1. JS bridge(js + native)
- js bridge完整的触发流程
![Image text](./img/jsbridge.jpg)
2. JS bridge通信原理
- js构建iframe请求
```js
let iframe = document.createElement('iframe')
iframe.src = 'jsbridge://xxx?c=123'
document.body.appendChild(iframe)
```
- native拦截请求，接收js的调用 【/iosDemo/WebviewDemo//WMWebViewController.m】
```js
#pragma mark - WKNavigationDelegate
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:
    (WKNavigationAction *)navigationAction decisionHandler:(void (^)
    (WKNavigationActionPolicy))decisionHandler {
    
    // 拦截所有的webview内部的请求
    NSURL *URL = navigationAction.request.URL;

    // 如果当前的这个请求url是jsbridge开头的
    if ([[URL scheme] isEqualToString:@"jsbridge"]) {
        JSPluginSystem *jsplugin = [[JSPluginSystem alloc] init];
        [jsplugin dealWithJSAPI:URL webview:webView]; // dealWithJSAPI方法

    }
    decisionHandler(WKNavigationActionPolicyAllow);
}
```
```js
// - dealWithJSAPI方法 【/iosDemo/WebviewDemo/JSPluginSystem.m】
// url = "jsbridge://" + cmd + "?c=" + JSON.stringify(data)
-(void) dealWithJSAPI:(NSURL *)url webview:(WKWebView *)webview{
    NSMutableDictionary *queryStringDictionary = [[NSMutableDictionary alloc] init];
    NSArray *urlComponents = [[url query] componentsSeparatedByString:@"&"];
    // 把url里面的cmd取出
    NSString *cmd = [NSString stringWithFormat:@"%@:",url.host];
    
    for (NSString *keyValuePair in urlComponents)
    {
        NSArray *pairComponents = [keyValuePair componentsSeparatedByString:@"="];
        NSString *key = [[pairComponents firstObject] stringByRemovingPercentEncoding];
        NSString *value = [[pairComponents lastObject] stringByRemovingPercentEncoding];
        
        [queryStringDictionary setObject:value forKey:key];
    }
    // {c:xxx}
    NSString *encodeStr = [queryStringDictionary objectForKey:@"c"];
    
    if (encodeStr) {
        NSLog(@"c:%@",[encodeStr stringByRemovingPercentEncoding]);
        NSDictionary *dic = [Util dictionaryWithJsonString:[encodeStr stringByRemovingPercentEncoding]];
        
        // 外面传的webview进行赋值
        self.webView = webview;
        
        // 找到cmd所要执行的方法并且调用它
        SEL sel = NSSelectorFromString(cmd);
        if([self respondsToSelector:sel]) {

            [self performSelector:sel withObject:dic];
        }
    }
}
```
- Native调用js执行callback  【/iosDemo/WebviewDemo/JSPluginSystem.m】
```js
/* url = "jsbridge://" + cmd + "?c=" + JSON.stringify(data) */
-(void) openUrl:(NSDictionary*) dic {
    
    // 那到要打开的url
    NSString *url = [dic objectForKey:@"url"];
    
    // 创建一个webview并且打开它
    WMWebViewController *vc = [[WMWebViewController alloc] initWithUrl:url];
    
    // 得到js需要callback的方法名
    NSString *callback = dic[@"callbackFuncName"];
    
    // 执行callback
    // window.CALLBACK0(110);
    [self.webView evaluateJavaScript:[NSString stringWithFormat:@"window.
        %@(110);",callback] completionHandler:^(id _Nullable response,
        NSError * _Nullable error) {
        NSLog(@"value: %@ error: %@", response, error);
    }];
    
    [[Util getCurrentVC].navigationController pushViewController:vc animated:true];
}
```
## 二、开发ios webview 

## 三、编写js API接口 [h5页面/component/jsapi.js]
- **jsapi 【/component/jsapi.js】**
```js
window.callbackId = 0

export default function(obj , callback) {
    let cmd = obj.cmd;
    let data = obj.data;

    if (callback) {
        let functionName = 'CALLBACK' + window.callbackId;
        data.callbackFuncname = functionName;
        window[functionName] = callback;
    }

    let url = "jsbridge://" + cmd + "?c=" + JSON.stringify(data)

    // iframe
    let iframe = document.createElement('iframe');
    iframe.src = url;
    document.body.appendChild(iframe);
    window.setTimeout(()=>{
        document.body.removeChild(iframe);
    },800); // remove

    window.callbackId ++; // 自增
}
```
## 四、集成ios app