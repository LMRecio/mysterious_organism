// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}
  
function pAequorFactory(specimenNum, dna) {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate() {
        const randomIndex = Math.floor(Math.random) * this.dna.length;
        const currentBase = this.dna[randomIndex];
        const possibleBases = ['A', 'T', 'C', 'G'].filter(base => base !== currentBase);
        const newBase = possibleBases[Math.floor(Math.random() * possibleBases.length)];
        this.dna[randomIndex] = newBase;
        return this.dna;
      },
      compareDNA(otherPaequor) {
        let identicalCount = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherPaequor.dna[i]) {
            identicalCount++;
          }
        }
        const percentage = (identicalCount / this.dna.length) * 100;
        console.log(`Specimen #${this.specimenNum} and specimen #${otherPaequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
      },
      willLikelySurvive() {
        const countCOrG = this.dna.filter(base => base === 'C' || base === 'G').length;
        const percentage = (countCOrG / this.dna.length) * 100;
        return percentage >= 60;
      }
    };
}
  
const survivingPaequors = [];
let count = 1;
  
while (survivingPaequors.length < 30) {
    const dna = mockUpStrand();
    const pAequor = pAequorFactory(count, dna);
    if (pAequor.willLikelySurvive()) {
        survivingPaequors.push(pAequor);
    }
    count++;
}
  
console.log(survivingPaequors);
  