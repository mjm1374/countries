const continentSelect = document.querySelector('#continents');

fetch('https://countries.trevorblades.com/', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		query: `
        query {
            continents {
                name
                code
            }
        }`,
	}),
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		data.data.continents.forEach((continent) => {
			const option = document.createElement('option');
			option.value = continent.code;
			option.innerHTML = continent.name;
			continentSelect.append(option);
		});
	});
