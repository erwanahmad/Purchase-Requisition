nexigo.widget({
    name: 'test',
    type: 'panel',
    text: 'List Purchase Requestion',
    toolbars: [
    ],
    views: [
        //{
        //    type: 'row',
        //    panels: [
        //        {
        //            name: 'Panel1',
        //            inline: true,
        //            cols: 6,
        //            fields: [{
        //            type: 'panel',
        //            fields: [
        //                { name: 'text_1', text: 'BPM PR No', type: 'text' , cols:8},
        //                { name: 'text_2', text: 'SAP PR No', type: 'text', cols: 8 },
        //                { name: 'text_3', text: 'Old SAP PR No', type: 'text', cols: 8 },
        //                { name: 'text_4', text: 'Budget Source ID', type: 'text', cols:8},
        //            ]
        //            }]
        //        },
        //        {
        //            name: 'Panel1',
        //            cols: 6,
        //            inline: true,
        //            fields: [{
        //                type: 'panel',
        //                fields: [
        //            {
        //                type: 'fieldRow',
        //                fields: [
        //                    { name: 'text_11', text: 'Requester', type: 'text', cols: 8 },
        //                    {
        //                        name: 'button...', type: 'button', text: '...', stretch: true, cols: 2, cssClass: 'xg-btn-success',
        //                    },
        //                    {
        //                        name: 'buttonreset', type: 'button', text: 'Reset', stretch: true, cols: 2, cssClass: 'xg-btn-success',
        //                        action: function () {
        //                            alert('Action fired')
        //                        }
        //                    }
        //                ]
        //            },
        //            { name: 'text_12', text: 'Approver', type: 'text', cols: 8 },
        //            { name: 'text_13', text: 'Process ID', type: 'text', cols: 8 },
        //            {
        //                type: 'fieldRow',
        //                fields: [
        //                    {
        //                        name: 'formatPicker',
        //                        text: 'Periode From',
        //                        type: 'picker',
        //                        cols: 8,
        //                        placeholder: 'Pick a date...',
        //                    },
        //                    {
        //                        name: 'buttonreset', type: 'button', text: 'Reset', stretch: true, cols: 2, cssClass: 'xg-btn-success',
        //                        action: function () {
        //                            alert('Action fired')
        //                        }
        //                    },
        //                ]
        //            },
        //            {
        //                type: 'fieldRow',
        //                fields: [
        //                    {
        //                        name: 'formatPicker',
        //                        text: 'Periode To',
        //                        type: 'picker',
        //                        cols: 8,
        //                        placeholder: 'Pick a date...',
        //                    },
        //                    {
        //                        name: 'buttonreset', type: 'button', text: 'Reset', stretch: true, cols: 2, cssClass: 'xg-btn-success',
        //                        action: function () {
        //                            alert('Action fired')
        //                        }
        //                    }
        //                ]
        //            }
        //        ]
        //            }]
        //        }
        //    ]
        //},
        //{
        //    name: 'Search',
        //    cols: 6,
        //    offset: 5,
        //    fields: [
        //        {
        //            name: 'button1', type: 'button', text: 'Search', action: 'search', icon: 'fa-login',
        //            cssClass: 'xg-btn-success',
        //            //action: function () {
        //            //    //alert('Action fired');
        //            //}
        //        },
        //    ]
        //},
        {
            type: 'panel',
            name: 'TablePanel',
            fields: [{
                type: 'grid',
                name: 'ListPR',
                data: 'http://localhost:31604/api/home/ReadItemAll?Id=' + window.StaffID,
                onDblClick: 'doubleClick',
                options: {
                    sortable: false,editable: false,filterable: true,pageable: true,selectable:'single'
                },
                fields: [
                    { name: 'ProcessId', text: 'ProcessId', type: 'text' },
                    { name: 'Requester_Name', text: 'Requester_Name', type: 'text' },
                    { name: 'Total_Estimate_Price', text: 'Total Estimate Price', type: 'text' },
                    { name: 'Expected_Date', text: 'Expected_Date', type: 'text' },
                    { name: 'CreatedDate', text: 'Created_Date', type: 'text' },
                    { name: 'Status', text: 'Status', type: 'text' },
                ]
            }]
        }
    ],
    functions: {
        doubleClick: function (row) {
            window.ProcessId = row.ProcessId;
            console.log(row);
            xg.navigate('PR/PRprocess?ProcessId=' + row.ProcessId);
        }
    }
});


//{ name: 'BudgetSource', text: 'Budget Source', type: 'text' },