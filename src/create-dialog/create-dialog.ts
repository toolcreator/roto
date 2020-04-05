import { remote } from 'electron';
import { FESTIVAL_ADAPTER_NAMES } from '../backend/adapters/festival-adapters';
import { Festival } from '../backend/festival';
import * as fs from 'fs';

const adapterSelector = document.getElementById("festivalAdapter") as HTMLSelectElement;
FESTIVAL_ADAPTER_NAMES.forEach((value0, key) => {
  const adapterOption = document.createElement('option') as HTMLOptionElement;
  adapterOption.text = key;
  adapterSelector.add(adapterOption);
});

function submit(): void {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const startDate = (document.getElementById('startDate') as HTMLInputElement).valueAsDate;
  const endDate = (document.getElementById('endDate') as HTMLInputElement).valueAsDate;
  const bandCategories = (document.getElementById('bandCategories') as HTMLInputElement).value.split(',').map(category => category.trim());
  const festivalAdapter = FESTIVAL_ADAPTER_NAMES.get((document.getElementById('festivalAdapter') as HTMLInputElement).value);

  const festival = new Festival(
    name,
    startDate,
    endDate,
    bandCategories,
    festivalAdapter,
    []
  );

  const fileName = remote.dialog.showSaveDialogSync(
    remote.getCurrentWindow(),
    {
      'title': 'Save festival',
      'defaultPath': 'festival.json',
      'filters': [{
        'name': 'JSON',
        'extensions': ['json']
      }],
    }
  );
  if (fileName != undefined) {
    fs.writeFileSync(fileName, JSON.stringify(festival));
    remote.getCurrentWindow().close();
  }
}

document.getElementById('createFestivalForm').addEventListener('submit', submit);

