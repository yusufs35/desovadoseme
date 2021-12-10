<?php
	
	$owner_email = $_POST["owner_email"];
	$headers = 'From:' . $_POST["email"];
	$subject = 'A message from your site visitor ' . $_POST["name"];
	$messageBody = "";
	
	if($_POST['name']!='nope'){
		$messageBody .= '<p><b>Ziyaretci:</b> ' . $_POST["name"] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['email']!='nope'){
		$messageBody .= '<p><b>E-posta:</b> ' . $_POST['email'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['phone']!='nope'){		
		$messageBody .= '<p><b>Telefon:</b>  ' . $_POST['phone'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}	
	if($_POST['message']!='nope'){
		$messageBody .= '<p><b>Mesaj:</b>  ' . $_POST['message'] . '</p>' . "\n";
	}
	
	if($_POST["stripHTML"] == 'true'){
		$messageBody = strip_tags($messageBody,"<p></p><b></b>");
	}
	
	require("class.phpmailer.php");
 
	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8'; 
	$mail->IsSMTP(); // Mailimizin SMTP ile gönderileceğini belirtiyoruz
	$mail->From     = $_POST["email"]; //Gönderen kısmında yer alacak e-mail adresi
	$mail->Sender   = "xxxxxxxx";
	$mail->FromName = $_POST["name"];
	$mail->Host     = "xxxxxxx"; //SMTP server adresi
	$mail->SMTPAuth = true; //SMTP server'a kullanıcı adı ile bağlanılcağını belirtiyoruz
	$mail->Username = "xxxxxxx"; //SMTP kullanıcı adı
	$mail->Password = "xxxxxxxxx"; //SMTP şifre
	$mail->WordWrap = 50;
	$mail->Subject  = "desovadoseme irtibat formu"; // Konu
	 
	//Mailimizin HTML formatında hazırlanacağını bildiriyoruz.
	$mail->IsHTML(true);
	 
	 
	$mail->Body = $messageBody;
	$mail->AddAddress("xxxxxxxxx");

	
	try{
		if($mail->Send()){
			echo 'mail sent';
		}else{
			throw new Exception('mail failed');
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>