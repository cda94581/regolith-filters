# minimize
Version **0.0.4**

This filter minimizes all JSON and JS files to save a tiny bit of space. Useful for larger files where whitespace takes up a lot of storage.

The filter simply works by parsing and then reformatting a JSON file. Given the `JSON.stringify()`'s behavior, it generates minimized unless additional parameters are specified.

As of right now, this only minimizes JSON. However, future Molang minmization & simplification is planned.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

Install this filter by running (`regolith install github.com/cda94581/regolith-filters/minimize`). Apply the filters similar to the example:

```json
{
	"filters": [
		{ "filter": "minimize" }
	]
}
```

## Changelog
### 0.0.4
- Updated JS minify with new proper endpoint

### 0.0.3
- Updated filter to reflect proper description syntax

### 0.0.2
- JS Minify

### 0.0.1
- Initial release