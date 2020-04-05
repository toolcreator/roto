const handler = document.querySelector('.handler');
let isHandlerDragging = false;
const wrapper = handler.closest('main');
const rooutput = wrapper.querySelector('.ro-output') as HTMLElement;

document.addEventListener('mousedown', e => {
    if (e.target === handler) {
        isHandlerDragging = true;
    }
});

document.addEventListener('mousemove', e => {
    if (!isHandlerDragging) {
        return false;
    }
    const containerOffsetLeft = wrapper.offsetLeft;
    const pointerRelativeXpos = e.clientX - containerOffsetLeft;
    const boxMinWidth = 100;
    rooutput.style.width = (Math.max(boxMinWidth, pointerRelativeXpos - 8)) + 'px';
});

document.addEventListener('mouseup', () => {
    isHandlerDragging = false;
});
