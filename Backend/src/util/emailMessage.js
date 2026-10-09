//menssagem de agendamento enviado por email

export function htmlMessage (userName,barbershop,barbershopAdress,date,hour,service,barber,price){
    return`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de agendamento | BarberApp</title>
    </head>
    <body style="margin:0;padding:0;background-color:#101012;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
    
    <div style="display:none;font-size:1px;color:#101012;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Seu horário foi agendado no BarberApp. Confira os detalhes da sua reserva.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#101012;border-collapse:collapse;">
        <tr>
        <td align="center" style="padding:32px 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;background-color:#18181b;border:1px solid #303034;border-radius:16px;overflow:hidden;">
            <tr>
                <td align="center" style="padding:30px 24px 22px;border-bottom:1px solid #303034;">
                <div style="font-size:23px;line-height:1.3;font-weight:700;letter-spacing:-0.4px;color:#ffffff;">
                    <span style="color:#d9b536;font-size:25px;">✂</span>
                    <span style="vertical-align:2px;"> BarberApp</span>
                </div>
                </td>
            </tr>

            <tr>
                <td style="padding:32px 28px 12px;">
                <p style="margin:0 0 10px;font-size:13px;line-height:1.5;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#d9b536;">
                    Agendamento recebido
                </p>
                <h1 style="margin:0 0 12px;font-size:28px;line-height:1.25;color:#ffffff;font-weight:700;">
                    Olá, ${userName}
                </h1>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#c4c4c8;">
                    Seu horário foi agendado com sucesso. Confira os detalhes abaixo e guarde este e-mail para consultar quando precisar.
                </p>
                </td>
            </tr>

            <tr>
                <td style="padding:20px 28px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0;background-color:#222226;border:1px solid #38383e;border-radius:12px;">
                    <tr>
                    <td style="padding:20px 20px 16px;">
                        <p style="margin:0 0 7px;font-size:12px;line-height:1.4;text-transform:uppercase;letter-spacing:1px;color:#a6a6ad;">Barbearia</p>
                        <p style="margin:0;font-size:19px;line-height:1.4;font-weight:700;color:#ffffff;">${barbershop}</p>
                        <p style="margin:5px 0 0;font-size:13px;line-height:1.6;color:#bdbdc3;">${barbershopAdress}</p>
                    </td>
                    </tr>
                    <tr>
                    <td style="padding:0 20px;"><div style="height:1px;background-color:#3a3a40;font-size:0;line-height:0;">&nbsp;</div></td>
                    </tr>
                    <tr>
                    <td style="padding:18px 20px 20px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                        <tr>
                            <td width="50%" valign="top" style="padding:0 8px 18px 0;">
                            <p style="margin:0 0 6px;font-size:12px;color:#a6a6ad;">📅 Data</p>
                            <p style="margin:0;font-size:16px;line-height:1.5;font-weight:700;color:#ffffff;">${date}</p>
                            </td>
                            <td width="50%" valign="top" style="padding:0 0 18px 8px;">
                            <p style="margin:0 0 6px;font-size:12px;color:#a6a6ad;">🕒 Horário</p>
                            <p style="margin:0;font-size:16px;line-height:1.5;font-weight:700;color:#ffffff;">${hour}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%" valign="top" style="padding:0 8px 0 0;">
                            <p style="margin:0 0 6px;font-size:12px;color:#a6a6ad;">✂ Serviço</p>
                            <p style="margin:0;font-size:15px;line-height:1.5;font-weight:700;color:#ffffff;">${service}</p>
                            </td>
                            <td width="50%" valign="top" style="padding:0 0 0 8px;">
                            <p style="margin:0 0 6px;font-size:12px;color:#a6a6ad;">💈 Profissional</p>
                            <p style="margin:0;font-size:15px;line-height:1.5;font-weight:700;color:#ffffff;">${barber}</p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
                <td style="padding:16px 28px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                    
                    <tr>
                    <td style="padding:0 0 16px;">
                        <p style="margin:0;font-size:13px;line-height:1.7;color:#bdbdc3;">
                        <strong style="color:#ffffff;">Valor do serviço:</strong> ${price}
                        </p>
                    </td>
                    </tr>
                    <tr>
                    <td style="padding:0 0 10px;">
                        <p style="margin:0;font-size:14px;line-height:1.7;color:#c4c4c8;">
                        <strong style="color:#ffffff;">Dica:</strong> chegue alguns minutos antes do horário marcado. Se precisar alterar ou cancelar, entre em contato diretamente com a barbearia.
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
                <td align="center" style="padding:18px 28px 30px;">
                
                <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#8e8e96;">
                    Este é um e-mail automático enviado pelo BarberApp.<br>
                    Em caso de dúvidas, fale com a sua barbearia.
                </p>
                </td>
            </tr>
            </table>

            <p style="max-width:560px;margin:18px 10px 0;font-size:11px;line-height:1.6;text-align:center;color:#777780;">
            © BarberApp · Todos os direitos reservados
            </p>
        </td>
        </tr>
    </table>
    </body>
    </html>
`

}
