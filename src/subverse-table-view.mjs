
const fetch = require('node-fetch');
const ejs = require('ejs');

//   curl --request POST \
//     --header 'content-type: application/json' \
//     --url 'http://127.0.0.1:4466/' \
//     --data '{"query":"query { subverse { name website description apis {\n  log_in {\n    name\n  }\n} } }"}'

let json_data_ = null;
const kstr_QUERY= `
query { subverse { name website description apis {
	log_in {
	  name
	  programmable
	  footnote
	}
	warp_in {
	  name
	  programmable
	  footnote
	}
	import_set_avatar {
	  name
	  programmable
	  footnote
	}
	import_asset {
	  name
	  programmable
	  footnote
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
[role="scrollable-table",cols="^1h,^1h,^1h,^1h,1h,^1h"]
|===
| Log in
| Warp in
| import/set Avatar
| import Asset
// | Inventory
// | Mic/Cam/Ctrls
| World/Subverse
| Warp out

<% subverse.forEach(function(s) { %>
| pass:[<div class="<%= (s.apis.log_in.programmable==undefined) ? 'bk-white' : s.apis.log_in.programmable ? 'bk-grn' : 'bk-red'  %>">]<%= s.apis.log_in.name %>pass:[</div>]
| pass:[<div class="<%= (s.apis.warp_in.programmable==undefined) ? 'bk-white' : s.apis.warp_in.programmable ? 'bk-grn' : 'bk-red'  %>">]<%= s.apis.warp_in.name %><%= s.apis.warp_in.footnote ? 'footnote:['+s.apis.warp_in.footnote+']' : '' %>pass:[</div>]
| pass:[<div class="<%= (s.apis.import_set_avatar.programmable==undefined) ? 'bk-white' : s.apis.import_set_avatar.programmable ? 'bk-grn' : 'bk-red'  %>">]<%= s.apis.import_set_avatar.name %>pass:[</div>]
| pass:[<div class="<%= (s.apis.import_asset.programmable==undefined) ? 'bk-white' : s.apis.import_asset.programmable ? 'bk-grn' : 'bk-red'  %>">]<%= s.apis.import_asset.name %>pass:[</div>]
| <%= s.name %>
|
<% }); %>
|===
`;

	const str_rendered = ejs.render(template, { subverse: json_data_.data.subverse });

	console.log(str_rendered);
}

fetchData();
