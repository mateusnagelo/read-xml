function mostrar() {
    document.getElementById('load').innerHTML = 'Dados do fornecedor:'
    document.getElementById('chave').innerHTML = 'Carregando...';
    document.getElementById('btn2').style.display = 'inline-block'; 
    document.getElementById('btn').style.display = 'none'; 
    fetch('nf.json')
        .then(function (response){
            return response.json();
        })
        
        .then(function (json){
            document.getElementById('chave').innerHTML = 'Chave de acesso:'+ ' ' + json.chNFe;
            document.getElementById('cnpj').innerHTML = 'CNPJ:'+ ' ' +json.cnpj;
            document.getElementById('nnf').innerHTML = 'Número NF:'+ ' ' +json.nnf;
            document.getElementById('fantasia').innerHTML = 'Nome fantasia:'+ ' ' +json.xfant;

            
            console.log(json);
        })
}

let limpar = document.getElementById('btn2')

limpar.addEventListener('click', clear)
    function clear(){
        document.getElementById('load').innerHTML = '';
        document.getElementById('chave').innerHTML = '';
        document.getElementById('cnpj').innerHTML = '';
        document.getElementById('nnf').innerHTML = '';
        document.getElementById('fantasia').innerHTML = '';
        document.getElementById('btn2').style.display = 'none'; 
        document.getElementById('btn').style.display = 'block'; 
    }


