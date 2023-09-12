
const fetch = require('node-fetch');
const ejs = require('ejs');

//   curl --request POST \
//     --header 'content-type: application/json' \
//     --url 'http://127.0.0.1:4466/' \
//     --data '{"query":"query { subverse { name website description apis {\n  log_in {\n    name\n  }\n} } }"}'

let json_data_ = null;
const kstr_QUERY= `
	{ subverse { name website description apis {
			log_in {
				name
			}
		} } }			
`;

async function fetchData() {
	try {
		const response = await fetch('http://127.0.0.1:4466/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: kstr_QUERY })
		});
		
		const json = await response.json();
		json_data_ = json;
		
		processGlobalData();
	} catch (err) {
		console.log(err);
	}
}

async function processGlobalData() {
	console.assert (json_data_ !== null);
	console.log("data:", json_data_.data);

    const template = `
<table border="1">
<thead>
	<tr>
	<th>Name</th>
	<th>Website</th>
	<th>Description</th>
	</tr>
</thead>
<tbody>
	<% subverse.forEach(function(item) { %>
	<tr>
		<td><%= item.name %></td>
		<td><%= item.website ? item.website : 'N/A' %></td>
		<td><%= item.description ? item.description : 'N/A' %></td>
	</tr>
	<% }); %>
</tbody>
</table>
`;

	const renderedHtml = ejs.render(template, { subverse: json_data_.data.subverse });

	console.log(renderedHtml);
}

fetchData();
