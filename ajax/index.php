<?php

$request = (object)$_POST;
$res = [];

if(isset($request->action))
{
	switch (htmlspecialchars($request->action)) {
		case 'modal':
			if(isset($request->type))
			{
				$modal = '../views/modal/' . htmlspecialchars($request->type) .'.php';
				$res['modal'] = file_get_contents($modal);
				$res['time'] = time();
			}
			else
			{
				$res['error'] = 'Error. Wrong data.';
			}
			break;
		case 'send':
			if(isset($request->name, $request->phone, $request->check, $request->time))
			{
				$time = intval($request->time);
				// Bots check. Check must be empty and form fill time > 5 sec
				if( !$request->check && $time && (time() - $time) > 5 )
				{
					$name = htmlspecialchars($request->name);
					$phone = htmlspecialchars($request->phone);
					// Send email
					ob_start();
					include('../views/email/request.php');
					$message = ob_get_clean();
					$subject = 'Заявка с сайта MM.DIGITAL';
					$to = 'kamyshny.mmmedia@gmail.com, a.ceo@mm-media.ru';
					$headers  = 'MIME-Version: 1.0' . "\r\n";
					$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
					$headers .= 'From: MM.DIGITAL <notify@mm.digital>' . "\r\n";

					$res['error'] = mail(
							$to, 
							$subject, 
							$message, 
							$headers
						);
				}
				ob_start();
				include('../views/modal/success.php');
				$res['modal'] = ob_get_clean();
			}
			else
			{
				$res['error'] = 'Error. Wrong data.';
			}
			break;
		
		default:
			$res['error'] = 'Error. Nothing happend.';
			break;
	}
}
else
{
	$res['error'] = 'Error. Nothing happend.';
}

echo json_encode($res);