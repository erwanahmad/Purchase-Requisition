nexigo.widget({
    name: 'testAll', type: 'panel',
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
                                { name: 'ProcessId', text: 'Process Id', type: 'text', cols: 7, readonly: true },
                                { name: 'Requester_ID', text: 'Requester Name', type: 'text', cols: 7, readonly: true },
                                { name: 'Requester_Name', text: 'Requester Name', type: 'text', cols: 7, readonly: true },
                                { name: 'Requester_Position', text: 'Requester Position', type: 'text', cols: 7, readonly: true },
                                
                                //{ name: 'Currency', text: 'Currency', type: 'text', cols: 7, readonly: true},
                            ]
                        }]
                    },
                    {
                        name: 'requestpanel2', cols: 6, inline: true,
                        fields: [{
                            type: 'panel',
                            fields: [
                                { name: 'Divison', text: 'Division', type: 'text', cols: 7, readonly: true },
                                { name: 'Location', text: 'Propose Receiving Material Location', type: 'text', cols: 7, readonly: true},
                                //{ name: 'BudgetSource', text: 'Budget Source', type: 'text', cols: 7, readonly: true },
                                { name: 'Expected_Date', text: 'Expected Date', type: 'text', cols: 7,  readonly: true},
                                //{ name: 'Reviewer_Code', text: 'Reviewer Code', type: 'text', cols: 7, readonly: true}
                            ]
                        }]
                    }]
            }]
        },
        {
            name: 'headerpanel', type: 'panel', text: 'HEADER INFORMATION', inline: true,
            fields: [
                { name: 'Justification', text: 'Justification', type: 'textarea' }
            ]
        },
        {
            name: 'itemipanel', type: 'panel', text: 'ITEM INFORMATION', inline: true,
            fields: [
                { name: 'Material_Group', text: 'Material Group', type: 'text', cols: 4, readonly: true},
                { name: 'Item', type: 'text', cols: 4, text: 'Item', readonly: true },
                { name: 'Description', text: 'Description', type: 'textarea', cols: 10},
                { name: 'Quantity', text: 'Quantity', type: 'text', cols: 4},
                { name: 'Estimate_Price', text: 'Estimate Price', type: 'text', cols: 4},
                { name: 'Total_Estimate_Price', text: 'Total Estimate Price', cols: 4 },
                { name: 'BudgetSources', text: 'Budget Sources', type: 'text', cols: 4, readonly: true},
                { name: 'MaterialPicture', text: 'Material Picture', type: 'text', cols: 10},
                { name: 'Submit', type: 'button', text: 'Submit', action: 'Submit', cssClass: 'xg-btn-success', cols: 2, icon: 'fa-approve' },
                {
                    type: 'fieldRow',
                    fields: [
                        { name: 'AcceptReviewer', type: 'button', text: 'Accept Reviewer', action: 'AcceptReviewer', cssClass: 'xg-btn-success', cols: 2, icon: 'fa-approve' },
                        { name: 'ReviseReviewer', type: 'button', text: 'Revise Reviewer', action: 'ReviseReviewer', cssClass: 'xg-btn-success', cols: 2, icon: 'fa-approve' },
                    ]
                },
                { name: 'AcceptManager', type: 'button', text: 'Accept Manager', action: 'AcceptManager', cssClass: 'xg-btn-success', cols: 2, icon: 'fa-approve' },
                { name: 'AcceptOwner', type: 'button', text: 'Accept Owner', action: 'AcceptOwner', cssClass: 'xg-btn-success', cols: 2, icon: 'fa-approve' },
            ]
        },
        {
            name: 'PanelComment',
            type: 'panel',
            fields: [
                {name: 'Comment',type: 'textarea',text: 'Comment'},
                {name: 'commentGrid',type: 'grid',data: [],
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
            xg.ajax({
                url: 'http://localhost:31604/api/request/GetData?ProcessId=' + window.ProcessId,
                data: {},
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    xg.populate(data);
                },
                complete: function () {
                    console.log("complete");
                }
            });
            //var req = xg.serialize();
            //window.StaffID = req.Requester_ID;
            data = window.StaffID;
            if (data === "19800084" || data === "19800046" )
            {
                $('[xg-field="Submit"]').hide();
                $('[xg-field="AcceptReviewer"]').hide();
                $('[xg-field="AcceptManager"]').hide();
                $('[xg-field="ReviseReviewer"]').hide();
            }
            else if (data === "19820008" || data === "19820014" || data === "19820033" || data === "19820038" || data === "19820066")
            {
                $('[xg-field="Submit"]').hide();
                $('[xg-field="AcceptReviewer"]').hide();
                $('[xg-field="AcceptOwner"]').hide();
                $('[xg-field="ReviseReviewer"]').hide();
            }
            else if (data === "19820111" || data === "19820119")
            {
                $('[xg-field="Submit"]').hide();
                $('[xg-field="AcceptManager"]').hide();
                $('[xg-field="AcceptOwner"]').hide();
            }
            else
            {
                $('[xg-field="AcceptReviewer"]').hide();
                $('[xg-field="ReviseReviewer"]').hide();
                $('[xg-field="AcceptManager"]').hide();
                $('[xg-field="AcceptOwner"]').hide();
            }
            callback();
        },
        AcceptReviewer: function () {
            //xg.loading.show();
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31604/api/Process/ApproveRequestItemByReviewer',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Accept by Reviewer' });
                    xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
        AcceptManager: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31604/api/Process/ApproveRequestItemByManager',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Accept by Manager' });
                    xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
        AcceptOwner: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31604/api/Process/ApproveRequestItemByOwner',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Accept by Owner' });
                    xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
        ReviseReviewer: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31604/api/Process/ReviseRequestItemByReviewer',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Revise success by Reviewer' });
                    xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
        Submit: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31604/api/Process/SubmitAfterReviseRequestItemByEmployee',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                    xg.notify({ type: 'success', text: 'Revise success' });
                    xg.loading.hide();
                    xg.navigate('PR/ListPR');
                }
            });
        },
    }
});



                //{ name: 'Status', text: 'Status', type: 'text', cols: 10},
                //{ type: 'button', text: 'Submit', action: 'Submit', cssClass: 'xg-btn-success', cols: 1, icon: 'fa-approve' },
                //{ type: 'button', text: 'Accept Reviewer', action: 'AcceptReviewer', cssClass: 'xg-btn-success', cols: 1, icon: 'fa-approve'},
                //{ type: 'button', text: 'Accept Manager', action: 'AcceptManager', cssClass: 'xg-btn-success', cols: 1, icon: 'fa-approve' },
                //{ type: 'button', text: 'Accept Owner', action: 'AcceptOwner', cssClass: 'xg-btn-success', cols: 1, icon: 'fa-approve' },
                //{ type: 'button', text: 'Revise Reviewer', action: 'ReviseReviewer', cssClass: 'xg-btn-success', cols: 1, icon: 'fa-approve' },
