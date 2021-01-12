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
                    console.log("The HTML element added is: ");
                    console.log('<tr><td><input type="submit" class="toggle" name="idx" value="'+this.responseText+'"></td> <td class="normal">'+entry+'</td></tr>');

                    document.getElementById("listItems").innerHTML += 
                    '<tr><td><input type="submit" class="toggle" name="idx" value="'+this.responseText+'"></td> <td class="normal">'+entry+'</td></tr>';
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

