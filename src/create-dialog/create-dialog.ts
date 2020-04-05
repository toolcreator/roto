import { remote } from 'electron';
import { FESTIVAL_ADAPTERS } from '../backend/adapters/festival-adapters';

const adapterSelector = document.getElementById("festivalAdapter") as HTMLSelectElement;
FESTIVAL_ADAPTERS.forEach((value, key) => {
  const adapterOption = document.createElement('option') as HTMLOptionElement;
  adapterOption.text = key;
  adapterSelector.add(adapterOption);
});

function submit(): void {
  alert("submit");
  remote.getCurrentWindow().close();
}

document.getElementById('createFestivalForm').addEventListener('submit', submit, false);
