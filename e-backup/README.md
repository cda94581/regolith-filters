# e-backup
Version **0.0.2**

This filter backs up your target destination before exporting. Useful as an extra layer of saftey, in case you accidentally end up deleting everything you cared about. I did that on day one of using regolith, so this is to make it safer for all.

Simply works by copying the files from the target destination.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

The profile's export target MUST be set to `exact` for the filter to work.

Install this filter by running (`regolith install github.com/cda94581/regolith-filters/e-backup`). Apply the filters similar to the example:
```json
{
	"namespace": "test",
	"regolith": {
		"profiles": {
			"<Profile>": {
				"filters": [{
					"filter": "e-backup",
					"settings": {
						"profile": "<Profile>"
					}
				}],
				"export": {
					"target": "exact",
					"rpPath": "path/to/export/rp",
					"bpPath": "path/to/export/bp"
				}
			}
		}
	}
}
```

### Settings

Name | Default | Description
---- | ------- | -----------
`profile` | `dev` | This is used within the program. Set this to the same as your regolith profile.

## Changelog
### 0.0.2
- Updated filter to reflect proper description syntax

### 0.0.1
- Initial release