# export
Version **0.0.2**

This filter exports the behavior pack and resource pack into a ".mcaddon" file, ready for distribution.

Umm...I don't need to explain how it works, do I? Well, I mean it just compresses the file into a ".zip" format, then renames it. It just does it automatically for you so you don't have to manually do it.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

Install this filter by running (`regolith install github.com/cda94581/regolith-filters/export`). Apply the filters similar to the example:

```json
{
	"filters": [
		{
			"filter": "export",
			"settings": {
				"exclude": [ "RP" ]
			}
		}
	]
}
```

### Settings

Name | Default | Description
---- | ------- | -----------
`exclude` | `[]` | Exclude BPs or RPs from being exported.

#### exclude
Allowed values: `BP`, `RP`

## Changelog
### 0.0.2
- Exclusion of Certain Files

### 0.0.1
- Initial release