const extractingOverlay = () => {
  const overlay = document.getElementById("overlay");
  console.log(overlay);
  overlay.parentNode.removeChild(overlay);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (msg === "injectOverlay") {
    const injectOverlay = () => {
      const overlay = `
        <div class="bg-red" id="overlay">
          <span id="overlay-countdown"></span>
        </div>
      `
      const overlayStyle = `
        <style>
          #overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999999;
            padding: 0;
            margin: 0;
            border-radius: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            -webkit-transition: all 15s cubic-bezier(0.895, 0.03, 0.685, 0.22);
            transition: all 15s cubic-bezier(0.895, 0.03, 0.685, 0.22);
          }

          .bg-red {
            background-color: #E44D42;
            opacity: 1;
          }

          .bg-green {
            background-color: #4cd137;
            opacity: 0.3;
          }

          #overlay-countdown {
            color: #fff;
            font-size: 10rem;
          }
        </style>
      `

      document.body.innerHTML += overlay;
      document.body.innerHTML += overlayStyle;


      const countdown = (sec) => {
        let timeRemaining = sec;
        let countdownFinished = false;

        const calculate = () => {
          if (timeRemaining >= 0) {
            document.getElementById("overlay-countdown").innerHTML = timeRemaining;
            timeRemaining -= 1;
            setTimeout(calculate, 1000);
          } else {
            extractingOverlay();
            countdownFinished = true;
            return;
          }
        }

        setTimeout(calculate, 1000);

        el = document.getElementsByClassName("bg-red");
        window.setTimeout(function () {
          el[0].className = "bg-green";
        }, 100);
      }
      countdown(15);

    }
    injectOverlay();

  }
})