window.qzInstance = {
  quizState: "not-started",
  index: 0,
  questions: [
    {
      question:
        "You can mix and match different brands and voltages of power tool batteries.",
      answer: false,
      fact: "Chargers are designed for specific battery types, and mixing chargers or batteries could result in unexpected problems. Check the manufacturer’s website for instructions if you plan to charge your device or batteries using a new method."
    },
    // {
    //   question:
    //     "You can safely recycle the rechargeable batteries found in power tools.",
    //   answer: true,
    //   fact: "Once a battery is no longer useful, refer to the type and chemistry of the battery to help determine the best recycling options. Removable rechargeable batteries can be sent to special battery recycling centers, manufacturers that offer battery collection services, or local hazardous waste recycling programs."
    // },
    // {
    //   question:
    //     "More volts and amps in a battery indicate a more powerful tool.",
    //   answer: false,
    //   fact: "When it comes to power tools, volts and amps don’t tell the whole story. Everything in the tool, from the battery to the blade or bit, determines a battery’s power and overall efficiency. The tool’s motor, transmission and other components that provide power also greatly impact performance, in addition to the quality of the magnets in the motor, gears and more."
    // },
    // {
    //   question: "It’s best to fully discharge your power tool battery before charging.",
    //   answer: false,
    //   fact: "You should always stop using a battery as soon as you feel a substantial decrease in power from the tool, preferably before it falls below a 20% charge. Completely running down a battery may lessen its ability to maintain a lasting charge."
    // },
    // {
    //   question: "You should fully charge lithium-ion power tool batteries before storing.",
    //   answer: false,
    //   fact: "Fully charging a lithium-ion battery can shorten its lifespan and increase the risk of explosion and deterioration if exposed to high temperatures during storage. Storing power tool batteries with a partial charge level of 40% is recommended to help extend battery life."
    // },
    // {
    //   question: "You should always remove the battery from your power tool before storing it.",
    //   answer: true,
    //   fact: "Leaving a battery in can cause a higher self-discharge rate that can harm your tool. Remember to remove the battery and store it in a safe spot after each use."
    // },
    // {
    //   question: "Extreme heat is the biggest<br>enemy to battery life.",
    //   answer: true,
    //   fact: "While extreme temperatures (both hot and cold) can damage batteries, heat is the real enemy. Temperatures over 175°F can permanently damage a battery. Storing a battery in a cool, dry place can help extend battery life and make charging more efficient."
    // },
    // {
    //   question: "The container you use to store your batteries should be made of metal to help protect from damage.",
    //   answer: false,
    //   fact: "The container in which you store your batteries should be made of plastic, glass, wood or any material but metal. Batteries can short-circuit if they come into contact with metal."
    // },
    // {
    //   question: "Leaving your power tool on the<br>charger will drain its battery.",
    //   answer: false,
    //   fact: "In the past, this was true. However, as battery technology has evolved, some newer power tool chargers have a maintenance mode that allows batteries to stay in the charger, maintaining a full charge until the tool is needed."
    // },
    // {
    //   question: "You can recondition<br>power tool batteries.",
    //   answer: true,
    //   fact: "It’s possible to recondition and rebuild an old power tool battery that has lost its charge. Check with the tool’s manufacturer to see if they offer a restoration or recycling program."
    // }
  ],
  score: 0,
  responses: [],
  actualAnswers: [],
  CardHome: `
  <div class="sid-Card-home" style="background-image: url('assets/images/grainger_background.png'); background-size: cover; background-position: center;">
  <div>
  <h1> Can You Ace This<br>
  True or False Battery Quiz?</h1>
  <p>Are your battery maintenance practices doing more harm than good to your power tools? Take our two-minute quiz to find out!</p>
  <button onclick="window.qzInstance.qzSetQuizState('started')">Take The Quiz </button>
  </div>
  </div>
  `,
  CardQuestion: (q, response) => {
    let trueStatus = "";
    let falseStatus = "";
    if (response) {
      const { trueState, falseState } = window.qzInstance.checkScore(
        q.answer,
        response
      );

      trueStatus = trueState;
      falseStatus = falseState;
    }

    return `
  <div class="sid-Card-Question">
    <p>True or False:</p>
    <h2>${q.question}</h2>
    <div class="button-wrapper">
    <button class="${trueStatus}" onclick="window.qzInstance.qzSetResponse(${window.qzInstance.index}, 'true')">TRUE</button>
    <button class="${falseStatus}" onclick="window.qzInstance.qzSetResponse(${window.qzInstance.index}, 'false')">FALSE</button>
    </div>
    </div>
  ${window.qzInstance.CardProgressDots()}
`;
  },
  CardProgressDots: () => {
    const dotsInit = Array(window.qzInstance.questions.length).fill("");
    const dots = dotsInit
      .map((dot, index) => {
        if (window.qzInstance.index <= index) {
          return "<li></li>";
        } else {
          return '<li class="current"></li>';
        }
      })
      .join("");

    console.log(dots, dotsInit, window.qzInstance.index);

    return `
    <ul id="sid-dots">
      ${dots}
    </ul>
    `;
  },
  checkScore: (answer, response) => {
    let trueState = "";
    let falseState = "";
    let overallState = "";

    if (response === "true") {
      if (answer) {
        trueState = "correct";
        overallState = "correct";
      } else {
        trueState = "wrong";
      }
    } else if (response === "false") {
      if (!answer) {
        falseState = "correct";
        overallState = "correct";
      } else {
        falseState = "wrong";
      }
    }

    return {
      trueState,
      falseState,
      overallState
    };
  },
  CardFact: (q) => `
<div class="sid-Card-Fact">
<p>Correct Answer: </p>
<h3>${q.answer}</h3>
<p>${q.fact}</p>
<button id="next" onclick="window.qzInstance.qzSetNextQuestion(${window.qzInstance.index})">Next</button>
</div>
${window.qzInstance.CardProgressDots()}
`,
  FinalResult: () => `
<div class="sid-Card-Result">
<div class="result-container">
  <p>Your Quiz Results:</p>
  <h2>
  ${window.qzInstance.calculateScore()}%
  </h2>
  <div class="progress">
  <div style="width:${window.qzInstance.calculateScore()}%"></div>
  </div>
  <div>
    <button>
    <ul>
    <li><p>Share</p></li>
    <li> 
    <a href="http://twitter.com/share?url=${window.location.href}" target="_blank"">
    <img src="assets/images/twitter.svg" />
    </a>
    </li>
    <li>
    <a href="http://www.facebook.com/sharer.php?u=${window.location.href}">
    <img src="assets/images/facebook.svg" />
    </a>
    </li>
    <li>
    <a href="http://www.linkedin.com/" onclick="popUp=window.open(
      'http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}',
      'popupwindow',
      'scrollbars=yes,width=800,height=400');
  popUp.focus();
  return false">
    <img src="assets/images/linkedin.svg" />
    </a>
    </li> 
  </ul>
    </button>
    <button id="retake" onclick="location.reload();">
      <ul>
        <li><p>Take again</p></li>
        <li><img src="assets/images/retake.svg"/></li>
      </ul>
    </button>
  </div>
</div>
</div>
`,
  calculateScore: () => {
    return (window.qzInstance.score / window.qzInstance.questions.length) * 100;
  },
  generateApp: () => {
    if (window.qzInstance.quizState === "not-started") {
      return window.qzInstance.CardHome;
    } else if (window.qzInstance.quizState === "started") {
      return window.qzInstance.CardQuestion(
        window.qzInstance.questions[window.qzInstance.index]
      );
    } else if (window.qzInstance.quizState === "intermediate-result") {
      return window.qzInstance.CardQuestion(
        window.qzInstance.questions[window.qzInstance.index],
        window.qzInstance.responses[window.qzInstance.index]
      );
    } else if (window.qzInstance.quizState === "result") {
      return window.qzInstance.CardFact(
        window.qzInstance.questions[window.qzInstance.index]
      );
    } else if (window.qzInstance.quizState === "finished") {
      return window.qzInstance.FinalResult();
    }
  },
  qzSetQuizState: (state) => {
    window.qzInstance.quizState = state;
    render();
  },
  qzSetResponse: (index, response) => {
    window.qzInstance.responses[index] = response;
    const { overallState } = window.qzInstance.checkScore(
      window.qzInstance.questions[index].answer,
      response
    );
    if (overallState === "correct") {
      window.qzInstance.score += 1;
    }

    window.qzInstance.quizState = "intermediate-result";
    render();

    setTimeout(() => {
      window.qzInstance.quizState = "result";
      render();
    }, 800);
  },
  qzSetNextQuestion: (index) => {
    if (window.qzInstance.index <= window.qzInstance.questions.length - 2) {
      window.qzInstance.index = index + 1;
      window.qzInstance.quizState = "started";
      render();
    } else {
      window.qzInstance.quizState = "finished";
      render();
    }
  },
};

function render() {
  document.getElementById(
    "sid-grainger-container"
  ).innerHTML = window.qzInstance.generateApp();
}

render();
