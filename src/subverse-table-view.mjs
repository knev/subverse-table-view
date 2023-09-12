
let fetch = require('node-fetch');

//   curl --request POST \
//     --header 'content-type: application/json' \
//     --url 'http://127.0.0.1:4466/' \
//     --data '{"query":"query { subverse { name website description apis {\n  log_in {\n    name\n  }\n} } }"}'

const kstr_QUERY= `
	{ subverse { name website description apis {
			log_in {
				name
			}
		} } }			
`;

fetch('http://127.0.0.1:4466/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: kstr_QUERY })
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));



