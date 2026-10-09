import nodemailer from "nodemailer";



const transport = nodemailer.createTransport({
    host:process.env.HOST,
    port:process.env.PORT_CONFIG,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});



export async function sendMail(receiver,htmlMessage){

   try {
     await transport.sendMail({
        from:`App Barber<${process.env.EMAIL}>`,
        to:receiver,
        subject:"aviso de agendamento App Barber",
        text:"aviso de agendamento de horário na barbearia",
        html:htmlMessage
    })

    
   } catch (error) {
        console.error("Erro no envio de email: ", error);    
   }
}

