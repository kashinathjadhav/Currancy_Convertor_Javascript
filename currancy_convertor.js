const API_BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const currencyDropdowns = document.querySelectorAll(
  ".currency-dropdown select"
);
const exchangeRateButton = document.querySelector("button");
const fromCurrencySelect = document.querySelector(".from select");
const toCurrencySelect = document.querySelector(".to select");
const exchangeRateMessage = document.querySelector(".exchange-rate-msg");

for (let select of currencyDropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlagIcon(evt.target);
  });
}

const updateFlagIcon = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

exchangeRateButton.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amountInput = document.querySelector(".amount input");
  let amountValue = amountInput.value;
  if (amountValue === " " || amountValue < 1) {
    amountValue = 1;
    amountInput.value = "1";
  }
  console.log(amountValue);

  const URL = `${API_BASE_URL}/${fromCurrencySelect.value.toLowerCase()}/${toCurrencySelect.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[toCurrencySelect.value.toLowerCase()];
  let finalRate = rate * amountValue;
  exchangeRateMessage.innerText = `${amountValue} ${fromCurrencySelect.value} = ${finalRate} ${toCurrencySelect.value}`;
  console.log(finalRate);
});
