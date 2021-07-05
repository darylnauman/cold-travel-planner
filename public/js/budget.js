const userID = document.querySelector('#userId').dataset.id;
  // const dropDown = document.querySelector("#dropdown").value
  // const drpSel = document.querySelector(".dropdwn").value
  const exBtn = document.querySelector(".exbtn")

  let pageURL = window.location.href;
  // var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('trips/') + 1);
console.log("user id",userID)

  const currencyExchange = (event) => {
    event.preventDefault();

    let dropDown =document.querySelector('.dropdwn').selectedOptions[0].value
    console.log(`this is the client side: ${dropDown}`)
    window.location.replace(`/trips/${userID}/${dropDown}`);

   }

  exBtn.addEventListener("click",currencyExchange);


