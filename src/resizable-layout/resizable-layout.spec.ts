import 'mocha'
import { expect, assert } from 'chai';
import { jsdomGlobalFromFile } from '../test-util';
import * as ResizableLayout from './resizeable-layout';

describe('Resizable layout', () => {
  let handler: HTMLElement;
  let roOutput: HTMLElement;
  let bandList: HTMLElement;

  beforeEach(() => {
    jsdomGlobalFromFile('src/index.html');
    ResizableLayout.init();
    handler = document.querySelector('.handler') as HTMLElement;
    const wrapper = handler.closest('main');
    roOutput = wrapper.querySelector('.ro-output') as HTMLElement;
    bandList = wrapper.querySelector('.band-list') as HTMLElement;
  });

  it('starts with a 20%/80% ratio', () => {
    expect(bandList.style.width).to.equal('20%');
    expect(roOutput.style.width).to.equal('80%');
  });

  it('resizes percentage-wise on mouse drags', () => {
    const mvMouseX = 0.1 * window.innerWidth;
    handler.dispatchEvent(new MouseEvent('mousedown', { "bubbles": true }));
    document.dispatchEvent(new MouseEvent('mousemove', { "clientX": mvMouseX }));
    expect(parseFloat(bandList.style.width)).to.be.closeTo(30, 0.1);
    expect(parseFloat(roOutput.style.width)).to.be.closeTo(70, 0.1);
  });
});
