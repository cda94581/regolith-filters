# export
This filter exports the behavior pack and resource pack into a ".mcaddon" file, ready for distribution.

Umm...I don't need to explain how it works, do I? Well, I mean it just compresses the file into a ".zip" format, then renames it. It just does it automatically for you so you don't have to manually do it.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

```json
{
	"filters": [
		{ "url": "github.com/cda94581/regolith-filters/export" }
	]
}
```