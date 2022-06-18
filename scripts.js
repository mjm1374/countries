const continentSelect = document.querySelector('#continents');
const countryList = document.querySelector('#country-list');

continentSelect.addEventListener('change', async (e) => {
	const continentCode = e.target.value;
	const countires = await getContinentCountries(continentCode);
});

function queryFetch(query, variables) {
	return fetch('https://countries.trevorblades.com/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: query,
			variables: variables, // must be names variables.
		}),
	}).then((res) => res.json());
}

function getContinentCountries(continentCode) {
	console.log(continentCode);
	return queryFetch(
		`query getCountries($code:  ID!)
        {
            continent(code: $code) {
                countries{
                    name
                }
            }
        }`,
		{ code: continentCode }
	).then((data) => {
		console.log(data.data.continent.countries);
		const countires = data.data.continent.countries;
		countryList.innerHTML = '';
		countires.forEach((country) => {
			const element = document.createElement('div');
			element.innerHTML = country.name;
			countryList.appendChild(element);
		});
	});
}

queryFetch(
	`
        query {
            continents {
                name
                code
            }
        }`
).then((data) => {
	console.log(data);
	data.data.continents.forEach((continent) => {
		const option = document.createElement('option');
		option.value = continent.code;
		option.innerHTML = continent.name;
		continentSelect.append(option);
	});
});
