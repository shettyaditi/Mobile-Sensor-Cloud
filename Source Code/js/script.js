function validateSensor()
{
	var latitude=document.getElementById("latitude").value;
	var longitude=document.getElementById("longitude").value;
	if(LatLon(latitude+","+longitude))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validateSpace(id){
	var val=document.getElementById(id).value;
	if(val == "" || val == null)
	{
		//document.getElementById(id).style.border="1px solid red";
		document.getElementById(id+"_error").innerHTML="You can't leave this empty.";
	}
	else
	{
		//document.getElementById(id).style.border="1px solid #ddd";
		document.getElementById(id+"_error").innerHTML="";
	}
}

function validateAllUser()
{
	if(emailValidation && expiryDateValidation() && mobileValidation() && zipCodeValidation() && cardValidation() && cvvValidation())
		return true;
	else
		return false;
}

function validateAccountID(id)
{
	var accountID=document.getElementById("accountID").value;
	if(accountID !== "")
	{
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("accountID_error").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", "ajaxPage.php?accountID=" + accountID, true);
        xmlhttp.send();
	}
	else
	{
		validateSpace(id);
	}
}

function validateSensorTagKey(id)
{
	var tagKey=document.getElementById(id).value;
	if(tagKey !== "")
	{
	
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(id+"_error").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", "ajaxPage.php?tagKey=" + tagKey, true);
        xmlhttp.send();
	}
	else
		document.getElementById(id+"_error").innerHTML = "";
	
}

function latlonSelect()
{
	document.getElementById("mapOuter").style.display="block";
	var latlng = new google.maps.LatLng(51.4975941, -0.0803232);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Set lat/lon values for this property',
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function(a) {
		document.getElementById("latitude").value=a.latLng.lat().toFixed(4);
		document.getElementById("longitude").value=a.latLng.lng().toFixed(4);
		document.getElementById("mapOuter").style.display="none";
		document.getElementById("latitude_error").innerHTML="";
		document.getElementById("longitude_error").innerHTML="";
       /* console.log(a);
        var div = document.createElement('div');
        div.innerHTML = a.latLng.lat().toFixed(4) + ', ' + a.latLng.lng().toFixed(4);
        document.getElementsByTagName('body')[0].appendChild(div);*/
    });
}

function LatLon(val)
{
	var lngVal = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (!lngVal.test(val)) {
       document.getElementById("latitude_error").innerHTML="Invalid Latitude or Longitude";
	   document.getElementById("latitude").style.border="1px solid red";
	   document.getElementById("longitude").style.border="1px solid red";
	   return false;
    }
	else
	{
		document.getElementById("latitude_error").innerHTML="";
		document.getElementById("latitude").style.border="1px solid #C8C8C8";
	   document.getElementById("longitude").style.border="1px solid #C8C8C8";
		return true;
	}
}

function emailValidation(id){
	var emailValue=document.getElementById("emailID").value;
	if(emailValue !== "")
	{
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))  
		{  
			document.getElementById("emailID_error").innerHTML="";
			return (true)  
		}  
		document.getElementById("emailID_error").innerHTML="Invalid email address!";  
		return (false) 
	}		
	else
	{
		validateSpace(id);
	}
}


function mobileValidation(id){
	var phoneNumberValue=document.getElementById("phoneNumber").value;
	if(phoneNumberValue !== "")
	{
		var phoneno = /^\d{10}$/;  
		if(phoneNumberValue.match(phoneno))  
		{  
			document.getElementById("phoneNumber_error").innerHTML="";
			return true;  
		}  
		else  
		{  
			document.getElementById("phoneNumber_error").innerHTML="Invalid Mobile Number!"; 
			return false;  
		}  
	}		
	else
	{
		validateSpace(id);
	}
}

function zipCodeValidation(id){
	var zipCodeValue=document.getElementById("zipCode").value;
	if(zipCodeValue !== "")
	{
		var zipCode = /^\d{5}$/;  
		if(zipCodeValue.match(zipCode))  
		{  
			document.getElementById("zipCode_error").innerHTML="";
			return true;  
		}  
		else  
		{  
			document.getElementById("zipCode_error").innerHTML="Invalid ZipCode!"; 
			return false;  
		} 
	}
	else
	{
		validateSpace(id);
	}
}

function cardValidation(id){
	var cardNumberValue=document.getElementById("creditCardNumber").value;
	if(cardNumberValue !== "")
	{
		var cardno =  /^\d{16}$/; 
		if(cardNumberValue.match(cardno))  
		{  
			document.getElementById("creditCardNumber_error").innerHTML="";
			return true;  
		}  
		else  
		{  
			document.getElementById("creditCardNumber_error").innerHTML="Invalid Card Number!"; 
			return false;  
		}  
	}
	else
	{
		validateSpace(id);
	}
	
}

function cvvValidation(id){
	var cvvValue=document.getElementById("cvv").value;
	if(cvvValue !== "")
	{
		var cardno =  /^\d{3}$/; 
		if(cvvValue.match(cardno))  
		{  
			document.getElementById("cvv_error").innerHTML="";
			return true;  
		}  
		else  
		{  
			document.getElementById("cvv_error").innerHTML="Invalid CVV!"; 
			return false;  
		}  
	}
	else
	{
		validateSpace(id);
	}
}

function expiryDateValidation(id)
{
	var errMsg="";
	var expire = document.getElementById("expiryDate").value;
	if(expire !== "")
	{
		if(!expire.match(/(0[1-9]|1[0-2])[/][0-9]{2}/)){
		  errMsg += "Please enter value in MM/YY format!\n";
		  result = false;
		} else {
		  // get current year and month
		  var d = new Date();
		  var currentYear = d.getFullYear();
		  var currentMonth = d.getMonth() + 1;
		  // get parts of the expiration date
		  var parts = expire.split('/');
		  var year = parseInt(parts[1], 10) + 2000;
		  var month = parseInt(parts[0], 10);
		  // compare the dates
		  if (year < currentYear || (year == currentYear && month < currentMonth)) {
			errMsg += "The expiry date has passed.\n";
			result = false;
		  }
		  else
			  result=true;
		}
		if(result == false)
			document.getElementById("expiryDate_error").innerHTML=errMsg;
		else
			document.getElementById("expiryDate_error").innerHTML="";
		return result;
	}
	else
	{
		validateSpace(id);
	}
}