<html>
<head>
<link rel="stylesheet" type="text/css" href="cssFile.css?update=142263677333">

</head>
<body>
<?php
   include('dbConnect.php');
   session_start();
?>
<?php
if(isset($_POST['Pause']))
{
	$conn=connectDataBase();
	$SensorID= $_POST['Pause'];
	date_default_timezone_set("America/Los_Angeles");
	$currentDate= date("Y-m-d H:i:s");
	$datetime1 = strtotime($currentDate);

	$sql = "Select * from sensor where SensorID='$SensorID'";
	$result = mysql_query( $sql,$conn);
	while($row = mysql_fetch_array($result)) {
		$StartPauseTime=$row['StartPauseTime'];
		$UsedHours=$row['UsedHours'];
	}
	$datetime2 = strtotime($StartPauseTime);

	$diffSeconds= $datetime1-$datetime2;
	$UsedHours=$UsedHours+($diffSeconds/3600);
	
	
	$sql = "UPDATE sensor
        SET SensorStatus='Paused',StartPauseTime='$currentDate',UsedHours='$UsedHours'
        WHERE SensorID=$SensorID";
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not update data: ' . mysql_error());
	}

}

if(isset($_POST['Start']))
{
	$conn=connectDataBase();
	$SensorID= $_POST['Start'];
	date_default_timezone_set("America/Los_Angeles");
	$currentDate= date("Y-m-d H:i:s");
	$datetime1 = strtotime($currentDate);

	$sql = "Select * from sensor where SensorID='$SensorID'";
	$result = mysql_query( $sql,$conn);
	while($row = mysql_fetch_array($result)) {
		$StartPauseTime=$row['StartPauseTime'];
		$PausedHours=$row['PausedHours'];
	}
	$datetime2 = strtotime($StartPauseTime);

	$diffSeconds= $datetime1-$datetime2;
	$PausedHours=$PausedHours+($diffSeconds/3600);
		
	$sql = "UPDATE sensor
        SET SensorStatus='Running',StartPauseTime='$currentDate',PausedHours='$PausedHours'
        WHERE SensorID=$SensorID";
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not update data: ' . mysql_error());
	}

}

if(isset($_POST['Stop']))
{
	$conn=connectDataBase();
	$SensorID= $_POST['Stop'];
	date_default_timezone_set("America/Los_Angeles");
	$currentDate= date("Y-m-d H:i:s");
	$datetime1 = strtotime($currentDate);

	$sql = "Select * from sensor where SensorID='$SensorID'";
	$result = mysql_query( $sql,$conn);
	while($row = mysql_fetch_array($result)) {
		$SensorStatus=$row['SensorStatus'];
		$StartPauseTime=$row['StartPauseTime'];
		$PausedHours=$row['PausedHours'];
		$UsedHours=$row['UsedHours'];
	}
	$datetime2 = strtotime($StartPauseTime);
	$diffSeconds= $datetime1-$datetime2;
	$PausedHours=$PausedHours+($diffSeconds/3600);
	
	if($SensorStatus =="Paused")
		$q="PausedHours='$PausedHours'";
	else
		$q="UsedHours='$UsedHours'";
		
	$sql = "UPDATE sensor
        SET SensorStatus='Stopped',StartPauseTime='$currentDate',$q
        WHERE SensorID=$SensorID";
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not update data: ' . mysql_error());
	}

}
?>
<div class='mainDiv' style='width:1180px'>
<center>
<div style='color:#2a2a2a;font-size:16px!important;'>welcome <?php echo $accountID;?><b> <a href='logout.php' style='color:#0e455f;text-decoration:none;'>Log Out</a></b></center></div> 
	<form method='POST'>
		<table cellpadding=10 id='table_result'>
		<tr><th>Sensor Name</th><th>Sensor Type</th><th>Latitude</th><th>Longitude</th><th>Creation Date</th><th>Sensor Tag Key</th><th>Sensor Tag Value</th><th>Status</th><th>Action</th></tr>
			<?php
				$conn=connectDataBase();
				$sql = "Select * from sensor where AccountID='$accountID'";
				$result = mysql_query( $sql);
				while($row = mysql_fetch_array($result)) {
					$SensorID=$row['SensorID'];
					$SensorName=$row['SensorName'];
					$TypeOfSensor=$row['TypeOfSensor'];
					$Latitude=$row['Latitude'];
					$Longitude=$row['Longitude'];
					$CreationDate=$row['CreationDate'];
					$SensorStatus=$row['SensorStatus'];
					$SensorTagKey=$row['SensorTagKey'];
					$SensorTagValue=$row['SensorTagValue'];
					echo "<tr><td>$SensorName</td>
					<td>$TypeOfSensor</td>
					<td>$Latitude</td>
					<td>$Longitude</td>
					<td>$CreationDate</td>
					<td>$SensorTagKey</td>
					<td>$SensorTagValue</td>
					<td class='$SensorStatus color_td'><div>$SensorStatus</div></td>";
					if($SensorStatus == "Running")
					{
						echo "<td width=150><button class='btn2' name='Pause' value='$SensorID'>Pause</button>&nbsp;	";
						echo "<button class='btn2' name='Stop' value='$SensorID'>Stop</button>	</td>";
					}
					else if($SensorStatus == "Paused")
					{
						echo "<td width=150><button  class='btn2' name='Start' value='$SensorID'>Start</button>&nbsp;	";
						echo "<button name='Stop' class='btn2' value='$SensorID'>Stop</button>	</td>";
					}
					else
					{
						echo "<td></td>";
					}
					echo "</tr>";
				}
			?>
		</table>
	</form>
	</center>
</div>
	

</body>
</html>
