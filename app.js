let words = ["AMOR", "XISELA", "JAMON", "ROMA", "OMAR", "MORA", "MO(RA)", "ESPONJA", "RAMO", "JAPONES", "ARMO", "MOJAN", "MARO", "ORAM", "MONJA", "ALEXIS", "A(LE)X(IS)", "(ALEXIS)"];

function groupByMatchingLetters(wordsToGroup){
    let groupedWords = {};
    for(let i = 0; i < wordsToGroup.length; i++){
        let matchWord = reverseBracketContent(wordsToGroup[i]);
        let groupKeys = Object.keys(groupedWords);
        let groupExists = false;
        for(let j = 0; j < groupKeys.length; j++){
            let groupKey = groupKeys[j];
            if(wordsContainSameLetters(matchWord, groupKey)){
                groupedWords[groupKey].push(matchWord);
                groupExists = true;
                break;
            }
        }

        if(!groupExists){
            groupedWords[matchWord] = [matchWord];
        }
    }
    return groupedWords;
}

// Could potentially be optimized by not re-counting the same letters
// This would improve speed for words with many recurring letters, but at an overall cost
function wordsContainSameLetters(lhs, rhs){
    if (lhs.length != rhs.length) return false;
    for(let i = 0; i < lhs.length; i++){
        let rhsCount = countLetterInWord(rhs, lhs[i]);
        if(rhsCount === 0) return false;
        let lhsCount = countLetterInWord(lhs, lhs[i]);
        if(lhsCount !== rhsCount) return false;
    }
    return true;
}

function countLetterInWord(word, letter){
    let count = 0;
    for(let i = 0; i < word.length; i++){
        if(word[i] === letter) count++;
    }
    return count;
}

// Nested brackets not supported
function reverseBracketContent(word){
    let newWord = "";
    let tempWord = "";
    let insideBracket = false;
    for(let c = 0; c < word.length; c++){
        if(word[c] === "("){
            insideBracket = true;
            continue;
        }
        if(word[c] === ")"){
            insideBracket = false;
            newWord += reverseLetters(tempWord);
            tempWord = "";
            continue;
        }
        if(insideBracket){
            tempWord += word[c];
        }else{
            newWord += word[c];
        }
    }
    return newWord;
}

function reverseLetters(word){
    let newWord = "";
    for(let c = word.length-1; c >= 0; c--){
        newWord += word[c];
    }
    return newWord;
}

//console.log(reverseLetters("MACADAMIA"));
//console.log(reverseBracketContent("MACA(DAM)IA"));
//console.log(countLetterInWord("BOBBY", "B"));
//console.log(countLetterInWord("BOBBY", "A"));
//console.log(wordsContainSameLetters("BOBBY", "BOOOY"));
//console.log(wordsContainSameLetters("BOBBY", "BYBOB"));
console.log("\nOriginal:");
console.log(words);
console.log("\nGrouped:")
console.log(JSON.stringify(groupByMatchingLetters(words), null, 4));