Meteor.methods({
    "addProblem": function (answers, code, difficulty, number, prompt, type) {
        Problems.insert({
            answers: answers,
            code: code,
            created: new Date(),
            difficulty: difficulty,
            owner: Meteor.userId(),
            number: number,
            prompt: prompt,
            type: type
        });
    },
    "addQuiz": function (questions, title) {
        Quizzes.insert({
            aware: true,
            creationDate: new Date(),
            lastUpdated: new Date(),
            owner: Meteor.userId(),
            questions: questions,
            title: title
        });
    },
    "reportUserResponse": function (responses, problemID) {
        var user = Meteor.userId();
        Reports.upsert(
            {problem: problemID, user: user},
            {
                $push: {
                    accuracy: responses.accuracy,
                    answers: responses.answers,
                    dates: new Date(),
                    times: responses.time
                },
                $setOnInsert: {
                    accuracy: [responses.accuracy],
                    answers: [responses.answers],
                    dates: [new Date()],
                    problem: problemID,
                    times: [responses.time],
                    user: user
                }
            }, true);
    },
    "retrieveReports": function (quiz) {
        var problems = [];
        _.each(quiz.questions, function (value){
            problems.push(Problems.find(value, {fields: {
                answers: 1,
                difficulty: 1,
                number: 1,
                type: 1
            }}));
        });
        return {
            problems: problems,
            questions: quiz.questions,
            title: quiz.title
        };
    },
    "sendWelcomeEmail": function (userData) {
        var text = Assets.getText('emails/welcome-email.html');
        SSR.compileTemplate('welcomeEmail', text);
        var emailTemplate = SSR.render('welcomeEmail', {
            email: userData.email,
            name: (userData.name != "") ? userData.name : null,
            url: "http://localhost:3000"
        });
        return Email.send({
            to: userData.email,
            from: "candid cat - demo <demo@candidcat.com>",
            subject: "Welcome aboard, cool cat!",
            html: emailTemplate
        });
    }
});
