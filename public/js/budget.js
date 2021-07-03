
  // const dropDown = document.querySelector("#dropdown").value
  // const drpSel = document.querySelector(".dropdwn").value
  const exBtn = document.querySelector(".exbtn")

  const currencyExchange = (event) => {
    event.preventDefault();

    let dropDown =document.querySelector('.dropdwn').selectedOptions[0].value
    console.log(`this is the client side: ${dropDown}`)
    window.location.replace(`/past-trips/1/${dropDown}`);

   }

  exBtn.addEventListener("click",currencyExchange);


