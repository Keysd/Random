const $ = document.querySelector.bind(document);

let arr = [];
let curArr = [];
let currentIndex = 0;

const inputElement = $('input');
const textArea = $('.area');

inputElement.onkeydown = (e) => {
    if (e.key === 'Enter') {
        handleAdd();
    }
};

$('.btn-build').onclick = () => {
    arr = textArea.value.split('\n').filter((curr) => curr !== '');
    handleReset();
    render();
};

$('.btn-add').onclick = handleAdd;

$('.btn-spin').onclick = () => {
    currentIndex = Math.floor(Math.random() * curArr.length);

    $('.result').textContent = curArr.length > 0 ? curArr[currentIndex] : 'Đã hết';
    curArr.splice(currentIndex, 1);

    render();
};

$('.btn-reset').onclick = handleReset;

function handleReset() {
    curArr = arr.slice();
    render();
}

function handleAdd() {
    const value = inputElement.value;
    if (!value || arr.includes(value)) return;

    arr.push(value);
    inputElement.value = '';
    inputElement.focus();

    curArr = arr.slice();
    setTextArea();

    render();
}

function handleDelete(index) {
    arr.splice(index, 1);
    curArr = arr.slice();
    setTextArea();
    render();
}

function setTextArea() {
    textArea.value = arr.join('\n');
}

const render = () => {
    $('.list').innerHTML = arr
        .map(
            (curr, index) => `<li>
				<div class="${x(curArr.includes(curr) || 'red')}">${curr}</div>
				<span onclick="handleDelete(${index})">
					&times;
				</span>
			</li>`,
        )
        .join('');
};

const x = (x) => {
    return (x != true && x) || '';
};
