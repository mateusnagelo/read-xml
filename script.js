
    const mostrar = async ()=>{
        const req = await fetch("nf.json");
        const xml = await req.json();
        // console.log(xml['xmlItem']);
        document.getElementById('impostos').style.display = 'block';
        const c = (elem) => {
            return document.getElementById(elem);
        }

        c('tableItems').style.display = 'block';
        c('headTab').style.display = 'block';
        c('file').style.display = 'none';

        c('chave').innerHTML = 'Chave de acesso:'+ ' ' + xml.chNFe;
        c('cnpj').innerHTML = 'CNPJ:'+ ' ' +xml.cnpj;
        c('nnf').innerHTML = 'Número NF:'+ ' ' +xml.nnf;
        c('fantasia').innerHTML = 'Nome fantasia:'+ ' ' +xml.xfant;

        document.querySelector('.areaButtons').style.position = 'relative';

        const xmlItems = xml['xmlItem'];
        let html ='<thead class="thead-light"><tr><th scope="col">Item</th><th scope="col">Código</th><th scope="col">Código de barras</th><th scope="col">Descrição</th><th scope="col">Preço Un</th><th scope="col">NCM</th><th scope="col">CEST</th><th scope="col">CFOP</th><th scope="col">CST/CSOSN</th><th scope="col">%ICMS</th><th scope="col">%RED.ICMS</th><th scope="col">%RED.ICMSST</th><th scope="col">PIS/COFINS<br>Venda</th><th scope="col">PIS/COFINS<br>Compra</th><th scope="col">%IPI</th></tr></thead>';

        xmlItems.map(function(item, index){

            // CRIANDO CONDIÇÃO PARA PREENCHER O PIS E COFINS DE COMPRA
            let pisC = '';
        
            if(item.cstPis == "01"){
                pisC = "50";
            }else if(item.cstPis == "06"){
                pisC = "73";
            }else if(item.cstPis == "04"){
                pisC = "70";
            }

            let bcIcms = item.pIcms;
            let bcIcmsInt = parseInt(bcIcms);
    

            let preco = item.preco;
            let precoInt = parseFloat(preco);
            console.log(preco);

            html += '<tr class="linhaTable">';
            html += '<td>' +item.nitem+ '</td>';
            html += '<td>' +item.cProd.replace(/^(0+)(\d)/g,"$2")+ '</td>';
            html += '<td>' +item.cEAN+ '</td>';
            html += '<td>' +item.xprod+ '</td>';
            html += '<td>' +'R$ '+precoInt.toFixed(2)+ '</td>';
            html += '<td>' +item.ncm+ '</td>';
            html += '<td>' +item.cest+ '</td>';
            html += '<td>' +item.cfop+ '</td>';
            html += '<td>' +item.cstCson+ '</td>';
            html += '<td>' +bcIcmsInt+' %'+'</td>';
            html += '<td>' +item.pRedBC+'%'+'</td>';
            html += '<td>' +item.pRedBCST+ '</td>';
            html += '<td>' +item.cstPis+ '</td>';
            // html += '<td>' +item.cstCofins+ '</td>';
            html += '<td>' +pisC+ '</td>';
            html += '<td>' +item.cstIpi+ '</td>';
            html += '</tr>';

            c('tabela').innerHTML = html;
            
         }); 
}

function voltar(){
    document.getElementById('impostos').style.display = 'none';
    document.getElementById('file').style.display;
        if(document.getElementById('file').style.display == 'none'){
            document.getElementById('file').style.display = 'inline-block'
        }

    document.querySelector('.areaButtons').style.position;
        if(document.querySelector('.areaButtons').style.position == 'relative'){
            document.querySelector('.areaButtons').style.position = 'fixed';
        }
}

const c = (elem) => {
    return document.getElementById(elem);
}

function abrirMenu(){
    if(c('linksUteis').style.width == '350px'){
        c('linksUteis').style.width = '0px';
    }else{
        c('linksUteis').style.width = '350px';
    }
}
