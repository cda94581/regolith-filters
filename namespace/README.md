# namespace
This filter automatically applies the namespace to all files. Useful for temporary namespaces, or whenever you want to change a namespace upon distribution.

The filter works by extracting the identifier from each file and splitting it into a namespace and an identifier. If no namespace is present, the namespace is then applied. If a namespace is already present, it will run through the settings to make sure the namespace is allowed to be replaced, and then replace it. By default, the "minecraft" and "minecon" namespaces will never be replaced.

This only affects the namespace in the `description -> identifier`. Event namespaces and such are still a WIP.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

```json
{
	"namespace": "test",
	"regolith": {
		"profiles": {
			"<Profile>": {
				"filters": [{
					"url": "github.com/cda94581/regolith-filters/namespace",
					"settings": {
						"ignored_namespaces": [ "tnt" ]
					}
				}]
			}
		}
	}
}
```

### Settings

Name | Default | Description
---- | ------- | -----------
`ignored_namespaces` | `[]` | A list of namespaces to ignore, you don't want to change these namespaces for whatever reason.