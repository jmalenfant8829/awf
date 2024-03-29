const mongoose = require("mongoose");
var Question = require("./question").schema;

var quizSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        questions: [ Question ],
        //users who liked this quiz
        likers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            }
        ],
    }
);

//Add index for search by text functionality
//mongo uses snowball stemming for search 
quizSchema.index({title: 'text'});

module.exports = mongoose.model("Quiz", quizSchema);