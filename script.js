// FAZER REQUISICAO DO JSON  MOSTRAR NA TELA COMO TABELA

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
        c('btn').style.display = 'none';
        c('label').style.display = 'none';
        c('small').style.display = 'none';
        c('linksUteis').style.width = '0px';
        c('btn2').style.display = 'inline-block';
        c('btn3').style.display = 'inline-block';

        c('chave').innerHTML = 'Chave de acesso:'+ ' ' + xml.chNFe;
        c('cnpj').innerHTML = 'CNPJ:'+ ' ' +xml.cnpj;
        c('nnf').innerHTML = 'Número NF:'+ ' ' +xml.nnf;
        c('fantasia').innerHTML = 'Nome fantasia:'+ ' ' +xml.xfant;

        
        document.querySelector('.areaButtons').style.position = 'relative';
        document.getElementById('footer').style.position = 'relative';

        const xmlItems = xml['xmlItem'];
        let html ='<thead class="thead-light"><tr><th scope="col">Item</th><th scope="col">Código</th><th scope="col">Código de barras</th><th scope="col">Descrição</th><th scope="col">Preço Un</th><th scope="col">NCM</th><th scope="col">CEST</th><th scope="col">CFOP</th><th scope="col">CST</th><th scope="col">%ICMS</th><th scope="col">%RED.ICMS</th><th scope="col">%RED.ICMSST</th><th scope="col">PIS/COFINS<br>Venda</th><th scope="col">PIS/COFINS<br>Compra</th><th scope="col">%IPI</th></tr></thead>';

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
            
            let codigo = item.cProd.replace(/^(0+)(\d)/g,"$2");

            let preco = item.preco;
            let precoInt = parseFloat(preco);
            

            html += '<tr class="linhaTable">';
            html += '<td>' +item.nitem+ '</td>';
            html += '<td>' +codigo+ '</td>';
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
};

// FUNCTION PARA LIMPAR A TELA E VOLTAR PARA NOVA CONSULTA


function voltar(){
    document.getElementById('impostos').style.display = 'none';
    document.getElementById('file').style.display;
        if(document.getElementById('file').style.display == 'none'){
            document.getElementById('file').style.display = 'inline-block'
        }

    document.getElementById('btn').style.display;
        if(document.getElementById('btn').style.display == 'none'){
            document.getElementById('btn').style.display = 'inline-block'
        }
    document.querySelector('.areaButtons').style.position;
        if(document.querySelector('.areaButtons').style.position == 'relative'){
            document.querySelector('.areaButtons').style.position = 'fixed';
        }
    document.getElementById('footer').style.position;
        if(document.getElementById('footer').style.position == 'relative'){
            document.getElementById('footer').style.position = 'absolute';
        }
    document.getElementById('label').style.display;
        if(document.getElementById('label').style.display == 'none'){
            document.getElementById('label').style.display = 'inline-block'
        }
    document.getElementById('small').style.display;
        if(document.getElementById('small').style.display == 'none'){
            document.getElementById('small').style.display = 'inline-block'
        }
    document.getElementById('btn2').style.display;
        if(document.getElementById('btn2').style.display == 'inline-block'){
            document.getElementById('btn2').style.display = 'none'
        }
    document.getElementById('btn3').style.display;
        if(document.getElementById('btn3').style.display == 'inline-block'){
            document.getElementById('btn3').style.display = 'none'
        }

};


// MENU LATERAL - ASIDE

const c = (elem) => {
    return document.getElementById(elem);
}

function abrirMenu(){
    if(c('linksUteis').style.width == '400px'){
        c('linksUteis').style.width = '0px';
    }else{
        c('linksUteis').style.width = '400px';
    }
};

// CONTROLAR BOTAO PARA SCROLLAR PARA CIMA


// FECHAR MENU AO SCROLLAR 

function fecharMenu(){
    if(window.scrollY > 0){
        c('linksUteis').style.width = '0px';
    }
};

window.addEventListener('scroll', fecharMenu);



function subirTela(){
    window.scrollTo({
        top: 0,
        behavior:'smooth'
    });
};

function ocultarBotao(){
    if(window.scrollY > 300){
        document.querySelector('.btnToTop').style.display = 'block';
    }else{
        document.querySelector('.btnToTop').style.display = 'none';
    }
};

window.addEventListener('scroll', ocultarBotao);


