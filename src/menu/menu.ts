function createFestival(): void {
  alert('create');
}

function openFestival(): void {
  alert('open');
}

function printRunningOrder(): void {
  alert('print');
}

let createFestivalButton = document.getElementById('createFestivalButton');
createFestivalButton.onclick = createFestival;

let openFestivalButton = document.getElementById('openFestivalButton');
openFestivalButton.onclick = openFestival;

let printButton = document.getElementById('printButton');
printButton.onclick = printRunningOrder;