var Election = artifacts.require("./Election.sol")

contract("Election", function(accounts){
    var electionInstance;

    it('Inicializa com dois candidatos', function(){
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            assert.equal(count, 2);
        });
    });

    it('Inicializou os candidatos com os valores corretos', function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate.id, 1,'Primeiro id correto');
            assert.equal(candidate.name, 'Candidate 1','Primeiro nome correto');
            assert.equal(candidate.voteCount, 0,'Primeira contagem de votos correta');
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate.id, 2,'Segundo id correto');
            assert.equal(candidate.name, 'Candidate 2','Segundo nome correto');
            assert.equal(candidate.voteCount, 0,'Segunda contagem de votos correta');
        });
    });

    it("Testa voto", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 1;
          return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
          return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "Endereço marcado que já votou.");
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "Voto foi contabilizado");
        })
      });
});