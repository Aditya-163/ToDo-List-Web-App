
// JS code for handling the toggling!
var buttons = document.getElementsByClassName("toggle");
for(rowEle of buttons)
{
    console.log(rowEle);
    rowEle.getElementsByTagName("td")[1].classList.add(rowEle.id);
    rowEle.getElementsByTagName("input")[0].classList.add(rowEle.id);
    rowEle.getElementsByTagName("input")[0].addEventListener("click",toggleFun);
}
//
document.getElementById("newEntryBtn").addEventListener("click",function()
{
    var entry = document.getElementById("newEntryField").value;
    // First edit in the DB!
    // Only if the edit is successful, change the document.
    if(entry!="")
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                // This is the response of the server!
                console.log(this.responseText);
                if(this.responseText != "notOk") // The response is either a number (a string!)-- i.e. Successfully updated the DB!
                {
                    document.getElementById("listItems").innerHTML += 
                    '<tr class="toggle" id="'+this.responseText+'"><td><input type="button" class="'+this.responseText+'" value="-"></td> <td class="'+this.responseText+' normal">'+entry+'</td></tr>';
                    // Add the event listener!
                    document.getElementById(this.responseText).getElementsByTagName("input")[0].addEventListener("click",toggleFun);
                    //
                    console.log("The HTML element added is: ");
                    console.log('<tr class="toggle" id="'+this.responseText+'"><td><input type="button" class="'+this.responseText+'" value="-"></td> <td class="'+this.responseText+' normal">'+entry+'</td></tr>');
                }
            }
        };
        xhttp.open("POST", "http://localhost:3000/add", true);
        // The below line of code is necessay because we must tell the type of
        // content we are sending!
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        const handleInput = document.getElementById("curHandle").innerText;
        xhttp.send("handle="+handleInput+"&"+"newEntry="+entry);
    }
});

// CallBack functions!
function toggleFun()
{
    var reqId = this.classList[0];
    console.log("The id of the element being changed is: "+reqId);   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText);
            if(this.responseText === "ok") // The response is either "ok"-- i.e. Successfully updated the DB, or "notOK"!
            {
                var element = document.getElementsByClassName(reqId)[1];
                console.log(element);
                if(element.classList.contains("normal"))
                {
                    console.log("Before removal of normal: ");
                    console.log(element.classList);
                    element.classList.remove("normal");
                    element.classList.add("stikeOff");
                    console.log("After removal of normal: ");
                    console.log(element.classList);
                }
                else
                {
                    console.log("Before removal of strikeOff: ");
                    console.log(element.classList);
                    element.classList.remove("stikeOff");
                    element.classList.add("normal");
                    console.log("After removal of strikeOff: ");
                    console.log(element.classList);
                }
            }
        }
    };
    xhttp.open("POST", "http://localhost:3000/toggle", true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    const handleInput = document.getElementById("curHandle").innerText;
    xhttp.send("handle="+handleInput+"&"+"idx="+reqId);
}
//