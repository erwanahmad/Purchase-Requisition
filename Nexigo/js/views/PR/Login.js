﻿nexigo.widget({
    toolbars: [
        //{ text: 'Login', action: 'login', icon: 'fa-login'}
    ],
    views: [
        {
            text: 'Login',
            name: 'loginpanel',
            type: 'panel',
            inline: true,
            cols: 6,
            offset: 3,
            fields: [
                { name: 'StaffID', text: 'StaffID', type: 'text', cols: 7},
                { name: 'Password', text: 'Password', type: 'password', cols: 7},
                { name: 'button1', type: 'button', text: 'Login', action: 'login', icon: 'fa-login', cssClass: 'xg-btn-success' }
            ]
        }
    ],
    functions: {
        init: function (xq, callback) {
            callback();
        },
        login: function () {
            var tempString = "";
            var employee = xg.serialize();
            window.StaffID = employee.StaffID;
            window.Password = employee.Password;
            if ((window.StaffID && window.Password) === '' || (window.StaffID && window.Password) === null)
            {
                xg.navigate('PR/Login');
            }
            else {
                xg.ajax({
                    url: 'http://localhost:31604/api/user/LoginUser',
                    data: JSON.stringify(employee),
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        console.log(data);
                        tempString = data;
                    },
                    complete: function () {
                        if (tempString === "No data") {
                            alert("Can't Login");
                        } else {
                            xg.navigate('PR/ListPR');
                            console.log("Complete");
                        }
                        
                    
                    }
                });
            }
        },
        logout: function () {
            window.loginId = 'http://localhost:31604/api/request/ListPR';
        }
    }
});

    //}
                        //else
                        //    xg.navigate('PR/Login');
                        //if (data === employee.Email) {
                        //xg.navigate('PR/ListPR');
            //if (data === window.Email) {
            //    xg.navigate('PR/ListPR');
            //}
            //xg.navigate('PR/Login');
            //window.loginEmail = req.loginEmail;
            //window.loginPswd = req.loginPswd;
            //if ((window.loginEmail && window.loginPswd) === '' || (window.loginEmail && window.loginPswd) === null) {
            //    xg.navigate('PR/Login');
            //}
            //else {
        //login: function () {
        //    var employee = xg.serialize();
        //    window.Email = employee.Email;
        //    if (data === window.Email)
        //}