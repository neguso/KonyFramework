//Form JS File
function addWidgetsformAbout() {
    var labelVersion = new kony.ui.Label({
        "id": "labelVersion",
        "top": "21dp",
        "left": "21dp",
        "width": "286dp",
        "height": "26dp",
        "zIndex": 1,
        "isVisible": true,
        "text": "about app...",
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
    formAbout.add(
    labelVersion);
};

function formAboutGlobals() {
    var MenuId = [];
    formAbout = new kony.ui.Form2({
        "id": "formAbout",
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
        "addWidgets": addWidgetsformAbout
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
    formAbout.setDefaultUnit(kony.flex.DP);
};