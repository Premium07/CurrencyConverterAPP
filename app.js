const baseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  getExchangeRate();
  
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const getExchangeRate = async () => {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  //    console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }

    //  console.log(fromCurr.value, toCurr.value);

  const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  //    console.log(rate);
  let finalAmount = amt.value * rate;
  // console.log(finalAmount);
 
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} .`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchangeRate();

});