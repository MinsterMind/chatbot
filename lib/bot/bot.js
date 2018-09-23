const rawData = require('../data/botConversation')
const _ = require('lodash')

const directQuestions = {}
const metaData = {}

for(var i=0;i<rawData.length;i++) {
    directQuestions[rawData[i].question] = rawData[i].answer
    for(var j=0; j < rawData[i].tags.length; j++) {
        var key = rawData[i].tags[j]
        if(!metaData[key]) {
            metaData[key] = [rawData[i].answer]
        } else {
            metaData[key].push(rawData[i].answer)
        }
    }
}

const getResponse = (question) => {
    if(directQuestions[question]) {
        return directQuestions[question]
    }

    var answers = []

    _.forEach(metaData, function (value, key) {
        if(question.includes(key + " ") || question.includes(" " + key) || question === key) {
            answers = _.concat(answers, value)
        }
    })

    if(answers.length > 0) {
        return JSON.stringify(answers)
    }

    return "I don't know this"
}

module.exports = {getResponse}