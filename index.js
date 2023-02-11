const $ = document.querySelector.bind(document);

let arr = [];
let curArr = [];
let currentIndex = 0;

const textArea = $('.area');

$('.btn-build').onclick = () => {
    arr = textArea.value.split('\n').filter((curr) => curr !== '');
    handleReset();
    render();
};

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
    $('.list').innerHTML = curArr
        .map(
            (curr, index) => `<li class="item ${x(curArr.includes(curr) || 'red')}">
				<div >${curr}</div>
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
