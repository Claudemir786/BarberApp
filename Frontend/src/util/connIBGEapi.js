


export  async function getStates(){
    try {
        
        const result = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

        if(!result.ok)throw new Error("os dados não retornaram")
        const states = await result.json();
        console.log("Estados: ",states )
        return states;
        
    } catch (error) {
        console.error("falha ao buscar dados do IBGE: ",error);
        return false
    }
}

export async function getCities(state){
    try {
        console.log("estado enviado: ", state)
        const searchCities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)

        if(!searchCities.ok)throw new Error("dados não retornaram corretamente da API do IBGE");

        const cities = await searchCities.json();
        console.log("cidades: ", cities)
        return cities;
        
    } catch (error) {
        console.error("falha ao buscar cidades: ", error.message);
        return false;
    }

}