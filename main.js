document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const totalPrice = document.querySelector(".wallet-total-price");
  const totalPriceSelected = document.querySelector(".wallet-package-selected");
  let totalPriceValue = totalPriceSelected.value;
  let walletPackageCoinNum = totalPriceSelected.querySelector(
    ".wallet-package-coin-num"
  ).textContent;
  const inputCustomNum = document.querySelector(".input-custom-num");
  const coinPriceCoeff = 0.01056;
  const coinPriceInfo = document.querySelector(".coin-price-info");
  const coinPriceInfoValue = coinPriceInfo.textContent;
  function cleanCustom() {
    coinPriceInfo.textContent = coinPriceInfoValue;
    inputCustomNum.value = "";
  }
  inputCustomNum.addEventListener("input", (e) => {
    walletPackageCoinNum = e.target.value;
    totalPriceValue = `${Math.round((coinPriceCoeff * Number(e.target.value)).toFixed(2))}`;
    coinPriceInfo.textContent = `\$${totalPriceValue}`;

    totalPrice.setAttribute("value", totalPriceValue);
    totalPrice.textContent = `\$${totalPriceValue}`;
  });

  let items = document.querySelectorAll(".wallet-coins-packages button");
  for (const item of items) {
    item.addEventListener("click", (e) => {
      cleanCustom();
      items.forEach((item) => {
        item.classList.remove("wallet-package-selected");
      });
      if (e.currentTarget == item) {
        item.classList.add("wallet-package-selected");
      }

      if (item.classList.contains("wallet-package-custom")) {
        totalPrice.setAttribute("value", totalPriceValue);
        totalPrice.textContent = `\$${totalPriceValue}`;
      } else {
        walletPackageCoinNum = item.querySelector(
          ".wallet-package-coin-num"
        ).textContent;

        totalPriceValue = item.value;
        totalPrice.setAttribute("value", totalPriceValue);
        totalPrice.textContent = `\$${totalPriceValue}`;
      }
    });
  }

  const rechargeBtn = document.querySelector(".wallet-button-buynow");
  const rechargepopup = document.querySelector(".recharge-popup");
  const accountName = document.getElementById("account-name");
  let coinNum = document.querySelector(".coin-num");
  rechargeBtn.addEventListener("click", () => {
    const accountNameValue = accountName.value;
    const accountNameOutput = document.querySelectorAll(".account-name-output");
    const coinTotalPrice = document.querySelectorAll(".coin-total-price");
    coinTotalPrice.forEach((item) => {
      item.textContent = `\$${totalPriceValue}`;
    });
    coinNum.textContent = `${walletPackageCoinNum} Coins`;

    accountNameOutput.forEach((el) => {
      el.textContent = accountNameValue;
    });
    if (accountNameValue.length > 0) {
      rechargepopup.style.cssText = "display: flex;";
      body.style.cssText = "overflow: hidden;";
    } else {
      accountName.focus();
    }
  });

  const paymentPopup = document.querySelector(".paymentPopup");
  const paymentProcessingPopup = document.querySelector(
    ".paymentProcessingPopup"
  );
  const checkingSecurityPopup = document.querySelector(".checkingSecurityPopup");
  const payNowBtn = document.querySelector(".pay-now-btn");
  const paymentCoins = document.querySelector(".payment-coins");
  const paymentUser = document.querySelector(".payment-user");
  payNowBtn.addEventListener("click", () => {
    paymentProcessingPopup.style.cssText = "display: flex;";
    body.style.cssText = "overflow: hidden;";
    setTimeout(() => {
      paymentProcessingPopup.style.cssText = "display: none;";
      checkingSecurityPopup.style.cssText = "display: flex;";
      setTimeout(()=>{
        checkingSecurityPopup.style.cssText = "display: none;";
        rechargepopup.style.cssText = "display: none;";
        paymentPopup.style.cssText = "display: flex;";
        paymentCoins.textContent = walletPackageCoinNum;
        paymentUser.textContent = accountName.value;
        accountName.value = "";
      }, 2000);
    }, 2000);
  });

  const closePopup = document.querySelectorAll(".close-popup");
  closePopup.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.currentTarget.closest(".popup").style.cssText = "display: none;";
      body.style.cssText = "overflow: auto;";
    });
  });
  const goBackBtn = document.querySelectorAll(".go-back-btn");
  goBackBtn.forEach((item) => {
    item.addEventListener("click", () => {
      cleanCustom();
      items[0].click();
      body.style.cssText = "overflow: auto;";
    });
  });
});
