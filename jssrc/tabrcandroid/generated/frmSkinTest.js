//Form JS File
function addWidgetsfrmSkinTest() {
    var cmdButton = new kony.ui.Button({
        "id": "cmdButton",
        "top": "20dp",
        "left": "20dp",
        "width": "142dp",
        "height": "48dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Button",
        "skin": "buttonFocus",
        "focusSkin": "buttonFocus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 11
    }, {});
    var label5300107591022 = new kony.ui.Label({
        "id": "label5300107591022",
        "top": "217dp",
        "left": "181dp",
        "width": "100dp",
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
    frmSkinTest.add(
    cmdButton, label5300107591022);
};

function frmSkinTestGlobals() {
    var MenuId = [];
    frmSkinTest = new kony.ui.Form2({
        "id": "frmSkinTest",
        "enableScrolling": true,
        "bounces": true,
        "allowHorizontalBounce": true,
        "allowVerticalBounce": true,
        "pagingEnabled": false,
        "needAppMenu": true,
        "title": null,
        "enabledForIdleTimeout": false,
        "skin": "formNormal",
        "layoutType": kony.flex.FREE_FORM,
        "addWidgets": addWidgetsfrmSkinTest
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
    frmSkinTest.setDefaultUnit(kony.flex.DP);
};