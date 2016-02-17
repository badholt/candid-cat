Meteor.methods({
    "addProblem": function (problem) {
        console.log(problem);
        return Problems.insert({
            answers: problem.answers,
            code: problem.code,
            created: new Date(),
            difficulty: problem.difficulty,
            owner: Meteor.userId(),
            language: problem.language,
            lastUpdated: new Date(),
            number: problem.number,
            prompt: problem.prompt,
            type: problem.type
        });
    },
    "addQuiz": function (questions, title, organization) {
        return Quizzes.insert({
            aware: true,
            created: new Date(),
            lastUpdated: new Date(),
            organization: organization,
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
        _.each(quiz.questions, function (value) {
            problems.push(Problems.find(value, {
                fields: {
                    answers: 1,
                    difficulty: 1,
                    number: 1,
                    type: 1
                }
            }));
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
    },
    "updateProblem": function (problem) {
        return Problems.update(problem._id, {
            $set: {
                answers: problem.answers,
                code: problem.code,
                created: problem.created,
                difficulty: problem.difficulty,
                language: problem.language,
                lastUpdated: new Date(),
                number: problem.number,
                owner: Meteor.userId(),
                prompt: problem.prompt,
                type: problem.type
            }
        }, true);
    },
    "updateQuiz": function (id, organization, questions, title) {
        Quizzes.update(id, {
            $push: {
                questions: {$each: questions}
            },
            $set: {
                lastUpdated: new Date(),
                organization: organization,
                title: title
            }
        });
    }
});
