async function reauthenLiff(action, state, fromPage) {
    var liffID = _app.liffID;

    await liff.init({ liffId: liffID })

    if (liff.isInClient()) {
        getUserProfile_reAuthen(action, state, fromPage)
    } else {
        if (liff.isLoggedIn()) {
            getUserProfile_reAuthen(action, state, fromPage)
        } else {
            liff.login({
                redirectUri: _app.baseFront + action + "?state=" + state
            })
        }
    }
}
async function getUserProfile_reAuthen(action, state, fromPage) {
    var mapping = {
    }
    const profile = await liff.getProfile();
    var checkExistProfReq = {};
    checkExistProfReq.lineId = profile.userId;
    checkExistProfReq.lineImg = profile.pictureUrl;
    checkExistProfReq.lineDispName = profile.displayName;

    if (localStorage.getItem('BREEZE:OUTWRT:STATE') != undefined && localStorage.getItem('BREEZE:OUTWRT:STATE') != null) {
        state = localStorage.getItem('BREEZE:OUTWRT:STATE');
    }

    checkExistLineID(checkExistProfReq, result => {
        if (result.data.isExisted) {
            setAuthenDataToStorage(result.data);
            if (fromPage.toUpperCase() == 'MAINPAGE') {
                  // done
                if (state != undefined && state != null && state != '') {
                    localStorage.removeItem('BREEZE:OUTWRT:STATE');
                    insertVisitLog(state, resultState => {
                        window.location.href = _app.baseURL + 'Home/Index';
                    });
                } else {
                    window.location.href = _app.baseURL + 'Home/Index';
                }
            } else if (fromPage.toUpperCase() == 'SAMPLEREC') {
                 // done
                prepEventState(_app.evTypePage, "SampleRec", []);
            } else if (fromPage.toUpperCase() == 'UPLOADREC') {
                 // done
                prepEventState(_app.evTypePage, "UploadRec", []);

                getListStore(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject.lstStore);
                    $.unblockUI();
                });
            } else if (fromPage.toUpperCase() == 'UPLOADRECEDIT') {
                prepEventState(_app.evTypePage, "UploadRecEdit", []);
                getRecDetailByGuid(myObject.reqGuid(), resultDet => {
                    ko.mapping.fromJS(resultDet.data, mapping, self.myObject.recDetail);

                    getListStore(result => {
                        ko.mapping.fromJS(result.data, mapping, self.myObject.lstStore);
                        myObject.storeGuid(resultDet.data.storeGuid);

                        $('#ddlStore').trigger('change');
                        $.unblockUI();
                    });
                });
            } else if (fromPage.toUpperCase() == 'UPLOADRECVIEW') {
                prepEventState(_app.evTypePage, "UploadRecView", []);
                getRecDetailByGuid(myObject.reqGuid(), result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject);
                    $.unblockUI();
                });             
            } else if (fromPage.toUpperCase() == 'PROFILE') {
                  // done
                myObject.custData.custLineDisplayName(profile.displayName);
                myObject.custData.custLineImg(profile.pictureUrl);

                getCustomerData(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject);
                    $.unblockUI();
                });

                prepEventState(_app.evTypePage, "Profile", []);
            } else if (fromPage.toUpperCase() == 'EDITPROFILE') {
                  // done
                getCustomerData(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject);
                    $.unblockUI();
                });

                prepEventState(_app.evTypePage, "EditProfile", []);
            } else if (fromPage.toUpperCase() == 'HISTORY') {
                  // done
                getHistRec(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject.lstHist);
                    $.unblockUI();
                });
                myObject.custData.custLineDisplayName(profile.displayName);
                myObject.custData.custLineImg(profile.pictureUrl);

                prepEventState(_app.evTypePage, "History", []);

            } else if (fromPage.toUpperCase() == 'HISTREDEEM') {
                // done
                getHistRedeem(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject.lstHistRedeem);
                    $.unblockUI();
                });
                myObject.custData.custLineDisplayName(profile.displayName);
                myObject.custData.custLineImg(profile.pictureUrl);

                prepEventState(_app.evTypePage, "HistRedeem", []);

            }else if (fromPage.toUpperCase() == 'REWARD') {
                  // done
                getAllActiveReward(result => {
                    ko.mapping.fromJS(result.data, mapping, self.myObject);
                    $.unblockUI();
                });
                prepEventState(_app.evTypePage, "Reward", []);
            } else if (fromPage.toUpperCase() == 'INDEX') {
                // done
                getActiveCampaign(result => {
                    if (result == undefined || result == null || result.data == undefined || result.data == null) {
                        toastr["error"]("ขออภัย ยังไม่มีกิจกรรมในขณะนี้");
                    }
                });
                prepEventState(_app.evTypePage, "Index", []);
            } else if (fromPage.toUpperCase() == 'RANKING') {
                getLeaderBoardData(result => {
                 
                    ko.mapping.fromJS(result.data, mapping, self.myObject);
                    console.log("self.myObject", self.myObject);
                    console.log("result.data.topSpenderEndDate", result.data.topSpenderEndDate);

                    var dateFuture = Date.parse(result.data.topSpenderEndDate);
                    var dateNow = new Date();
                    var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);
                    hours = hours - (days * 24);
                    minutes = minutes - (days * 24 * 60) - (hours * 60);

                    $('#showRemainDay').html(days);
                    $('#showRemainHour').html(hours);
                    $('#showRemainMin').html(minutes);

                    //show timer on leader board here
                    //by use fancytimer
                    //if (self.myObject.isOpenCamp() && self.myObject.isShowCounter()) {
                    //    var options2 = {
                    //        value: new Date(result.data.topSpenderEndDate),
                    //        captions: {
                    //            days: 'วัน',
                    //            hours: 'ชั่วโมง',
                    //            minutes: 'นาที'
                    //        },
                    //        showDays: 2,
                    //        reverseAnimation: true
                    //    };
                    //    var ft2 = new FancyTimer(
                    //        document.getElementById('container'),
                    //        options2
                    //    );                        
                    //}
                    //else {
                    //    if (!self.myObject.isOpenCamp()) {
                    //        $("#modal-notOpenCamp").modal({ backdrop: 'static', keyboard: false }, 'show');
                    //    } else if (!self.myObject.isShowCounter()) {
                    //        $("#modal-closeCamp").modal({ backdrop: 'static', keyboard: false }, 'show');
                    //    }
                    //}
                  
                    $.unblockUI();
                });
                
                prepEventState(_app.evTypePage, "Ranking", []);
            } else if (fromPage.toUpperCase() == 'EDITCONTRACT') {
                getCustomerData(result => {

                    getProvince(prov_result => {
                  
                        ko.mapping.fromJS(prov_result.data, mapping, self.myObject.lstProvince);
                        ko.mapping.fromJS(result.data.custData, mapping, self.myObject.custData);
                        self.myObject.distId(result.data.custData.custDistId);
                        self.myObject.subDistId(result.data.custData.custSubDistId);
                        $.unblockUI();
                        $('#ddlProvince').trigger('change');
                    });
                });
            }
        } else {
            signOut();
             // done
            if (fromPage.toUpperCase() == 'REGISTER') {
                myObject.custData.custLineId(profile.userId);
                myObject.custData.custLineImg(profile.pictureUrl);
                myObject.custData.custLineDisplayName(profile.displayName);

            } else {
                window.location.href = _app.baseURL + 'Home/Register';
            }
        }
    })
}
function checkExistLineID(req, callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'Authen/checkExistLineID',
        contentType: "application/json; charset=utf-8",
        data: ko.toJSON(req),
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function signOut() {
    localStorage.removeItem('BREEZE:OUTWRT:TOKEN');
    localStorage.removeItem('BREEZE:OUTWRT:TEL');
    localStorage.removeItem('BREEZE:OUTWRT:NAME');
    localStorage.removeItem('BREEZE:OUTWRT:PIC');
}
function setAuthenDataToStorage(resp) {
    //original
    //localStorage.setItem('BREEZE:OUTWRT:TOKEN', resp.token);
    //localStorage.setItem('BREEZE:OUTWRT:TEL', resp.custTelNo);
    //localStorage.setItem('BREEZE:OUTWRT:NAME', resp.customerName);
    //localStorage.setItem('BREEZE:OUTWRT:PIC', resp.linePic);

    localStorage.setItem('BREEZE:OUTWRT:TOKEN', resp.token);
    localStorage.setItem('BREEZE:OUTWRT:TEL', resp.custTel);
    localStorage.setItem('BREEZE:OUTWRT:NAME', resp.customerName);
    localStorage.setItem('BREEZE:OUTWRT:PIC', resp.linePic);
}
function insertVisitLog(state, callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/insertVisitLog?state=' + state,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function updatePersonalData(registObj, callback) {

    $.ajax({
        url: _app.baseAPI + 'authen/updatePersonalData',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        data: ko.toJSON(registObj),
        dataType: "json",
        async: false,
        contentType: "application/json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }

    });
}
function insertPersonalData(registObj, callback) {
    $.ajax({
        url: _app.baseAPI + 'authen/insertPersonalData',
        type: 'POST',
        data: ko.toJSON(registObj),
        dataType: "json",
        async: false,
        contentType: "application/json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).data !== undefined) {
                msg = JSON.parse(jqXHR.responseText).data;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).data !== undefined) {
                msg = JSON.parse(jqXHR.responseText).data;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }

    });
}
function getActiveCampaign(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'home/getActiveCampaign' ,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function prepEventState(event, name, arrParam) {
    var reqData = {}
    reqData.eventStateType = event;
    reqData.eventName = name;
    reqData.lstEventParam = arrParam;
    
    insertEventStatePageLoad(reqData, result => {
    });
}
function insertEventStatePageLoad(reqData, callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'Home/insertEventStatePageLoad',
        data: ko.toJSON(reqData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr.error(msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = jqXHR.responseJSON.data;
            toastr.error(msg);
        }
    });
}
function getListStore(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'home/getListStore',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function confirmRedeemSpc(reqData, callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'home/confirmRedeemSpc',
        data: ko.toJSON(reqData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function confirmRedeem(reqData, callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'home/confirmRedeem',
        data: ko.toJSON(reqData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function cancelMember(callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'home/cancelMember',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function joinTopSpender(callback) {
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'home/joinTopSpender',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getAllActiveReward(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getAllActiveReward',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getRecDetailByGuid(reqGuid, callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getRecDetailByGuid?reqGuid=' + reqGuid,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getCustomerData(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Authen/getCustomerData',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getHistRec(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getHistRec',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getLeaderBoardData(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getLeaderBoardData',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }
            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }
            toastr["error"](msg);
        }
    });
}
function getHistRedeem(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getHistRedeem',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getListProduct(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Home/getListProduct',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getProvince(callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Address/getProvince',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }
            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }
            toastr["error"](msg);
        }
    });
}
function getDistByProvId(provId, callback) {

    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Address/getDistByProvId?provId=' + provId,
        contentType: "application/json; charset=utf-8",
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('CASTEPL:WRT:TOKEN')
        },
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr.error(msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = jqXHR.responseJSON.data;
            toastr.error(msg);
        }
    });
}
function getSubDistByDistId(distId, callback) {

    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Address/getSubDistByDistId?distId=' + distId,
        contentType: "application/json; charset=utf-8",
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('CASTEPL:WRT:TOKEN')
        },
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr.error(msg);
        },
        error: function (jqXHR, exception, error) {
            $.unblockUI();
            var msg = jqXHR.responseJSON.data;
            toastr.error(msg);
        }
    });
}
function checkValidToken(url) {
    var token = localStorage.getItem('BREEZE:OUTWRT:TOKEN');

    if (token == null || token.trim() == '') {
        localStorage.clear();
        window.location = url;
    } else {
        checkExistTelNo(localStorage.getItem('BREEZE:OUTWRT:TEL'), result => {
      
            if (!result) {
                localStorage.clear();
                window.location = url;
            }
        });
        
    }
    return true;
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
function getProfile(lineId, lineImg, lineDispName, callback) {
    var req = {};
    req.lineImg = lineImg;
    req.lineId = lineId;
    req.lineDispName = lineDispName;
    $.ajax({
        type: "POST",
        url: _app.baseAPI + 'api/checkExistLineID' ,
        contentType: "application/json; charset=utf-8",
        data: ko.toJSON(req),
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            var msg = '';
            $('div.data').unblock();
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            var msg = '';
            $('div.data').unblock();
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getDistrictByProvince(provId, callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'api/getDistrictByProvince?provinceId=' + provId,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getSubDistrictByDistrict(districtId, callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'api/getSubDistrictByDistrict?districtId=' + districtId,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}
function getCustGuidFromToken( callback) {
    $.ajax({
        type: "GET",
        url: _app.baseAPI + 'Authen/getCustGuidFromToken' ,
        data: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('BREEZE:OUTWRT:TOKEN')
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        failure: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        },
        error: function (jqXHR, exception, error) {
            $('div.data').unblock();
            var msg = '';
            if (JSON.parse(jqXHR.responseText).errors !== undefined) {
                msg = JSON.parse(jqXHR.responseText).errors[0].Message;
            } else {
                msg = JSON.parse(jqXHR.responseText).message;
            }

            toastr["error"](msg);
        }
    });
}

// ========================== ko binding ================================
ko.bindingHandlers.valueNumber = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here

        var observable = valueAccessor(),
            properties = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(observable);

        var interceptor = ko.computed({
            read: function () {
                var format = properties.numberDigit || 2;
                return valueUnwrapped.toLocaleString(undefined, { minimumFractionDigits: format, maximumFractionDigits: format });//Globalize.numberFormat(observable(), format);
            },
            write: function (newValue) {
                var number = Globalize.parseFloat(newValue);
                if (number) {
                    valueUnwrapped = number;
                    //  observable(number);
                }
            }
        });

        if (ko.utils.tagNameLower(element) === 'input') {
            ko.applyBindingsToNode(element, { value: interceptor });
        } else {
            ko.applyBindingsToNode(element, { text: interceptor });
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here

        var observable = valueAccessor(),
            properties = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(observable);

        var interceptor = ko.computed({
            read: function () {
                var format = properties.numberDigit || 2;
                return valueUnwrapped.toLocaleString(undefined, { minimumFractionDigits: format, maximumFractionDigits: format });//Globalize.numberFormat(observable(), format);
            },
            write: function (newValue) {
                var number = Globalize.parseFloat(newValue);
                if (number) {
                    valueUnwrapped = number;
                    //  observable(number);
                }
            }
        });

        if (ko.utils.tagNameLower(element) === 'input') {
            ko.applyBindingsToNode(element, { value: interceptor });
        } else {
            ko.applyBindingsToNode(element, { text: interceptor });
        }
    }
};

//ko.bindingHandlers.preSelect = {
//    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
//        var val = ko.utils.unwrapObservable(valueAccessor());
//        var newOptions = element.getElementsByTagName("option");
//        var updateRequired = false;
//        for (var i = 0, j = newOptions.length; i < j; i++) {
//            if (ko.utils.unwrapObservable(val.value) == ko.selectExtensions.readValue(newOptions[i])[val.key]) {
//                if (!newOptions[i].selected) {
//                    ko.utils.setOptionNodeSelectionState(newOptions[i], true);//only sets the selectedindex, object still holds index 0 as selected
//                    updateRequired = true;
//                }
//            }
//        }
//        if (updateRequired) {
//            var options = allBindingsAccessor().options;
//            var selected = ko.utils.arrayFirst(options, function (item) {
//                return ko.utils.unwrapObservable(val.value) == item[val.key];
//            });
//            if (ko.isObservable(bindingContext.$data[val.propertyName])) {
//                bindingContext.$data[val.propertyName](selected); // here we write the correct object back into the $data
//            } else {
//                bindingContext.$data[val.propertyName] = selected; // here we write the correct object back into the $data
//            }
//        }
//    }
//};

ko.bindingHandlers.ladda = {
    init: function (element, valueAccessor) {
        var l = Ladda.create(element);

        ko.computed({
            read: function () {
                var state = ko.unwrap(valueAccessor());
                if (state)
                    l.start();
                else
                    l.stop();
            },
            disposeWhenNodeIsRemoved: element
        });
    }
};
ko.bindingHandlers.dataTablesForEach = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var binding = ko.utils.unwrapObservable(valueAccessor());

        ko.unwrap(binding.data);

        if (binding.options.paging) {
            binding.data.subscribe(function (changes) {
                var table = $(element).closest('table').DataTable();
                ko.bindingHandlers.dataTablesForEach.page = table.page();
                table.destroy();
            }, null, 'arrayChange');
        }

        var nodes = Array.prototype.slice.call(element.childNodes, 0);
        ko.utils.arrayForEach(nodes, function (node) {
            if (node && node.nodeType !== 1) {
                node.parentNode.removeChild(node);
            }
        });

        return ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var value = ko.unwrap(valueAccessor()),
            key = "DataTablesForEach_Initialized";

        var newValue = function () {
            return {
                data: value.data || value,
                beforeRenderAll: function (el, index, data) {
                    if (ko.utils.domData.get(element, key)) {
                        $(element).closest('table').DataTable().destroy();
                    }
                },
                afterRenderAll: function (el, index, data) {
                    $(element).closest('table').DataTable(value.options);
                }

            };
        };

        ko.bindingHandlers.foreach.update(element, newValue, allBindingsAccessor, viewModel, bindingContext);

        //if we have not previously marked this as initialized and there is currently items in the array, then cache on the element that it has been initialized
        if (!ko.utils.domData.get(element, key) && (value.data || value.length)) {
            ko.utils.domData.set(element, key, true);
        }

        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['datepicker'] = {
    'init': function (element, valueAccessor, allBindingsAccessor) {
        /* Initialize datepicker with some optional options */
        var options = allBindingsAccessor().datePickeroptions || {},
            prop = valueAccessor(),
            $elem = $(element);

        prop($elem.val());

        $elem.datepicker(options);

        /* Handle the field changing */
        ko.utils.registerEventHandler(element, "change", function () {
            prop($elem.datepicker("value")[0].value);

        });

        /* Handle disposal (if KO removes by the template binding) */
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $elem.datepicker("destroy");
        });
    },
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            $elem = $(element),
            current = $elem.datepicker("value")[0].value;;

        if (value - current !== 0) {
            $elem.datepicker("setDate", value);
        }
    }
};
ko.bindingHandlers.numericText = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            precision = ko.utils.unwrapObservable(allBindingsAccessor().precision) || ko.bindingHandlers.numericText.defaultPrecision,
            formattedValue = value.toFixed(precision);

        ko.bindingHandlers.text.update(element, function () { return formattedValue; });
    },
    defaultPrecision: 1
};
ko.bindingHandlers.number = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var defaults = ko.bindingHandlers.number.defaults,
            aba = allBindingsAccessor,
            unwrap = ko.utils.unwrapObservable,
            value = unwrap(valueAccessor()) || valueAccessor(),
            result = '',
            numarray;

        var separator = unwrap(aba().separator) || defaults.separator,
            decimal = unwrap(aba().decimal) || defaults.decimal,
            precision = unwrap(aba().precision) || defaults.precision,
            symbol = unwrap(aba().symbol) || defaults.symbol,
            after = unwrap(aba().after) || defaults.after;

        value = parseFloat(value) || 0;

        if (precision > 0)
            value = value.toFixed(precision)

        numarray = value.toString().split('.');

        for (var i = 0; i < numarray.length; i++) {
            if (i == 0) {
                result += numarray[i].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
            } else {
                result += decimal + numarray[i];
            }
        }

        result = (after) ? result += symbol : symbol + result;

        ko.bindingHandlers.text.update(element, function () { return result; });
    },
    defaults: {
        separator: ',',
        decimal: '.',
        precision: 0,
        symbol: '',
        after: false
    }
};
