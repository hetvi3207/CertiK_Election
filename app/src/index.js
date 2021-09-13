import Web3 from "web3";
import votingArtifact from "../../build/contracts/Voting.json";
import $ from 'jquery';

let candidates = {"Candidate 1": "candidate-1", "Candidate 2": "candidate-2", "Candidate 3": "candidate-3"}

const App = {
  web3: null,
  account: null,
  voting: null,

  start: async function() {
    const { web3 } = this;

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = votingArtifact.networks[networkId];
      this.voting = new web3.eth.Contract(
        votingArtifact.abi,
        deployedNetwork.address,
      );
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.loadCandidatesAndVotes();
    } catch (error) {
      console.error(error);
    }
  },

  loadCandidatesAndVotes: async function() {
    const { totalVotesFor } = this.voting.methods;
    let candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
      $("#" + candidates[name]).html(count);
    }
  },

  voteForCandidate: async function() {
    let candidateName = $("#candidate").val();
    $("#message").html("To record your vote, confirm the transaction to store it on the blockchain. Please wait while your vote is being processed...")
    $("#message").css("color", "green");
    $("#candidate").val("Select your favorite candidate");

    const { totalVotesFor, voteForCandidate } = this.voting.methods;
    
    await voteForCandidate(this.web3.utils.asciiToHex(candidateName)).send({gas: 140000, from: this.account});
    let div_id = candidates[candidateName];
    var count = await totalVotesFor(this.web3.utils.asciiToHex(candidateName)).call();
    $("#" + div_id).html(count);
    $("#message").html("");
  }
  
};

window.App = App;

window.addEventListener("load", function() {
  // checking if the browser has metamask installed
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});