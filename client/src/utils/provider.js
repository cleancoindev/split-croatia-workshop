import Web3 from "web3";

export default {
  metamask: disableLoading => {
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        try {
          if (typeof window.ethereum.selectedAddress === "undefined") {
            // Request account access if needed
            await window.ethereum.enable();
            window.web3 = new Web3(window.ethereum);
            console.log("Loaded web3 with current provider");
            disableLoading();
          } else {
            window.web3 = new Web3(window.ethereum);
            console.log("Loaded web3 with current provider");
            disableLoading();
          }
        } catch (error) {
          console.log("User denied account access...");
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(Web3.givenProvider);
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    });
  }
};
