// Author: Jireh Nimes
// 03-03. Javascript
$(document).ready(function(){

    // array
    // Collection of regex to meet per requirement
    var aId = [
        {
            sProp: 'iLen',
            mRegex: /^.{6,}$/
        },
        {
            sProp: 'iLow',
            mRegex: /^[a-z]+$/
        }
    ];
    var aPwd = [
        {
            sProp: 'iLen',
            mRegex: /^.{8,}$/
        },
        {
            sProp: 'iLow',
            mRegex: /^.*[a-z]+.*$/
        },
        {
            sProp: 'iUp',
            mRegex: /^.*[A-Z]+.*$/
        },
        {
            sProp: 'iNum',
            mRegex: /^.*\d+.*$/
        },
        {
            sProp: 'iSpc',
            mRegex: /^.*\W.*$/,
            mRegex2: /^[^:?$&]+$/
        },
    ];

    // string
    // Initialized variables for ID and Password
    var sId = "";
    var sPwd = "";

    // object
    // Initilized values for validation
    var oId = {
        iLen: 0,
        iLow: 0,
        iDefErr: 2,
        iErr: 2,
        count: 0
    };
    var oPwd = {
        iLen: 0,
        iLow: 0,
        iUp: 0,
        iNum: 0,
        iSpc: 0,
        iDefErr: 5,
        iErr: 5,
        count: 0
    }

    // Displays validation results for ID
    $('#fId').click(function(){
        if(oId.iErr === 0){
            $('.mIdMsg').hide();
        }else{
            $('.mIdMsg').slideDown('slow');
        }
    });

    // Displays validation results for Password
    $('#fPwd').click(function(){
        if(oPwd.iErr === 0){
            $('.mPwdMsg').hide();
        }else{
            $('.mPwdMsg').slideDown('slow');
        }
    });

    // Listens to input for ID
    $('#fId').keyup(function(e) {
        sId = $(this).val();
        oId.count = 0;
        if(e.key.length === 1 || e.key === 'Delete' || e.key === 'Backspace'){
            for(i = 0; i < aId.length; i++){
                sId.match(aId[i]['mRegex']) ? decErr(oId, 'mIdMsg', aId[i]['sProp'], i + 1, oId.count) : incErr(oId, 'mIdMsg', aId[i]['sProp'], i + 1, oId.count);
            }
        }
        if(oId.iErr === 0){
            $('.mIdMsg').slideUp('slow');
        }
        disErr();
    });

    // Listens to input for Password
    $('#fPwd').keyup(function(e) {
        sPwd = $(this).val();
        oPwd.count = 0;
        if(e.key.length === 1 || e.key === 'Delete' || e.key === 'Backspace'){
            for(i = 0; i < aPwd.length; i++){
                if(i === 4){
                    sPwd.match(aPwd[i]['mRegex']) && sPwd.match(aPwd[i]['mRegex2']) ? decErr(oPwd, 'mPwdMsg', aPwd[i]['sProp'], i + 1, oPwd.count) : incErr(oPwd, 'mPwdMsg', aPwd[i]['sProp'], i + 1, oPwd.count);
                }else{
                    sPwd.match(aPwd[i]['mRegex']) ? decErr(oPwd, 'mPwdMsg', aPwd[i]['sProp'], i + 1, oPwd.count) : incErr(oPwd, 'mPwdMsg', aPwd[i]['sProp'], i + 1, oPwd.count);
                }
            }
        }
        if(oPwd.iErr === 0){
            $('.mPwdMsg').slideUp('slow');
        }
        disErr();
    });

    // To decrease error count
    // that, object, calls specific object to be used
    // sElem, string, calls specific HTML module element
    // sObjProp, string, property in the object
    // iNum, integer, calls the nth child paragraph of the HTML module element
    // iCount, integer, counter value of the object
    function decErr(that, sElem, sObjProp, iNum, iCount){
        // Hides the specific paragraph in the HTML module element
        $('.' + sElem + ' > p:nth-child(' + iNum + ')').hide();
        if(that[sObjProp] === 0){
            that[sObjProp] = 1;
            if(that.iErr > 0 && iCount === 0){
                that.iErr -= 1;
                that.count = 1;
            }
        }
    }

    // To increase error count
    // that, object, calls specific object to be used
    // sElem, string, calls specific HTML module element
    // sObjProp, string, property in the object
    // iNum, integer, calls the nth child paragraph of the HTML module element
    // iCount, integer, counter value of the object
    function incErr(that, sElem, sObjProp, iNum, iCount){
        // Shows the specific paragraph in the HTML module element
        $('.' + sElem + ' > p:nth-child(' + iNum + ')').show();
        if(that[sObjProp] === 1){
            that[sObjProp] = 0;
            if(that.iErr < that.iDefErr && iCount === 0){
                that.iErr += 1;
                that.count = 1;
            }
        }
    }

    // Displays error count
    function disErr(){
        $('.mErrCnt').hide();
        var iTotalErr = oId.iErr + oPwd.iErr;
        if(iTotalErr === 0){
            $('.mErrCnt').show().removeClass('alert-info').addClass('alert-success').text("Successful validation!");
        }else{
            $('.mErrCnt').show().removeClass('alert-success').addClass('alert-info').text("Total Error: " + iTotalErr);
        }
    }

});
