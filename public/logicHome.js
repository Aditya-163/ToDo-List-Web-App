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
                if(this.responseText === "ok") // The response is either "ok" -- i.e. Successfully updated the DB!
                    document.getElementById("listItems").innerHTML += "<p>"+entry+"</p>";
            }
        };
        xhttp.open("POST", "http://localhost:3000/update", true);
        // The below line of code is necessay because we must tell the type of
        // content we are sending!
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        const handleInput = document.getElementById("curHandle").innerText;
        xhttp.send("handle="+handleInput+"&"+"newEntry="+entry);
    }
});