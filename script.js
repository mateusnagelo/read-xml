
    const mostrar = async ()=>{
        const req = await fetch("nf.json");
        const xml = await req.json();
        // console.log(xml['xmlItem']);

        const c = (elem) => {
            return document.getElementById(elem);
        }

        c('chave').innerHTML = 'Chave de acesso:'+ ' ' + xml.chNFe;
        c('cnpj').innerHTML = 'CNPJ:'+ ' ' +xml.cnpj;
        c('nnf').innerHTML = 'Número NF:'+ ' ' +xml.nnf;
        c('fantasia').innerHTML = 'Nome fantasia:'+ ' ' +xml.xfant;


        const xmlItems = xml['xmlItem'];
        let html ='<thead class="thead-light"><tr><th scope="col">Item</th><th scope="col">Código</th><th scope="col">cEAN</th><th scope="col">Descrição</th><th scope="col">NCM</th><th scope="col">CEST</th><th scope="col">CFOP</th><th scope="col">CST/CSOSN</th><th scope="col">%ICMS</th><th scope="col">%RED.ICMS</th><th scope="col">%RED.ICMSST</th><th scope="col">PIS.Venda</th><th scope="col">COF.Venda</th><th scope="col">PIS.Compra</th><th scope="col">COF.Compra</th><th scope="col">%IPI</th></tr></thead>';

        xmlItems.map(function(item, index){
            html += '<tr>';
            html += '<td>' +item.nitem+ '</td>';
            html += '<td>' +item.cProd+ '</td>';
            html += '<td>' +item.cEAN+ '</td>';
            html += '<td>' +item.xprod+ '</td>';
            html += '<td>' +item.ncm+ '</td>';
            html += '<td>' +item.cest+ '</td>';
            html += '<td>' +item.cfop+ '</td>';
            html += '<td>' +item.cstCson+ '</td>';
            html += '<td>' +item.pIcms+ '</td>';
            html += '<td>' +item.pRedBC+ '</td>';
            html += '<td>' +item.pRedBCST+ '</td>';
            html += '<td>' +item.cstPis+ '</td>';
            html += '<td>' +item.cstCofins+ '</td>';
            html += '<td>' +item.cstIpi+ '</td>';
            html += '</tr>';

            c('tabela').innerHTML = html;
            
         }); 

         console.log(html);
}