const form = document.forms["ec-form"];

const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const { input, method } = [...new FormData(form)].reduce(
		(acc, [key, val]) => ({ ...acc, [key]: val }),
		{}
	);

	let output = "";

	try {
		output = window[method](String(input));
	} catch (error) {
		console.log(error);
		output = error;
	}

	result.textContent = output;

	result.addEventListener("click", () => {
		const message = document.querySelector(".message");

		navigator.clipboard
			.writeText(output)
			.then(() => {
				message.textContent = "Copied to clipboard";
			})
			.catch((err) => {
				message.textContent = "Copy Error";
			})
			.finally(() => {
				setTimeout(() => {
					message.textContent = "";
				}, 1000);
			});
	});
});
