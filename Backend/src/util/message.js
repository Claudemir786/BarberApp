

//menssagem de erro padrão
export function messageError(res,status,message){

    res.status(status).json({success:false, message:message})

}

//messagem de sucesso padrão
export function messageSuccess(res,status,message){

    res.status(status).json({success:true, message:message});
}