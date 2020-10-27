import { ipcRenderer, remote } from 'electron';
import { FESTIVAL_ADAPTER_NAMES } from '../adapters/festival-adapters';
import { Festival } from '../model/festival';
import { BandCategory } from '../model/band-category';


ipcRenderer.on('set-name', (event: Electron.IpcRendererEvent, name: string) => {
  nameInput.value = name;
});

ipcRenderer.on('set-start-date', (event: Electron.IpcRendererEvent, startDate: string) => {
  startDateInput.value = startDate;
});

ipcRenderer.on('set-end-date', (event: Electron.IpcRendererEvent, endDate: string) => {
  endDateInput.value = endDate;
});

ipcRenderer.on('add-category', (event: Electron.IpcRendererEvent, category: BandCategory | undefined) => {
  addCategory(category?.name, category?.color, category?.rank);
});

ipcRenderer.on('set-adapter', (event: Electron.IpcRendererEvent, adapter: number) => {
  adapterSelector.selectedIndex = adapter;
});

function addCategory(name: string | undefined = undefined,
                     color: string | undefined = undefined,
                     rank: number | undefined = undefined): void {
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

  const rankIn = document.createElement('input');
  rankIn.type = 'number';
  rankIn.required = true;
  rankIn.value = rank ? rank.toString() : (categoryTable.rows.length + 1).toString();
  rankIn.step = '1';
  colCell.appendChild(rankIn);

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
  const name = nameInput.value;
  const startDate = startDateInput.valueAsDate;
  const endDate = endDateInput.valueAsDate;
  const festivalAdapter = FESTIVAL_ADAPTER_NAMES.get(adapterSelector.value);

  const bandCategories: BandCategory[] = [];
  const catTableRows = categoryTable.rows;
  for (let rowIdx = 1; rowIdx < catTableRows.length; ++rowIdx) {
    const cells = catTableRows[rowIdx].cells;
    const catName = (<HTMLInputElement>cells[0].firstChild).value.trim();
    const catColor = (<HTMLInputElement>cells[1].firstChild).value;
    const catRank = parseInt((<HTMLInputElement>cells[2].firstChild).value);
    bandCategories.push(new BandCategory(catName, catColor, catRank));
  }

  const festival = new Festival(
    name,
    startDate,
    endDate,
    bandCategories,
    festivalAdapter,
    [],
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
    const currentWindow = remote.getCurrentWindow();
    currentWindow.getParentWindow().webContents.send('festival-configured', [festival, fileName]);
    currentWindow.close();
  }
}

const nameInput = document.getElementById('name') as HTMLInputElement;
const startDateInput = document.getElementById('startDate') as HTMLInputElement;
const endDateInput = document.getElementById('endDate') as HTMLInputElement;
const categoryTable = document.getElementById('bandCategories') as HTMLTableElement;
const adapterSelector = document.getElementById('festivalAdapter') as HTMLSelectElement;
FESTIVAL_ADAPTER_NAMES.forEach((value, key) => {
  const adapterOption = document.createElement('option');
  adapterOption.text = key;
  adapterSelector.add(adapterOption);
});

document.getElementById('createFestivalForm').addEventListener('submit', submit);
document.getElementById('addCategory').addEventListener('click', () => addCategory());
