<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

// Obter dados do formulário
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Verifique o captcha
$secret = ''; //insira a sua senha aqui 
$response = $_POST['h-captcha-response'];

$verify = file_get_contents("https://hcaptcha.com/siteverify?secret=$secret&response=$response");
$responseKeys = json_decode($verify, true);

if (intval($responseKeys["success"]) !== 1) {
    echo 'Por favor, complete o captcha.';
    exit;
}

// Cria uma nova instância do PHPMailer
$mail = new PHPMailer(true);

try {
   // Configurações do servidor
   $mail->isSMTP();                                           // Define que usará SMTP
   $mail->Host       = '';                    // Define o servidor SMTP
   $mail->SMTPAuth   = true;                                // Ativa a autenticação SMTP
   $mail->Username   = '';               // Seu email
   $mail->Password   = '';                         // Sua senha
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     // Ativa a criptografia TLS
   $mail->Port       = ;                                 // Porta TCP para se conectar

   // Destinatários
   $mail->setFrom('youremail@email.com', 'Mandou mensagem no site!');
   $mail->addAddress('email@email.com', 'Nome do Destinatário'); 

    // Conteúdo do email
    $mail->isHTML(true);                                     // Define que o email será em HTML
    $mail->Subject = 'Nova mensagem de contato';
    $mail->Body    = "Nome: $name<br>E-mail: $email<br>Mensagem: $message";
    
    // Envia o email
    $mail->send();
    echo 'Mensagem enviada com sucesso!';
    if ($mail->send()) {
        header("Location: contato.html?success=1"); // Altere 'form_page.php' para o nome real da sua página do formulário
        exit;
    }
} catch (Exception $e) {
    echo "Falha ao enviar o e-mail. Mailer Error: {$mail->ErrorInfo}";
}
?>
