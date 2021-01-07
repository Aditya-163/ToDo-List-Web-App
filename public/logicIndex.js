/* Remove this comment to get the previous code!
document.getElementById("signIn").addEventListener("click",function()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      // This is the response of the server!
      console.log(this.responseText);
      //
      if(this.responseText === "ok") // The response is either "ok" -- i.e. Log in is successful!
        console.log("You have logged in!"); // Replace with the actual logic!
      else if(this.responseText === "There seems to be some error! Please try later!") // There seems to be some error on the server!
      {
        document.getElementById("wrongSignIn").innerText = "There seems to be some error! Please try later";
        document.getElementById("wrongSignIn").style.display = "block";
      }
      else // The resposne is "notOk" -- i.e. Either the handle or the password is wrong!
      {
        document.getElementById("wrongSignIn").innerText = "Either the handle or the password is incorrect!";
        document.getElementById("wrongSignIn").style.display = "block";
      }
    }
  };
  xhttp.open("POST", "http://localhost:3000/", true);
  // The below line of code is necessay because we must tell the type of
  // content we are sending!
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  const handleInput = document.getElementById("handle").value;
  const passwordInput = document.getElementById("password").value;
  xhttp.send("handle="+handleInput+"&"+"pw="+passwordInput);
});
*/