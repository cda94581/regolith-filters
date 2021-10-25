# minimize
This filter minimizes all JSON files to save a tiny bit of space. Useful for larger files where whitespace takes up a lot of storage.

The filter simply works by parsing and then reformatting a JSON file. Given the `JSON.stringify()`'s behavior, it generates minimized unless additional parameters are specified.

As of right now, this only minimizes JSON. However, future Molang minmization & simplification is planned.

## Usage
```json
{
	"filters": [
		{ "url": "github.com/cda94581/regolith-filters/minimize" }
	]
}
```