"use strict";

const url = "quiz.json";
const questions = [];
const output = document.querySelector(".output");
const btn = document.querySelector(".btn");
let cur = 0;
const holder = [];

btn.addEventListener("click", (e) => {
  newQuestion();
  btn.style.display = "none";
});

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
  que1.classList.add("que");
  let strOutput = el.question;
  strOutput = strOutput.charAt(0).toUpperCase() + strOutput.slice(1);
  const ans1 = document.createElement("div");
  holder.length = 0;
  que1.textContent = strOutput + "?";

  el.options.forEach((ans) => {
    const div = document.createElement("div");
    holder.push(div);
    div.textContent = ans.response;
    div.classList.add("box");
    div.correct = ans.correct;
    div.addEventListener("click", selOption);
    ans1.append(div);
  });

  output.append(que1);
  output.append(ans1);
}

function selOption(e) {
  endTurn();
  if (e.target.correct) {
    e.target.style.backgroundColor = "green";
  } else {
    e.target.style.backgroundColor = "red";
  }
  e.target.style.color = "white";
}

function endTurn() {
  holder.forEach((el) => {
    el.removeEventListener("click", selOption);
    el.style.backgroundColor = "#ddd";
  });
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

