const enterDay = document.getElementById("day");
const enterMonth = document.getElementById("month");
const enterYear = document.getElementById("year");
const enterValue = document.querySelectorAll("p");
const inputs = document.querySelectorAll("input");
const dayError = document.getElementById("day-error")
const monthError = document.getElementById("month-error")
const yearError = document.getElementById("year-error")
const actualDate = new Date();
const actualDay = actualDate.getDate()
const actualMonth = actualDate.getMonth() + 1
const actualYear = actualDate.getFullYear()

function toggleError(elemento, mensaje, accion) {
  enterValue.forEach((error) => {
    if (accion === "add") {
    error.classList.add("error-p")
    } else if (accion === "remove") {
      error.classList.remove("error-p")
    }
  })
  inputs.forEach((error) => {
    if (accion === "add") {
      error.classList.add("error")
      } else if (accion === "remove") {
        error.classList.remove("error")
      }
  })
  elemento.innerHTML = mensaje
}

let dayTrue = false;
let monthTrue = false;
let yearTrue = false;

enterDay.addEventListener("input", (e) => {
  //validando el dia 
  if (e.target.value < 1 || e.target.value > 31) {
    toggleError(dayError, "Debe ser un dia valido", "add")
    //validando si el dia no esta vacio
    if (e.target.value.length === 0) {
      toggleError(dayError, "Campo requerido", "add")
    }
    dayTrue = false;
  } else if ((enterYear.value == actualYear) && (enterMonth.value >= actualMonth) && (enterDay.value > actualDay)) {
      toggleError(dayError, "Debe ser en el pasado", "add")
      dayTrue = false;
    }
  else {
    toggleError(dayError, "", "remove")
    dayTrue = true;
  }
})

enterMonth.addEventListener("input", (e) => {
  //validando el dia 
  if (e.target.value < 1 || e.target.value > 12) {
    toggleError(monthError, "Debe ser un mes valido", "add")
    //validando si el dia no esta vacio
    if (e.target.value.length === 0) {
      toggleError(monthError, "Campo requerido", "add")
    }
    monthTrue = false;
  } else if ((enterYear.value == actualYear) && (enterMonth.value > actualMonth)) {
      toggleError(monthError, "Debe ser en el pasado", "add")
      monthTrue = false;
    }
  else {
    toggleError(monthError, "", "remove")
    monthTrue = true;
  }
})

enterYear.addEventListener("input", (e) => {
  //validando el dia 
  if (e.target.value < 1 || e.target.value > actualYear) {
    toggleError(yearError, "Debe ser un año valido", "add")
    //validando si el dia no esta vacio
    if (e.target.value.length === 0) {
      toggleError(yearError, "Campo requerido", "add")
    }
    yearTrue = false;
  } else if ((enterYear.value == actualYear) && (enterMonth.value > actualMonth)) {
      toggleError(yearError, "Debe ser en el pasado", "add")
      yearTrue = false;
    }
  else {
    toggleError(yearError, "", "remove")
    yearTrue = true;
  }
})


function showAge() {
if (dayTrue && monthTrue && yearTrue) {
  const enteredDate = new Date(`${enterMonth.value}-${enterDay.value}-${enterYear.value}`);

  const diffTime = actualDate - enteredDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);  
  const years = Math.abs(diffDays / 365.25)
  const meses = Math.abs((years % 1) * 12)
  const dias = Math.abs((meses % 1) * 30)

  const allDates = { 
  years : Math.floor(years),
  months : Math.floor(meses),
  days : Math.floor(dias) 
}
  document.getElementById("year-result").innerHTML = allDates.years
  document.getElementById("month-result").innerHTML = allDates.months
  document.getElementById("days-result").innerHTML = allDates.days
} else {
  document.getElementById("year-result").innerHTML = "--";
  document.getElementById("month-result").innerHTML = "--";
  document.getElementById("days-result").innerHTML = "--";
}}


inputs.forEach((e) => {
  e.addEventListener("input", showAge)
})





