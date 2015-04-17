//Form JS File
function addWidgetsformHome() {
    var labelMessage = new kony.ui.Label({
        "id": "labelMessage",
        "top": "53dp",
        "left": "18dp",
        "width": "150dp",
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
    var textboxMessage = new kony.ui.TextBox2({
        "id": "textboxMessage",
        "top": "85dp",
        "left": "18dp",
        "width": "151dp",
        "height": "40dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "TextBox2",
        "secureTextEntry": false,
        "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
        "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
        "placeholder": null,
        "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
        "skin": "tbx2Normal",
        "focusSkin": "tbx2Focus"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_DEFAULT_PLATFORM_HEIGHT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 9
    }, {
        "autoCorrect": false,
        "autoComplete": false
    });
    var label5300107591013 = new kony.ui.Label({
        "id": "label5300107591013",
        "top": "22dp",
        "left": "16dp",
        "width": "217dp",
        "height": "26dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "widgets binded to the same model",
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
    var label5300107591014 = new kony.ui.Label({
        "id": "label5300107591014",
        "top": "66dp",
        "left": "228dp",
        "width": "210dp",
        "height": "26dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "widgets binded to each other",
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
    var textbox1 = new kony.ui.TextBox2({
        "id": "textbox1",
        "top": "101dp",
        "left": "231dp",
        "width": "211dp",
        "height": "40dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "textbox1",
        "secureTextEntry": false,
        "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
        "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
        "placeholder": null,
        "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
        "skin": "tbx2Normal",
        "focusSkin": "tbx2Focus"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_DEFAULT_PLATFORM_HEIGHT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 7
    }, {
        "autoCorrect": false,
        "autoComplete": false
    });
    var textbox2 = new kony.ui.TextBox2({
        "id": "textbox2",
        "top": "144dp",
        "left": "233dp",
        "width": "209dp",
        "height": "40dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "textbox2",
        "secureTextEntry": false,
        "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
        "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
        "placeholder": null,
        "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
        "skin": "tbx2Normal",
        "focusSkin": "tbx2Focus"
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "containerHeightMode": constants.TEXTBOX_DEFAULT_PLATFORM_HEIGHT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 0
    }, {
        "autoCorrect": false,
        "autoComplete": false
    });
    formHome.add(
    labelMessage, buttonEdit1, buttonEdit2, buttonGet, buttonCancel, buttonKonyGet, buttonKonyCancel, textboxMessage, label5300107591013, label5300107591014, textbox1, textbox2);
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
        "paddingInPixel": false
    }, {
        "retainScrollPosition": false,
        "inTransitionConfig": {
            "formTransition": "None"
        },
        "outTransitionConfig": {
            "formTransition": "None"
        }
    });
    formHome.setDefaultUnit(kony.flex.DP);
};