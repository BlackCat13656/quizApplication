"use strict";

const url = "quiz.json";
const questions = [];
const output = document.querySelector(".output");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  newQuestion();
  btn.style.display = "none";
});

const cur = 0; // current question

window.addEventListener("DOMContentLoaded", () => {
  //   console.log("ready");
  loadQuestions();
});

function newQuestion() {
  const el = questions[cur];
  el.options.sort(() => {
    return 0.5 - Math.random();
  });

  console.log(cur);
  console.log(questions.length);
  console.log(questions[cur]);
  output.innerHTML = "";

  const que1 = document.createElement("div");
  const ans1 = document.createElement("div");
  que1.textContent = el.question;
  el.options.forEach((ans) => {
    const div = document.createElement("div");
    div.textContent = ans.response;
    div.addEventListener("click", (e) => {
      console.log(ans.correct);
    });
    ans1.append(div);
  });
  output.append(que1);
  output.append(ans1);
}

function loadQuestions() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((el) => {
        let temp = []; // temporary array

        el.incorrect.forEach((ans) => {
          let tempObj = {
            response: ans,
            correct: false,
          };

          temp.push(tempObj);
        });

        let tempObj = {
          response: el.correct,
          correct: true,
        };

        temp.push(tempObj);

        // console.log(temp);
        let mainTemp = {
          question: el.question,
          options: temp,
        };

        questions.push(mainTemp);
      });

      console.log(questions);
      //document.body.innerText = JSON.stringify(questions, null, 2);
    });
}

