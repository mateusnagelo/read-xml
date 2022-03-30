let clean = document.getElementById('btn2');

clean.addEventListener('click', clear)
    function clear(){
        c('load').innerHTML = '';
        c('chave').innerHTML = '';
        c('cnpj').innerHTML = '';
        c('nnf').innerHTML = '';
        c('fantasia').innerHTML = '';
        c('tableItems').innerHTML = '';
        c('btn2').style.display = 'none'; 
        c('btn').style.display = 'block';
        c('tableItems').style.display = 'none';

}





const c = (elem) => {
    return document.getElementById(elem);
}

c('load').innerHTML = 'Dados do fornecedor:'
c('btn2').style.display = 'inline-block';
c('btn').style.display = 'none';

let xml = fetch('nf.json')
    .then(function (response){
        return response.json();
    })
    .then(function (json){
        c('chave').innerHTML = 'Chave de acesso:'+ ' ' + json.chNFe;
        c('cnpj').innerHTML = 'CNPJ:'+ ' ' +json.cnpj;
        c('nnf').innerHTML = 'Número NF:'+ ' ' +json.nnf;
        c('fantasia').innerHTML = 'Nome fantasia:'+ ' ' +json.xfant;
        
    })
    .catch(err => console.log(err))   

    







    const mostrar = async ()=>{
        const req = await fetch("nf.json");
        const xml = await req.json();
        console.log(xml);
    
        
    
        
    }
    