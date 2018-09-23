const rawData = require('../data/botConversation')
const _ = require('lodash')

const directQuestions = {}  //holds the direct questions and answer
const metaData = {} //holds the answers classified by metadata

for(var i=0;i<rawData.length;i++) {
    //loads all the direct questions and answers
    directQuestions[rawData[i].question.toLowerCase()] = rawData[i].answer

    //loop over all the tags and classify answers by tags
    for(var j=0; j < rawData[i].tags.length; j++) {
        var key = rawData[i].tags[j].toLowerCase()
        if(!metaData[key]) {
            metaData[key] = [rawData[i].answer]
        } else {
            metaData[key].push(rawData[i].answer)
        }
    }
}

//gives the response based on the question
const getResponse = (question) => {

    question = question.toLowerCase()

    //if direct answer is available return specific answer
    if(directQuestions[question]) {
        return directQuestions[question]
    }

    //if direct answer not available create list of answers using tags
    var answers = []

    //check each tag against a question and add the answers to the list
    _.forEach(metaData, function (value, key) {
        if(question.includes(key + " ") || question.includes(" " + key) || question === key) {
            answers = _.concat(answers, value)
        }
    })

    //if answers are available reply with the same
    if(answers.length > 0) {
        return JSON.stringify(answers)
    }

    //if the answer is not available reply with the default answer
    return "I don't know this"
}

module.exports = {getResponse}