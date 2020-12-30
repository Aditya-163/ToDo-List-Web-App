document.getElementById("signUp").addEventListener("click",function()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      // This is the response of the server!
      console.log(this.responseText);
      //
      if(this.responseText === "Successfully signed up!")
      {
        document.getElementById("wrongSignUp").innerText = "SignUp is successful! You can signIn!";
        document.getElementById("wrongSignUp").style.color = "blue";
        document.getElementById("wrongSignUp").style.display = "block";
      }
      else if(this.responseText === "There seems to be some error! Please try later!") // There seems to be some error on the server!
      {
        document.getElementById("wrongSignUp").innerText = "There seems to be some error! Please try later";
        document.getElementById("wrongSignUp").style.display = "block";
      }
      else if(this.responseText === "This handle already exists!")
      {
        document.getElementById("wrongSignUp").innerText = "This handle already exists!";
        document.getElementById("wrongSignUp").style.display = "block";
      }
    }
  };
  xhttp.open("POST", "http://localhost:3000/signUp", true);
  // The below line of code is necessay because we must tell the type of
  // content we are sending!
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  const nameInput = document.getElementById("name").value;
  const passwordInput = document.getElementById("pw").value;
  const handleInput = document.getElementById("handle").value;
  xhttp.send("name="+nameInput+"&"+"pw="+passwordInput+"&"+"handle="+handleInput);
});
