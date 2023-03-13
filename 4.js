var me=2;
// web edit 13/3/23
var myVar = setInterval(myTimer, 5000);  // 5 seconds
var lntotaltime=0; // keep track of total time so we can stop pinging the server if their not playing
var whosturn="player1";

function start(){
    yn=document.getElementById("yourname").value;
    pa=document.getElementById("playagainst").value;
    if (yn=="" || pa==""){
        alert("Need both player names");
        return;
    }    
    document.getElementById("playernumber").value=1;
    document.getElementById("turnnumber").value=1;
    document.getElementById("winner").innerHTML="";
    document.getElementById("start").disabled = true;
    document.getElementById("gamestarted").value="started"
    document.getElementById("newgame").value="newgame"
    var url = "4.php?newgame=newgame&yn="+yn+"&pa="+pa;
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp === null) {
        alert("Browser does not support this page");
        return;
    }
    xmlHttp.open("POST", url, false);
    xmlHttp.send(null);
    //alert(xmlHttp.responseText);
    var laarray=xmlHttp.responseText.split("nextdata");
    document.getElementById("newgame").value=laarray[5]; // new game
    document.getElementById("game").innerHTML=laarray[0];
}

function myTimer() {
    try{
        lntotaltime=lntotaltime+1;
        if (lntotaltime>120){ // approx 10 minutes at 5 second intervals
            alert("Timed out");
            return;
        }
        ///    setInterval(myTimer, 5000);  // 5 seconds
        yn=document.getElementById("yourname").value;
        pa=document.getElementById("playagainst").value;
        playernumber=document.getElementById("playernumber").value;
        turnnumber=document.getElementById("turnnumber").value;
        newgame=document.getElementById("newgame").value;
        started=document.getElementById("gamestarted").value;
        document.getElementById("winner").innerHTML="";
        if (yn=="" || pa==""){
            return;
        }
        var url = "4.php?readdata=yes&yn="+yn+"&pa="+pa+"&turnnumber="+turnnumber+"&playernumber="+playernumber+"&started="+started+"&newgame="+newgame;
        //alert(url);
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp === null) {
            alert("Browser does not support this page");
            return;
        }
        xmlHttp.open("POST", url, false);
        xmlHttp.send(null);
        var laarray=xmlHttp.responseText.split("nextdata");
        turnnumber=laarray[4]; // - gets one added to it in php
        document.getElementById("turnnumber").value=turnnumber;
        document.getElementById("newgame").value=laarray[5]; // new game
        /// alert("player "+playernumber+" turn "+turnnumber+" mod "+(turnnumber % 2+" 2"+laarray[2]+" 6"+laarray[6]));
        if (turnnumber>0 && laarray[2]=="started"){
            document.getElementById("start").disabled = true; // so you can't start again'
            if (playernumber=="1" && (turnnumber % 2)=="1"){
                document.getElementById("game").innerHTML=laarray[0];
            }
            if (playernumber=="1" && (turnnumber % 2)=="0"){
                document.getElementById("game").innerHTML=laarray[1];
            }
            if (playernumber=="" && (turnnumber % 2)=="0"){
                document.getElementById("game").innerHTML=laarray[0];
            }
            if (playernumber=="" && (turnnumber % 2)=="1"){
                document.getElementById("game").innerHTML=laarray[1];
            }
        }
        if (laarray.length>5){
            if (laarray[6]!="NoWinner"){
                document.getElementById("game").innerHTML=laarray[1];
                showwinner(laarray[6],yn,pa);
            }
        }
    }
    catch (err) {
        alert(err.line + err.message );
        ErrorBrowserJump("An error ocurred in myTimer <br> The error was:<br>" + err.line + err.message);
    }
}



/////////////////////////////////////////////////////////////////////////
function GetXmlHttpObject()
{
    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject)
    {
        // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    return null;
}

///////////////////////////////////////////////////////////////////////////
function ErrorBrowserJump(responseText) {
    //    window.location = "Error2.htm?err=" + responseText;
    document.getElementById("error").innerHTML= responseText;
}


function clicked(number){
    try {
        yn=document.getElementById("yourname").value;
        pa=document.getElementById("playagainst").value;
        if (yn=="" || pa==""){
            return;
        }
        if (document.getElementById("newgame").value!="newgame"){
            return;
        }
        // started=document.getElementById("gamestarted").value;
        started="started";
        playernumber=document.getElementById("playernumber").value;
        turnnumber=document.getElementById("turnnumber").value;      
        var x ;
        var la=new Array() ;
        for (x=0;x<25;x++){
            la[x]=document.getElementById(x).value+" ";
        }
        if (playernumber==1){
            la[number]="X ";
        }else{
            la[number]="O ";
        }
        //alert(la);
        var url = "4.php?yn="+yn+"&pa="+pa+"&la="+la+"&number="+number+"&started="+started+"&playernumber="+playernumber+"&turnnumber="+turnnumber;
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp === null) {
            alert("Browser does not support this page");
            return;
        }
        //alert(url);
        xmlHttp.open("POST", url, false);
        xmlHttp.send(null);

        var laarray=xmlHttp.responseText.split("nextdata");
        // playernumber=laarray[3];
        turnnumber=laarray[4]; // - gets one added to it in php
        // alert("player"+playernumber+"turn"+turnnumber+" "+(turnnumber % 2));
        document.getElementById("turnnumber").value=turnnumber;
        if (playernumber=="1" && (turnnumber % 2)=="1"){
            document.getElementById("game").innerHTML=laarray[0];
        }
        if (playernumber=="1" && (turnnumber % 2)=="0"){
            document.getElementById("game").innerHTML=laarray[1];
        }
        if (playernumber=="" && (turnnumber % 2)=="0"){
            document.getElementById("game").innerHTML=laarray[0];
        }
        if (playernumber=="" && (turnnumber % 2)=="1"){
            document.getElementById("game").innerHTML=laarray[1];
        }
        if (laarray.length>5){
            if (laarray[6]!="NoWinner"){
                document.getElementById("game").innerHTML=laarray[1];
                la6=laarray[6];
                showwinner(la6,yn,pa);
            }
        }

    }
    catch (err) {
        alert(err.message + err.line);
        ErrorBrowserJump("An error ocurred in clicked <br> The error was:<br>" + err.message + err.line);
    }
}


//////////////////////////////////////////////////////
function showwinner(la6,yn,pa){
    var lawinline=la6.split(" ");
    if (lawinline[0]=="Draw"){
        document.getElementById("start").disabled = false;
        document.getElementById("winner").innerHTML="Draw";
        return;
    }
    document.getElementById(lawinline[1]).style="background-color:#aaffff;" ;
    document.getElementById(lawinline[2]).style="background-color:#aaffff;" ;
    document.getElementById(lawinline[3]).style="background-color:#aaffff;" ;
    document.getElementById(lawinline[4]).style="background-color:#aaffff;" ;
    document.getElementById("start").disabled = false;
    document.getElementById("playernumber").value="";
    if (lawinline[0]=="Xwins"){
        document.getElementById("winner").innerHTML=yn.trim()+" wins";
    }else{
        document.getElementById("winner").innerHTML=pa.trim()+" wins";
    }
    
}

///////////////////////////////////////////////////////////////
function testForEnter(e)
{
    if (e.keyCode == 13)
    {
        e.preventDefault()
        e.cancelBubble = true;
        e.returnValue = false;
    }
}





