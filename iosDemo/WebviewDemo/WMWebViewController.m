//
//  WMWebViewController.m
//  WebviewDemo
//


#import "WMWebViewController.h"
#import "JSPluginSystem.h"

#define NavigationBarHeight (self.navigationController.navigationBar.frame.size.height + [[UIApplication sharedApplication] statusBarFrame].size.height)

@implementation WMWebViewController

-(instancetype) initWithUrl:(NSString *) url {
    if (self == [super init]) {
        
        self.url = url;
    }
    
    return self;
}
/* WebView 加载完成首先会执行的方法 */
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 默认ios顶部导航栏去掉
    // 将默认顶部bar去掉，左边的返回按钮
    self.navigationController.navigationBar.hidden = YES;
    self.navigationController.view.backgroundColor = [UIColor clearColor];
    self.navigationItem.leftBarButtonItem = nil;
    self.navigationItem.hidesBackButton = YES;
    
    // 进入initWebview方法
    [self initWebview];
    
    
}
-(void) initWebview {
    
    // 创建一个webview(把width height填入)
    self.webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, 
        self.view.frame.size.width, self.view.frame.size.height)];
    
    self.navigationController.navigationBar.userInteractionEnabled = YES;
    if (@available(iOS 11.0, *)) {
        self.webView.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    } else {
        self.automaticallyAdjustsScrollViewInsets = NO;
    }

    // 发起请求
    // 开始loadurl
    NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:self.url]]; // self.url:外面传过来的url
    
    [self.view addSubview:self.webView];
    self.webView.navigationDelegate = self;
    // 浏览器敲回车
    [self.webView loadRequest:request];
}

#pragma mark - WKNavigationDelegate
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:
    (WKNavigationAction *)navigationAction decisionHandler:(void (^)
    (WKNavigationActionPolicy))decisionHandler {
    
    // 拦截所有的webview内部的请求
    NSURL *URL = navigationAction.request.URL; // navigationAction.request.URL:拿到请求的url

    // 如果当前的这个请求url是jsbridge开头的
    if ([[URL scheme] isEqualToString:@"jsbridge"]) {
        JSPluginSystem *jsplugin = [[JSPluginSystem alloc] init];
        [jsplugin dealWithJSAPI:URL webview:webView]; // dealWithJSAPI方法

    }
    decisionHandler(WKNavigationActionPolicyAllow);
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end
