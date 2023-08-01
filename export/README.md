# export
Version **0.0.4**

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
				"output": "myAddon{{var1}}.mcaddon",
				"variables": {
					"var1": "Hi"
				},
				"exclude": [ "RP" ],
				"include": [
					{
						"source": "README.md",
						"fromRoot": false,
						"path": "README.md",
						"format": "md"
					}
				]
			}
		}
	]
}
```

### Settings

Name | Default | Description
---- | ------- | -----------
`output` | `{{name}}.mcaddon` | Output file path
`variables` | `{}` | Defines some variables that can be used in the `output` setting
`exclude` | `[]` | Exclude BPs or RPs from being exported
`include` | `[]` | Include additional files/folders that may assist with packaging

#### output
Will be exported to the root of the project. Can use custom [variables](#variables) in the path

#### variables
Object in key/value formats for custom variables in the [`output`](#output) field. Referenced with the `{{variable}}` syntax

#### exclude
Allowed values: `BP`, `RP`

#### include
Array of objects which include additional properties

##### source
REQUIRED

Source of the file/folder in relation to the `packs/data` folder by default (see [fromRoot](#fromroot))

##### fromRoot
OPTIONAL

Used with [source](#source), if set to `true`, the source will be in relation to the root of the project

If not included, this behaves as through it is set to false

##### path
OPTIONAL

Output path in relation to the root of the zip

If not included, this will be the same as the source, except it will be located directly in the root of the zip

##### format
OPTIONAL

Allowed values: `md`, `txt`, `none`

All this does is mess with the § text formatting to make it easier to use one file for multiple purposes
- `md` also works for html files, essentially replaces all of them with proper `<span>` colored/formatted text
- `txt` completely strips all of the formatting for a "clean" text experience
- `none` behaves as if the option does not exist

If not included, this will not change the text files at all

## Changelog
### 0.0.4
- Added new settings to assist with exporting and packaging add-ons: [output](#output), [variables](#variables), [include](#include)
- Refactored how exporting works with the use of the `ROOT_DIR` enviornment variable
- Fixed a bug in which removing the `exclude` setting could cause issues

### 0.0.3
- Updated filter to reflect proper description syntax

### 0.0.2
- Exclusion of Certain Files

### 0.0.1
- Initial release