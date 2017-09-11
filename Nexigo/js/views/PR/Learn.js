﻿nexigo.widget({
    name: 'test',
    type: 'panel',
    views: [
        {
            name: 'panel1',
            type: 'panel',
            fields: [
                {
                    name: 'BudgetSource', text: 'Budget Source',
                    type: 'select', cols: 6, tooltip: 'Media list', data: 'http://localhost:31604/api/user/BudgetSourceList',
                    onChange: function (value, text) {
                        xg.call('BudgetSource', text);
                    }
                },
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'BudgetSources', text: 'Budget Sources'/*, type: 'text'*/, cols: 3 },
                    ]
                },
                {
                    type: 'panel', fields:
                    [{
                        type: 'panel',name: 'leftNestedOffsetPanel',cols: 9,offset: 2,
                        fields: [{
                            name:'ContenBudgetSource',
                            type: 'content',
                            content: '<div /*style="background-color:#ffc*/"><h5>Panel (cols: 9, offset: 2)</h5></div>'
                        }]
                    }]
                }
            ]
        }],
    functions: {
        init: function (xg, callback) {
            //if ((window.StaffID) === '' || (window.StaffID)=== null) {
            //    xg.navigate('PR/Login');
            //} else {
            //    xg.ajax({
            //        url: 'http://localhost:31604/api/user/GetUserName',
            //        data: window.StaffID,
            //        type: 'POST',
            //        contentType: "application/json; charset=utf-8",
            //        success: function (res) {
            //            console.log(res);
            //            xg.populate({ Requester_Position: res });
            //        },
            //        complete: function () {
            //            console.log("complete");
            //            xg.loading.hide();
            //        }
            //    });
            //}
            //xg.loading.hide();
            callback();
        }
    },
    BudgetSource: function (data) {
        $('[xg-field="BudgetSources"]').val(data)
    },
});