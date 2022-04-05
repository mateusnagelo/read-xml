// FAZENDO REQUISICAO NO BACKEND

function mostrar() {

    const inputFile = document.getElementById("file");
    const btnUpload = document.getElementById("btn");
        if(inputFile.value === ''){
            alert('Por favor, selecione um arquivo!')
        }

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        for (const file of inputFile.files) {
            formData.append("file", file)
        }
        xhr.open("post", "http://localhost:3000/notafiscal")
        xhr.send(formData)
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var json = JSON.parse(xhr.responseText);
                const xml = json
                
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

                c('chave').innerHTML = 'Chave de acesso:' + ' ' + xml.chNFe;
                c('cnpj').innerHTML = 'CNPJ:' + ' ' + xml.cnpj;
                c('nnf').innerHTML = 'Número NF:' + ' ' + xml.nnf;
                c('fantasia').innerHTML = 'Razão social:' + ' ' + xml.xnome;
                c('vprod').innerHTML = 'Total dos produtos:'+ ' '+ xml.vProd;
                c('vnf').innerHTML = 'Total NF:'+ ' ' + xml.vNF;
                c('vbc').innerHTML = 'Total BC ICMS:' + ' ' + xml.vBc;
                c('vicms').innerHTML = 'Total valor ICMS:' + ' ' + xml.vIcms;
                c('vbcst').innerHTML = 'Total BC ICMSST:'+ ' ' + xml.vBCST;
                c('vst').innerHTML = 'Total valor ICMSST:'+ ' ' +xml.vST; 
                c('vpis').innerHTML = 'Total PIS:' + ' ' + xml.vPIS;
                c('vcof').innerHTML = 'Total COFINS:' + ' ' + xml.vCOFINS;
                c('vipi').innerHTML = 'Total IPI:'+ ' ' + xml.vIPI;
                c('voutros').innerHTML = 'Total Desp:' + ' ' + xml.vOutro;
                c('vdesc').innerHTML = 'Total Desc:' + ' ' + xml.vDesc;
                c('vfrete').innerHTML = 'Total Frete:' + ' ' + xml.vFrete;

                document.querySelector('.areaButtons').style.position = 'relative';
                document.getElementById('footer').style.position = 'fixed';

                const xmlItems = xml['xmlItem'];
                let html = '<thead class="thead-light"><tr><th scope="col">Item</th><th scope="col">Código de barras</th><th scope="col">Descrição</th><th scope="col">R$ Preço</th><th scope="col">R$ Desc</th><th scope="col">NCM</th><th scope="col">CEST</th><th scope="col">CFOP</th><th scope="col">CST</th><th scope="col">%ICMS</th><th scope="col">%RED.ICMS</th><th scope="col" id="tdNone2">%RED.ICMSST</th><th scope="col">PIS/COFINS<br>Venda</th><th scope="col">PIS/COFINS<br>Compra</th><th scope="col">%IPI</th></tr></thead>';

                xmlItems.map(function (item, index) {

                    // CRIANDO CONDIÇÃO PARA PREENCHER O PIS E COFINS DE COMPRA

                    let pisC = '';

                    if (item.cstPis == "01") {
                        pisC = "50";
                    } else if (item.cstPis == "06") {
                        pisC = "73";
                    } else if (item.cstPis == "04") {
                        pisC = "70";
                    } else if (item.cstPis == "08"){
                        pisC = "***";
                    }

                    let bcIcms = item.pIcms;
                    let bcIcmsInt = parseInt(bcIcms);

                    let codigo = item.cProd.replace(/^(0+)(\d)/g, "$2");

                    let preco = item.preco;
                    let precoInt = parseFloat(preco);

                    
                    let cest = item.cest
                    if(cest === null){
                        cest = "***"
                    }

                    let vDesc = item.vDesc
                    if(vDesc === null){
                        vDesc = "***"
                    }
                    

                    html += '<tr class="linhaTable">';
                    html += '<td>' + item.nitem + '</td>';
                    html += '<td>' + item.cEAN + '</td>';
                    html += '<td>' + item.xprod + '</td>';
                    html += '<td>' + 'R$ ' + precoInt.toFixed(2) + '</td>';
                    html += '<td>' + vDesc + '</td>';
                    html += '<td>' + item.ncm + '</td>';
                    html += '<td>' + cest + '</td>';
                    html += '<td>' + item.cfop + '</td>';
                    html += '<td>' + item.cstCson + '</td>';
                    html += '<td>' + bcIcmsInt + ' %' + '</td>';
                    html += '<td>' + item.pRedBC + '%' + '</td>';
                    html += '<td id="tdNone">' + item.pRedBCST + '</td>';
                    html += '<td>' + item.cstPis +' - '+ item.cstCofins +'</td>';
                    html += '<td>' + pisC +' - '+ pisC +'</td>';
                    html += '<td>' + item.pIpi + '</td>';
                    html += '</tr>';

                    c('tabela').innerHTML = html;
                });
            }
        })
    }
// FUNCTION PARA LIMPAR A TELA E VOLTAR PARA NOVA CONSULTA


function voltar() {
    document.getElementById('impostos').style.display = 'none';
    document.getElementById('file').style.display;
    if (document.getElementById('file').style.display == 'none') {
        document.getElementById('file').style.display = 'inline-block'
    }

    // document.getElementById('btn').style.display;
    // if (document.getElementById('btn').style.display == 'none') {
    //     document.getElementById('btn').style.display = 'inline-block'
    // }
    document.querySelector('.areaButtons').style.position;
    if (document.querySelector('.areaButtons').style.position == 'relative') {
        document.querySelector('.areaButtons').style.position = 'fixed';
    }
    document.getElementById('footer').style.position;
    if (document.getElementById('footer').style.position == 'relative') {
        document.getElementById('footer').style.position = 'absolute';
    }
    document.getElementById('label').style.display;
    if (document.getElementById('label').style.display == 'none') {
        document.getElementById('label').style.display = 'inline-block'
    }
    document.getElementById('small').style.display;
    if (document.getElementById('small').style.display == 'none') {
        document.getElementById('small').style.display = 'inline-block'
    }
    document.getElementById('btn2').style.display;
    if (document.getElementById('btn2').style.display == 'inline-block') {
        document.getElementById('btn2').style.display = 'none'
    }
    document.getElementById('btn3').style.display;
    if (document.getElementById('btn3').style.display == 'inline-block') {
        document.getElementById('btn3').style.display = 'none'
    }

};


// MENU LATERAL - ASIDE

const c = (elem) => {
    return document.getElementById(elem);
}

function abrirMenu() {
    if (c('linksUteis').style.width == '400px') {
        c('linksUteis').style.width = '0px';
    } else {
        c('linksUteis').style.width = '400px';
    }
};

// CONTROLAR BOTAO PARA SCROLLAR PARA CIMA


// FECHAR MENU AO SCROLLAR 

function fecharMenu() {
    if (window.scrollY > 0) {
        c('linksUteis').style.width = '0px';
    }
};

window.addEventListener('scroll', fecharMenu);



function subirTela() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

function ocultarBotao() {
    if (window.scrollY > 300) {
        document.querySelector('.btnToTop').style.display = 'block';
    } else {
        document.querySelector('.btnToTop').style.display = 'none';
    }
};

window.addEventListener('scroll', ocultarBotao);

// AREA MODAL MARKUP


function openModal() {
    let markUp = document.querySelector('#modal')
    markUp.style.display = 'flex';
    markUp.addEventListener('click', (e) => {
        console.log(e.target)
        if (e.target.id == 'modal' || e.target.className == 'closeModal') {
            markUp.style.display = 'none';
        }
    })

    c('linksUteis').style.width = '0px';

};


const reloadBody = c('btn2')
const reloadNav = c('btn3')

reloadBody.addEventListener('click', () => {
    location.reload()
})


reloadNav.addEventListener('click', () => {
    location.reload()
})