pragma solidity ^0.5.16;

contract Election{
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    constructor() public {
        addCandidate('Candidate 1');
        addCandidate('Candidate 2');
    }

    function addCandidate(string memory _name) private{
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateID) public{
        require(!voters[msg.sender]);
        require(_candidateID > 0 && _candidateID <= candidatesCount);

        candidates[_candidateID].voteCount ++;
        voters[msg.sender] = true;
    }
}