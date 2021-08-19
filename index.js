//Get elements

const billInput = document.querySelector(".input-amount");
const numberOfPeopleInput = document.querySelector(".number-of-people-input");
const selectTipInput = document.querySelector(".select-tip-buttons");
const customTipInput = document.querySelector(".tip-custom-input");
const errorMsg = document.querySelector(".error-msg");
const displayTip = document.querySelector(".tip-display");
const displayTotal = document.querySelector(".total-display");
const resetButton = document.querySelector(".btn-reset");

let bill, numberOfPeople, tip;

billInput.addEventListener("change", (e) => {
	bill = parseFloat(e.target.value);

	if (numberOfPeople > 0 && bill > 0 && tip > 0) {
		calculateTip(tip, bill, numberOfPeople);
	}
});

customTipInput.onchange = (e) => {
	if (e.target.value > 0) {
		tip = parseInt(e.target.value);
		if (numberOfPeople > 0 && bill > 0) {
			calculateTip(tip, bill, numberOfPeople);
		}
	}
};

selectTipInput.addEventListener("click", (e) => {
	if (e.target === e.currentTarget) {
		return;
	}

	customTipInput.value = "";

	Array.from(e.currentTarget.children).forEach((child) => {
		if (!child.classList.contains("tip-custom-input"))
			child.style.backgroundColor = " var(--color-Very-dark-cyan)";
	});

	if (e.target.classList.contains("tip-custom-input")) {
		return;
	} else {
		tip = parseInt(e.target.textContent);
		e.target.style.backgroundColor = " var(--color-Strong-cyan)";
	}

	if (numberOfPeople > 0 && bill > 0) {
		calculateTip(tip, bill, numberOfPeople);
	}
});

numberOfPeopleInput.addEventListener("change", function () {
	numberOfPeople = parseFloat(this.value);

	if (numberOfPeople === 0) {
		this.onfocus = () => {
			this.style.border = "2px solid orangered";
		};
		this.onblur = () => {
			this.style.border = "2px solid orangered";
		};

		errorMsg.classList.add("active");
	} else {
		this.onfocus = () => {
			this.style.border = "2px solid var(--color-Strong-cyan)";
		};
		this.onblur = () => {
			this.style.border = "";
		};

		errorMsg.classList.remove("active");
	}

	if (numberOfPeople > 0 && bill > 0 && tip > 0) {
		calculateTip(tip, bill, numberOfPeople);
	}
});

function calculateTip(tip, bill, numberOfPeople) {
	resetButton.style.backgroundColor = "var(--color-Strong-cyan)";

	let totalAmount = bill * (tip / 100) + bill;

	let AmountPerPerson = totalAmount / numberOfPeople;

	let tipPerPerson = (totalAmount - bill) / numberOfPeople;

	updateUI(AmountPerPerson, tipPerPerson);
}

function updateUI(amount, tip) {
	displayTip.innerHTML = `<h1>$${tip.toFixed(2)}</h1>`;

	displayTotal.innerHTML = `<h1>$${amount.toFixed(2)}</h1>`;
}

resetButton.addEventListener("click", (e) => {
	displayTotal.innerHTML = `<h1>$0.00</h1>`;
	displayTip.innerHTML = `<h1>$0.00</h1>`;

	billInput.value = "";
	numberOfPeopleInput.value = "";
	customTipInput.value = "";

	bill = 0;
	numberOfPeople = 0;
	tip = 0;

	Array.from(selectTipInput.children).forEach((child) => {
		if (!child.classList.contains("tip-custom-input")) {
			child.style.backgroundColor = " var(--color-Very-dark-cyan)";
		}
	});
	e.currentTarget.style.backgroundColor = "var(--color-Dark-grayish-cyan2)";
});
