
  const dropDown = document.querySelector("#dropdown").value
  const exBtn = document.querySelector(".exbtn")

  const currencyExchange = (e) => {
    e.preventDefault();
    console.log(dropDown)
    window.location.replace(`/past-trips/1/CAD/${dropDown}`);
   }

  exBtn.addEventListener("click",currencyExchange);
