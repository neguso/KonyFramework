//startup.js file
function KonyFrameworkpreappinit_seq0(params) {
    preappinit.call(this);
};

function KonyFrameworkpostappinit_seq0(params) {
    postappinit.call(this);
};
var appConfig = {
    appId: "KonyFramework",
    appName: "KonyFramework",
    appVersion: "1.0.0",
    platformVersion: null,
    serverIp: "10.115.4.223",
    serverPort: "8080",
    secureServerPort: "443",
    url: "http://10.115.4.223:8080/middleware/MWServlet",
    secureurl: "https://10.115.4.223:443/middleware/MWServlet",
    middlewareContext: "middleware"
};
sessionID = "";

function appInit(params) {
    skinsInit();
    formAboutGlobals();
    formHomeGlobals();
    formInfoGlobals();
    setAppBehaviors();
};

function setAppBehaviors() {
    kony.application.setApplicationBehaviors({
        applyMarginPaddingInBCGMode: false,
        adherePercentageStrictly: true,
        retainSpaceOnHide: true,
        APILevel: 6000
    })
};

function themeCallBack() {
    kony.application.setApplicationInitializationEvents({
        preappinit: preappinit,
        init: appInit,
        postappinit: postappinit,
        showstartupform: function() {
            formHome.show();
        }
    });
};

function loadResources() {
    kony.theme.packagedthemes(
    ["default"]);
    globalhttpheaders = {};
    kony.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
};

function initializeApp() {
    kony.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
    //If default locale is specified. This is set even before any other app life cycle event is called.
    loadResources();
};