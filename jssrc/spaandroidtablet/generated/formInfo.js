//Form JS File
function addWidgetsformInfo() {
    var labelValue = new kony.ui.Label({
        "id": "labelValue",
        "top": "98dp",
        "left": "88dp",
        "width": "211dp",
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
    var textValue = new kony.ui.TextArea2({
        "id": "textValue",
        "top": "134dp",
        "left": "88dp",
        "width": "260dp",
        "height": "120dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "TextArea2",
        "maxTextLength": null,
        "numberOfVisibleLines": 2,
        "textInputMode": constants.TEXTAREA_INPUT_MODE_ANY,
        "keyBoardStyle": constants.TEXTAREA_KEY_BOARD_STYLE_DEFAULT,
        "placeholder": null,
        "autoCapitalize": constants.TEXTAREA_AUTO_CAPITALIZE_NONE,
        "skin": "txt2Normal",
        "focusSkin": "txt2Focus"
    }, {
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 27
    }, {
        "autoCorrect": false
    });
    var buttonSaveClose = new kony.ui.Button({
        "id": "buttonSaveClose",
        "top": "274dp",
        "left": "91dp",
        "width": "260dp",
        "height": "50dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "Save & Close",
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
    formInfo.add(
    labelValue, textValue, buttonSaveClose);
};

function formInfoGlobals() {
    var MenuId = [];
    formInfo = new kony.ui.Form2({
        "id": "formInfo",
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
        "addWidgets": addWidgetsformInfo
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
    formInfo.setDefaultUnit(kony.flex.DP);
};