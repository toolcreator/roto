import { remote } from 'electron';
import { FESTIVAL_ADAPTER_NAMES } from '../adapters/festival-adapters';
import { Festival } from '../model/festival';
import { BandCategory } from '../model/band-category';
import * as fs from 'fs';

const adapterSelector = document.getElementById('festivalAdapter') as HTMLSelectElement;
FESTIVAL_ADAPTER_NAMES.forEach((value, key) => {
  const adapterOption = document.createElement('option');
  adapterOption.text = key;
  adapterSelector.add(adapterOption);
});

const categoryTable = document.getElementById('bandCategories') as HTMLTableElement;

function addCategory(e: Event | undefined = undefined,
                     name: string | undefined = undefined,
                     color: string | undefined = undefined): void {
const row = document.createElement('tr');
const catCell = document.createElement('td');
const colCell = document.createElement('td');
const remCell = document.createElement('td');

const catIn = document.createElement('input');
catIn.type = 'text';
catIn.required = true;
catIn.value = name ? name : '';
catCell.appendChild(catIn);

const colIn = document.createElement('input');
colIn.type = 'color';
colIn.required = true;
colIn.value = color ? color : '#ffffff';
colCell.appendChild(colIn);

const remBtn = document.createElement('button');
remBtn.type = 'button';
remBtn.addEventListener('click', () => {
  categoryTable.removeChild(row);
});
const remI = document.createElement('i');
remI.className = 'material-icons';
remI.innerText = 'delete_outline';
remBtn.appendChild(remI);
remCell.appendChild(remBtn);

row.appendChild(catCell);
row.appendChild(colCell);
row.appendChild(remCell);
categoryTable.appendChild(row);
}

function submit(): void {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const startDate = (document.getElementById('startDate') as HTMLInputElement).valueAsDate;
  const endDate = (document.getElementById('endDate') as HTMLInputElement).valueAsDate;
  const festivalAdapter = FESTIVAL_ADAPTER_NAMES.get((document.getElementById('festivalAdapter') as HTMLInputElement).value);

  let bandCategories: BandCategory[] = [];
  const catTableRows = categoryTable.rows;
  for (let rowIdx = 1; rowIdx < catTableRows.length; ++rowIdx) {
    const cells = catTableRows[rowIdx].cells;
    const catName = (<HTMLInputElement>cells[0].firstChild).value.trim();
    const catColor = (<HTMLInputElement>cells[1].firstChild).value;
    bandCategories.push(new BandCategory(catName, catColor));
  }

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
    const currentWindow = remote.getCurrentWindow();
    currentWindow.getParentWindow().webContents.send('festival-created', festival);
    currentWindow.close();
  }
}

document.getElementById('createFestivalForm').addEventListener('submit', submit);
document.getElementById('addCategory').addEventListener('click', addCategory);
