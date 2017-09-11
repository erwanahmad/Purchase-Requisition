nexigo.widget({
    name: 'test',type: 'panel',
    views: [
        {
            name: 'requestpanel', type: 'panel', text: 'REQUESTER INFORMATION', inline: true,
            fields: [{
                type: 'row',
                panels: [
                    {
                        inline: true, cols: 6,
                        fields: [{
                            type: 'panel',
                            fields: [
                                { name: 'Requester_ID', text: 'Requester Name', type: 'text', cols: 7, readonly: true },
                                { name: 'Requester_Name', text: 'Requester Name', type: 'text', cols: 7, readonly:true },
                                { name: 'Requester_Position', text: 'Requester Position', type: 'text', cols: 7, readonly: true },
                                { name: 'Divison', text: 'Division', type: 'text', cols: 7, readonly: true},
                                { name: 'Currency', text: 'Currency', type: 'text', cols: 7, readonly: true, data: 'http://localhost:31604/api/request/GetText',/* placeholder: 'IDR',*/ },
                            ]
                        }]
                    },
                    {
                        name: 'requestpanel2', cols: 6, inline: true,
                        fields: [{
                            type: 'panel',
                            fields: [
                                { name: 'Location', text: 'Propose Receiving Material Location', type: 'select', cols: 8, tooltip: 'Media list', data:'http://localhost:31604/api/request/GetLocation' },
                                {
                                    name: 'BudgetSource', text: 'Budget Source',
                                    type: 'select', cols: 8, tooltip: 'Media list', data: 'http://localhost:31604/api/user/BudgetSourceList',
                                    onChange: function (value, text) {
                                        xg.ajax({
                                            url: 'http://localhost:31604/api/request/getNameOwner?Id=' + value,
                                            type: 'GET',data: {},contentType: "application/json; charset=utf-8",
                                            success: function (data) {
                                                console.log(data);
                                                xg.populate({ BudgetSources:data});
                                            },
                                            complete: function () {
                                                console.log("complete");
                                            }
                                        });
                                        //xg.call('BudgetSource', text);
                                    }
                                },
                                { name: 'Expected_Date', text: 'Expected Date', type: 'picker', cols: 8, placeholder: 'Pick a date...' },
                                { name: 'Reviewer_Code', text: 'Reviewer Code', type: 'select', cols: 8, data: 'http://localhost:31604/api/request/ReviewerList' }
                            ]
                        }]
                    }]
            }]
        },
        {
            name: 'test',type: 'panel',text: 'HEADER INFORMATION',inline: true,
            fields: [
                { name: 'Justification', text: 'Justification', type: 'textarea' },
            ]
        },
        {
            name: 'iteminformation', type: 'panel', text: 'ITEM INFORMATION', inline: true,
            fields: [
                {
                    name: 'Material_Group', text: 'Material Group', type: 'select', cols: 4, tooltip: 'Media list',
                    data: 'http://localhost:31604/api/request/MaterialGroupList',
                    onChange: function (value, text) {
                        xg.ajax({
                            url: 'http://localhost:31604/api/request/MaterialListItem?Id=' + value,
                            type: 'GET',
                            data: {},
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                console.log(data);
                                window.data = data;
                            },
                            complete: function () {
                                console.log("complete");
                            }
                        });
                    }
                },
                {
                    type: 'fieldRow',
                    fields: [
                        {
                            name: 'Materials', type: 'select', cols: 4, text: 'Item', tooltip: 'Media list',
                            //data: 'Materials'
                            data: 'http://localhost:31604/api/request/ItemList'
                        },
                    ]
                },
                { name: 'Description', text: 'Description', type: 'textarea', cols: 11 },
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'Quantity', text: 'Quantity', type: 'text', cols: 4 },
                    ]
                },
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'Estimate_Price', text: 'Estimate Price', type: 'text', cols: 4 },
                    ]
                },
                { name: 'Total_Estimate_Price', text: 'Total Estimate Price', cols: 4},
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'BudgetSources', text: 'Budget Sources'/*, type: 'text'*/, cols: 4, readonly: true },
                    ]
                },
        
                //{
                //    type: 'fieldRow',
                //    fields: [
                //        { name: 'MaterialPicture', text: 'Material Picture', type: 'text', cols: 10 },
                //        {
                //            name: 'ButtonUpload', type: 'button', icon: 'fa-upload', cssClass: 'xg-btn-success', cols: 1,
                //            text: 'Browse',
                //            action: function () {
                //                xg.uploader.upload({
                //                    data: {
                //                        type: 'aaaaa'
                //                    },
                //                    //url: 'http://localhost:2662/api/Hello/SaveAttachment'
                //                }, function (data) {
                //                    xg.message('File uploaded');
                //                    console.log(data);
                //                    });
                //            }
                //        }
                //    ]
                //},
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'Submit', type: 'button', text: 'Add', action: 'Submit', cssClass: 'xg-btn-success', cols: 1, /*offset: 10,*/ /*stretch: true,*/ icon: 'fa-save',},
                    ]
                },
            ]
        },
        {
            name: 'PanelComment',
            type: 'panel',
            fields: [
                {
                    name: 'Comment',type: 'textarea',text: 'Comment'
                },
                {
                    name: 'commentGrid',type: 'grid',
                    data: [],
                    fields: [
                        { name: 'Date', text: 'Date' },
                        { name: 'Name', text: 'Name' },
                        { name: 'Comment', text: 'Comment' }
                    ]
                }
            ]
        }
    ],
    functions: {
        init: function (xg, callback) {
                //untuk nama
                xg.ajax({
                        url: 'http://localhost:31604/api/user/GetUserName',
                        data: window.StaffID,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            //if (res === null) {
                            //    xg.navigate('PR/Login');
                            //}
                            xg.populate({ Requester_ID: window.StaffID,Requester_Name: result });
                            
                        },
                        complete: function () {
                            console.log("Complete");
                            xg.loading.hide();
                        }
                    });
                //Untuk Position
                xg.ajax({
                    url: 'http://localhost:31604/api/user/GetUserPosition',
                    data: window.StaffID,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        console.log(res);
                        xg.populate({ Requester_Position: res });
                    },
                    complete: function () {
                        console.log("Complete");
                        xg.loading.hide();
                    }
                });

                //Untuk Divisi
                xg.ajax({
                    url: 'http://localhost:31604/api/user/GetUserDivision',
                    data: window.StaffID,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        console.log(res);
                        xg.populate({ Divison: res });
                    },
                    complete: function () {
                        console.log("Complete");
                        xg.loading.hide();
                    }
                });

                //Untuk IDR
                xg.ajax({
                    url: 'http://localhost:31604/api/request/GetText',
                    type: 'GET',
                    data: 'text'
                }).done(function (resp, status, xhr) {
                    xg.populate({ Currency: resp})
                }).fail(function (err) {
                    console.error(err);
                    });  

            xg.loading.hide();
            callback();
        },
        //BudgetSource: function (data)
        //{
        //    $('[xg-field="BudgetSources"]').val(data);
        //    //$('[xg-field="leftNestedOffsetPanel"]').val(data);
        //},
        Submit: function () {
            var req = xg.serialize();
            //var dataComment = xg.serialize('PanelComment');
            req.Action = "Submit";
            //req.Comment = dataComment.Comment;

            xg.ajax({
                url: 'http://localhost:31604/api/Process/CreateRequestItem',
                data: JSON.stringify(req),
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Submit success' });
                    //xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
        Approve: function () {
            xg.loading.show();
            var req = xg.serialize();
            var dataComment = xg.serialize('PanelComment');
            req.Action = "Approve";
            req.Comment = dataComment.Comment;
            req.ProcessId = xg.params.data['processId'].toString();
            req.ActionBy = window.StaffID;
            xg.ajax({
                url: 'http://localhost:31604/api/Process/ApproveRequestItem',
                data: JSON.stringify(req),
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Approve success' });
                    xg.loading.hide();
                    xg.navigate('makers/home');
                }
            });
        },
    }
});

        //{
                //    type: 'panel', fields:
                //    [{
                //        type: 'panel', name: 'leftNestedOffsetPanel', cols: 9, offset: 2,
                //        fields: [{
                //            type: 'content',
                //            content: '<div /*style="background-color:#ffc*/"><h5>Panel (cols: 9, offset: 2)</h5></div>'
                //        }]
                //    }]
                //},



                                //$('[xg-field="Materials"]').val(data);
                                //xg.populate({ Materials: data.value });
                        //{ name: 'Approve', type: 'button', text: 'Approve', action: 'Approve', cssClass: 'xg-btn-success', cols: 1,icon: 'fa-approve', },
