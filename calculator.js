function getHistory() {
  return document.getElementById("history-value").innerText;
}

function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

document.addEventListener("DOMContentLoaded", function () {
  var operator = document.getElementsByClassName("operator");
  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
      if (this.id == "clear") {
        printHistory("");
        printOutput("");
      } else if (this.id == "backspace") {
        var output = reverseNumberFormat(getOutput()).toString();
        if (output) {
          // If output has a value
          output = output.substr(0, output.length - 1);
          printOutput(output);
        }
      } else {
        var output = getOutput();
        var history = getHistory();
        if (output == "" && history != "") {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
          }
        }
        if (output != "" || history != "") {
          output = output == "" ? output : reverseNumberFormat(output);
          history = history + output;
          if (this.id == "=") {
            var result = eval(history);
            printOutput(result);
            printHistory("");
          } else {
            history = history + this.id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    });
  }

  var number = document.getElementsByClassName("number");
  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function () {
      var output = reverseNumberFormat(getOutput());
      if (output != NaN) {
        // If output is a number
        output = output + this.id;
        printOutput(output);
      }
    });
  }
});


function toggleDarkMode() {
  calculator.classList.toggle('dark-mode'); // Agregamos o quitamos la clase "dark-mode" al #calculator
  darkModeButton.classList.toggle('active-dark-mode'); // Agregamos o quitamos la clase "active" al botón
}

// Evento click para alternar el modo claro y oscuro al hacer clic en el botón
darkModeButton.addEventListener('click', function () {
  toggleDarkMode();
});

// Detectamos el modo del sistema operativo para establecer el modo por defecto
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Si el sistema operativo tiene el modo oscuro activado por defecto
  // Quitamos la clase "dark-mode" para dejarlo en modo claro por defecto
  calculator.classList.add('dark-mode');
  darkModeButton.classList.add('active-dark-mode'); // Quitamos la clase "active" al botón por defecto
} else {
  // Si el sistema operativo tiene el modo claro activado por defecto
  // Agregamos la clase "dark-mode" para dejarlo en modo oscuro por defecto
  calculator.classList.remove('dark-mode');
  darkModeButton.classList.remove('active-dark-mode'); // Agregamos la clase "active" al botón por defecto
}

