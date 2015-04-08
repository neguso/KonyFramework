//Form JS File
function addWidgetsformHome() {
    var labelMessage = new kony.ui.Label({
        "id": "labelMessage",
        "top": "104dp",
        "left": "80dp",
        "width": "284dp",
        "height": "26dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Label",
        "skin": "lblNormal"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 6
    }, {
        "textCopyable": false
    });
    var buttonEdit1 = new kony.ui.Button({
        "id": "buttonEdit1",
        "top": "188dp",
        "left": "143dp",
        "width": "260dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Edit 1",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var buttonEdit2 = new kony.ui.Button({
        "id": "buttonEdit2",
        "top": "246dp",
        "left": "144dp",
        "width": "260dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Edit 2",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var buttonGet = new kony.ui.Button({
        "id": "buttonGet",
        "top": "325dp",
        "left": "40dp",
        "width": "120dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Get",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var buttonCancel = new kony.ui.Button({
        "id": "buttonCancel",
        "top": "379dp",
        "left": "40dp",
        "width": "120dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Cancel",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var buttonKonyGet = new kony.ui.Button({
        "id": "buttonKonyGet",
        "top": "326dp",
        "left": "221dp",
        "width": "150dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Middleware",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var buttonKonyCancel = new kony.ui.Button({
        "id": "buttonKonyCancel",
        "top": "380dp",
        "left": "221dp",
        "width": "150dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Button",
        "skin": "btnNormal",
        "focusSkin": "btnFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    formHome.add(
    labelMessage, buttonEdit1, buttonEdit2, buttonGet, buttonCancel, buttonKonyGet, buttonKonyCancel);
};

function formHomeGlobals() {
    var MenuId = [];
    formHome = new kony.ui.Form2({
        "id": "formHome",
        "enableScrolling": true,
        "bounces": true,
        "allowHorizontalBounce": true,
        "allowVerticalBounce": true,
        "pagingEnabled": false,
        "needAppMenu": true,
        "title": null,
        "enabledForIdleTimeout": false,
        "skin": "frm",
        "layoutType": kony.flex.FREE_FORM,
        "addWidgets": addWidgetsformHome
    }, {
        "padding": [0, 0, 0, 0],
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "paddingInPixel": false
    }, {
        "retainScrollPosition": false,
        "windowSoftInputMode": constants.FORM_ADJUST_RESIZE,
        "titleBar": true,
        "footerOverlap": false,
        "headerOverlap": false,
        "inTransitionConfig": {
            "formAnimation": 0
        },
        "outTransitionConfig": {
            "formAnimation": 0
        },
        "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU
    });
    formHome.setDefaultUnit(kony.flex.DP);
};