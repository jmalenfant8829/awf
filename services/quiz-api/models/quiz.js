const mongoose = require("mongoose");

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
        questions: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Question",
            },
        ],
        //users who liked this quiz
        likers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            }
        ],
    }
);

module.exports = mongoose.model("Quiz", quizSchema);