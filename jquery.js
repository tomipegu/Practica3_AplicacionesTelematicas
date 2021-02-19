

  /* STOCK INFO HEADER */
  /*===================*/

  //Fetching companies names
    var stocks_info_tickers = [];
    fetch(`http://api.marketstack.com/v1/tickers?access_key=8fd027a82e01df43c4df99b920f27242&symbols=MTS.BMEX,BKT.BMEX,TEF.BMEX,AENA.BMEX,FER.BMEX`, {
      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      stocks_info_tickers= r;
      console.log("Updating Stock Info Tickers");
    })
    .catch(e => {
      console.error("Error " + e)
    })

  //Fetching the value of the stocks for each company
    var stocks_info_data = [];
    var results = [];
    fetch(`http://api.marketstack.com/v1/eod/latest?access_key=8fd027a82e01df43c4df99b920f27242&symbols=MTS.BMEX,BKT.BMEX,TEF.BMEX,AENA.BMEX,FER.BMEX`, {
      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      stocks_info_data= r;
      results = r;
      console.log("Updating Stock Info Data");
      updateStocksInfo();
      updateCompanies();
    })
    .catch(e => {
      console.error("Error " + e)
    })

   //Updating the stocks info header
    function updateStocksInfo(){
      let html = '';
      stocks_info_data['data'].forEach(function(symbol, i){
        let simbolo = symbol;
        stocks_info_tickers['data'].forEach(function(name, i){
          if(simbolo.symbol == name.symbol){
            let growth = ((parseFloat(simbolo.close) - parseFloat(simbolo.open)) / parseFloat(simbolo.open)).toFixed(3);
            console.log(growth);
            html += '<div class ="col-sm stock-header">'
                      + `<p><b class="index-name">${name.name}</b><br><b>${symbol.close} €</b><br><a>${growth} %</a></p>`
                      + `</div>`;
          }
          
        })

    });
    document.getElementById("stock-info-card").innerHTML = html;
  }


/* COMPANIES TABLE ADD */
/*=====================*/

var companies = [];
var company = [];

const addForm = document.getElementById("add-form");
var results = [];

addForm.addEventListener("submit", function(event){
  event.preventDefault();

fetch(`http://api.marketstack.com/v1/eod/latest?access_key=8fd027a82e01df43c4df99b920f27242&symbols=${document.getElementById("add-input").value}`, {

      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      results= r;
      console.log(r)
      if(results.code == 400){
          alert("Simbolo no encontrado");
        }else{
        console.log("Añadiendo simbolo");
        updateCompanies();
        }
    })
    .catch(e => {
      console.error("Error " + e);
    })
    return false;
  })


 function updateCompanies(){

    results['data'].forEach(function(symbol,i){

      company = [symbol.symbol, symbol.open, symbol.close, symbol.volume];
      companies.push(company);
      
    })

    buildTable();
     
}  

function buildTable(){

  let html = '';

  for (var i = 0; i < companies.length; i++){
      html +=
      '<tr>\n' +
                `        <th scope="row">${companies[i][0]}</th>\n` +
                `        <td>${companies[i][1]} </td>\n` +
                `        <td>${companies[i][2]}  </td>\n` +
                `        <td>${companies[i][3]}  </td>\n` +
                `        <td><button onclick="companies.splice(${i},1);buildTable()" type="button" class="btn" style="background-color:transparent width="25" height="25">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/OOjs_UI_icon_close-ltr-destructive.svg/768px-OOjs_UI_icon_close-ltr-destructive.svg.png" width="20" height="20"></button></td>`
                '</tr>';
    }

    document.getElementById("table-content").innerHTML = html;

}

































    









