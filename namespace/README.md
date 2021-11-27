# namespace
This filter automatically applies the namespace to all files. Useful for temporary namespaces, or whenever you want to change a namespace upon distribution.

The filter works by extracting the identifier from each file and splitting it into a namespace and an identifier. If no namespace is present, the namespace is then applied. If a namespace is already present, it will run through the settings to make sure the namespace is allowed to be replaced, and then replace it. By default, the "minecraft" and "minecon" namespaces will never be replaced.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

```json
{
	"namespace": "namespace",
	"regolith": {
		"profiles": {
			"<Profile>": {
				"filters": [{
					"url": "github.com/cda94581/regolith-filters/namespace",
					"settings": {
						"type": "keys",
						"ignoredNamespaces": [ "tnt" ]
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
`type` | `keys` | The type of namespace replacement to use.
`ignoredNamespaces` | `[]` | A list of namespaces to ignore, you don't want to change these namespaces for whatever reason.
`oldNamespace` | `namespace` | The previous namespace, which will be replaced.

#### type
There are two possible values for the `type` setting. A detailed explanation is found below.

##### keys
The `keys` type runs through the key/value pairs of all the files and finds any of the keys or values which follow the format `namespace:identifier`, or should do so, and replaces the key/values as such.   
This is the recommended type, as it is safer to use. This type uses the `ignoredNamespaces` setting.

###### Known Issues
- Molang may be messed up with this
- Keys are not changed

##### find
This is an agressive type which runs through the files and replaces everything that matches a pattern, specified by `oldNamespace`. This guarantees those with a namespace are replaced.  
While using this type, be extremely cautious in your file to not use the string where you don't want it to be replaced. Doing so will replace string. This type uses the `oldNamespace` setting.

## Changelogs
### 0.0.3
- Handle errors for invalid namespace replacement types
- Implemented workable version of `keys` type

### 0.0.2
- Changed default new namespace from `test` to `newNamespace`
- Changed ignored namespaces key setting `ignored_namespaces` to `ignoredNamespaces`
- Changed default ignored namespaces from `[ 'test', 'minecraft', 'minecon' ]` to `[ 'minecraft', 'minecon' ]`
- Added `type` setting
- Moved code into the `keys` type
- Temporarily disabled `keys` type
- Implemented the `find` type
- Added `oldNamespace` setting

### 0.0.1
- Released first version