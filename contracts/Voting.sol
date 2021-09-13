pragma solidity ^0.6.4;

contract Voting {
  mapping (bytes32 => uint256) public votesReceived;
  bytes32[] public candidateList;

  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }

  // totalvotes
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // updates vote for candidate
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  // checks if the candidate is in the list so if they are a valid candidate
  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}