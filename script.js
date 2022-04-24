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
                c('btnExport').style.display = 'inline-block';

                c('chave').innerHTML = 'Chave de acesso:'+' '+'<span class="bgLineCabecalho">'+xml.chNFe+'</span>'
                c('cnpj').innerHTML = 'CNPJ:'+' '+'<span class="bgLineCabecalho">'+xml.cnpj+'</span>'
                c('nnf').innerHTML = 'Número NF:'+' '+'<span class="bgLineCabecalho">'+xml.nnf+'</span>'
                c('fantasia').innerHTML = 'Razão social:'+' '+'<span class="bgLineCabecalho">'+xml.xnome+'</span>'
                c('vprod').innerHTML = 'Total dos produtos:'+' '+'<span class="bgLineCabecalho">'+xml.vProd+'</span>'
                c('vnf').innerHTML = 'Total NF:'+' '+'<span class="bgLineCabecalho">'+xml.vNF+'</span>'
                c('vbc').innerHTML = 'Total BC ICMS:'+' '+'<span class="bgLineCabecalho">'+xml.vBc+'</span>'
                c('vicms').innerHTML = 'Total valor ICMS:'+' '+'<span class="bgLineCabecalho">'+ xml.vIcms+'</span>'
                c('vbcst').innerHTML = 'Total BC ICMSST:'+' '+'<span class="bgLineCabecalho">'+ xml.vBCST+'</span>'
                c('vst').innerHTML = 'Total valor ICMSST:'+' '+'<span class="bgLineCabecalho">'+xml.vST+'</span>'
                c('vpis').innerHTML = 'Total PIS:'+' ' + '<span class="bgLineCabecalho">'+xml.vPIS+'</span>'
                c('vcof').innerHTML = 'Total COFINS:'+' '+'<span class="bgLineCabecalho">'+xml.vCOFINS+'</span>'
                c('vipi').innerHTML = 'Total IPI:'+' '+'<span class="bgLineCabecalho">'+xml.vIPI+'</span>'
                c('voutros').innerHTML = 'Total Desp:'+' '+'<span class="bgLineCabecalho">'+xml.vOutro+'</span>'
                c('vdesc').innerHTML = 'Total Desc:'+' '+'<span class="bgLineCabecalho">'+xml.vDesc+'</span>'
                c('vfrete').innerHTML = 'Total Frete:'+' '+'<span class="bgLineCabecalho">'+xml.vFrete+'</span>'
                c('vfcp').innerHTML = 'Valor FCP:'+' '+'<span class="bgLineCabecalho">'+xml.vFCP+'</span>'


                document.querySelector('.areaButtons').style.position = 'relative';
                document.getElementById('footer').style.position = 'fixed';

                const xmlItems = xml['xmlItem'];
                let html = '<thead class="thead-light"><tr class="linhaTable"><th scope="col">Item</th><th scope="col">Descricao</th><th scope="col">Qtd</th><th scope="col">Und</th><th scope="col">R$Total</th><th scope="col">R$ Desc</th><th scope="col">NCM</th><th scope="col">CEST</th><th scope="col">CFOP</th><th scope="col">CST</th><th scope="col">pICMS</th><th scope="col">vICMS</th><th scope="col">rICMS</th><th scope="col">pICMSST</th><th scope="col">vICMSST</th><th scope="col">PIS|COF<br>Venda</th><th scope="col">PIS|COF<br>Compra</th><th scope="col">R$IPI</th><th scope="col">%IPI</th><th scope="col">%FCP</th><th scope="col">R$FCP</th><th scope="col">ICMS</br>Deson</th></tr></thead>';

                xmlItems.map(function (item, index) {

                    // CRIANDO CONDIÇÃO PARA PREENCHER O PIS E COFINS DE COMPRA

                    let pisC = '';

                    if (item.cstPis == "01") {
                        pisC = "50"
                    } else if (item.cstPis == "06") {
                        pisC = "73"
                    } else if (item.cstPis == "04") {
                        pisC = "70"
                    } else if (item.cstPis == "08"){
                        pisC = "***"
                    } else if (item.cstPis == "02"){
                        pisC = "***"
                    } else if (item.cstPis == "99"){
                        pisC = "***"
                    }

                    let bcIcms = item.pICMS;
                    let bcIcmsInt = parseInt(bcIcms);

                    let codigo = item.cProd.replace(/^(0+)(\d)/g, "$2");

                    let preco = item.total;
                    let precoInt = parseFloat(preco);

                    let ipi = item.vIpi
                    let ipiFloat = parseFloat(ipi)
                    
                    let pIpiItem = item.pIpi
                    if(pIpiItem === '0.0000'){
                        pIpiItem = '0.00'
                    }

                    let qdt = item.quantidade
                    let qdtInt = parseInt(qdt).toFixed(0)
            

                    let icmsSt = item.pRedBCST
                    icmsStFloa = parseFloat(icmsSt)

                    let redIcms = item.pRedBC
                    redIcms = parseFloat(redIcms)

                    let percentFCP = item.pFCP 
                        if(percentFCP === null || percentFCP == '0.0000'){
                            percentFCP = '0.00'
                        }

                    let valueFCP = item.vFCP
                        if(valueFCP === null || valueFCP == '0.0000'){
                            valueFCP = '0.00'
                        }

                    let cest = item.cest
                    if(cest === null){
                        cest = ''
                    }

                    let vDesc = item.vDesc
                    if(vDesc === null){
                        vDesc = '0.00'
                    }
                    
                    let vIcms = item.vICMS
                    vIcmsFloat = parseFloat(vIcms)

                    if (item.vICMSDeson === null){
                        item.vICMSDeson = '0.00'
                     }else if(item.vICMSDeson == '0.0000'){
                        item.vICMSDeson = '0.00'
                     }

                    let pIcmsSt = item.pICMSST
                    icmsStFloat = parseFloat(pIcmsSt)

                    let vIcmsSt = item.vICMSST
                    vIcmsStFloat = parseFloat(vIcmsSt)
                    
                    html += '<tr class="linhaTable">';
                    html += '<td>' + item.nitem + '</td>';
                    html += '<td>' + item.xprod + '</td>';
                    html += '<td>' + qdtInt +'</td>'
                    html += '<td>' + item.unidade +'</td>'
                    html += '<td>' + precoInt.toFixed(2) + '</td>';
                    html += '<td>' + vDesc + '</td>';
                    html += '<td>' + item.ncm + '</td>';
                    html += '<td>' + cest + '</td>';
                    html += '<td>' + item.cfop + '</td>';
                    html += '<td>' + item.cstCson + '</td>';
                    html += '<td>' + bcIcmsInt + ' %' + '</td>';
                    html += '<td>' + vIcmsFloat.toFixed(2) + '</td>';
                    html += '<td>' + redIcms + '%' + '</td>';
                    html += '<td>' + icmsStFloat.toFixed(0) + '%' +'</td>';
                    html += '<td>' +vIcmsStFloat.toFixed(2) +'</td>';
                    html += '<td>' + item.cstPis +' | '+ item.cstCofins +'</td>';
                    html += '<td>' + pisC +' | '+ pisC +'</td>';
                    html += '<td>' +ipiFloat.toFixed(2)+ '</td>';
                    html += '<td>' +pIpiItem+ '</td>';
                    html += '<td>' + percentFCP + '</td>';
                    html += '<td>' + valueFCP + '</td>';
                    html += '<td>' + item.vICMSDeson+'</td>';
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

function fecharMenu(e) {
    if (window.scrollY > 0) {
        c('linksUteis').style.width = '0px';
    }
};

window.addEventListener('scroll', fecharMenu);

c('linksUteis').addEventListener('click', (e) =>{
    console.log(e.target)
    if(e.target.id != 'linksUteis' || e.target.id == 'inputArea'){
        c('linksUteis').style.width = '0px'
    }
})


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

// RELOADA NA PAGINA 

const reloadBody = c('btn2')
const reloadNav = c('btn3')
const reloadModal = c('fecharModal')

reloadBody.addEventListener('click', () => {
    location.reload()
})


reloadNav.addEventListener('click', () => {
    location.reload()
})

reloadModal.addEventListener('click', () => {
    location.reload()
})
// EXPORTAR EXCEL 

const tableRows = document.getElementsByClassName('linhaTable')
const exportBtn = document.querySelector('[data-js="export-table-btn"]')

exportBtn.addEventListener('click', () => {
    const CSVString = Array.from(tableRows)
    .map( row => Array.from(row.cells)
        .map(cell => cell.textContent)
        .join(',')
        )
        .join('\n')

        exportBtn.setAttribute('href', 
        `data:text/csvcharset=UTF-8,${encodeURIComponent(CSVString)}`)
        exportBtn.setAttribute('download', 'table.csv')
})

// MOSTRAR LOG DAS NOTAS JÁ CONSULTADAS

const qSel = (elem) => document.querySelector(elem)

document.querySelector('.logXml').addEventListener('click', async () => {

    qSel('.modal--hisotoricoArea').style.display = 'block'

    let urlList = 'http://localhost:3000/lista'
    let resultList = await fetch(urlList)
    let jsonList = await resultList.json()
    
    jsonList.map((item) => {

        let logList = document.querySelector('.modal--historico--content').innerHTML = `<strong>Chave de acesso e data da consulta:</strong> ${item.xml +' - '+ item.dateUpload}`
        let listArea = qSel('.modal--historico--contents')
        let cloneList = listArea.children[0].cloneNode(true)
        listArea.appendChild(cloneList)

            if(logList.innerHTML === ''){
                qSel('.imgEmpty').style.display = 'flex'
            }
        document.querySelector('.modal--historico--content').innerHTML = ''
        
    })
})
const closeModal = qSel('.closeModalHistorico').addEventListener('click', () => {
    qSel('.modal--hisotoricoArea').style.display = 'none'
})
qSel('#modalHistorico').addEventListener('click', (e) => {
    if(e.target.id == 'modalHistorico'){
        qSel('.modal--hisotoricoArea').style.display = 'none'
        location.reload()
    }
})
