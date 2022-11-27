# regolith-filters
If you're stalking my GitHub and you aren't aware, [*regolith*](https://bedrock-oss.github.io/regolith/) is this new amazing add-on compiler that now exists, or at least is close to existing sometime soon.  
[*regolith*](https://bedrock-oss.github.io/regolith/) speeds up your Bedrock Edition add-on workflow by adding "filters", which are lines of code that are run on the add-on before it is published to its desired location. This can save repetitive tasks to make your development much more efficient.  
If you're on Windows and you don't use it, you're living under a rock 😉.

Contained within this repository are filters that I've created. No idea if you'll benefit from them, but here they are.

## IMPORTANT: Safety Warning
If *regolith* is abused, your device may be vulnerable. *regolith* has no limitations. This means that anything that can be done in regular programming can be done with *regolith*, including any malicious intent.

Quoting from the [docs on safety](https://bedrock-oss.github.io/regolith/docs/safety.html):
> Software sandboxing is extremely difficult, especially since Regolith offers run targets in three languages, as well as a native shell integration.  
Sandboxing would also limit the things our users can do. Currently, anything possible with programming can be integrated with Regolith! Sandboxing would limit this.  
Additionally, we believe sandboxing may give our users a false sense of security. Since no sandbox is foolproof, we prefer our users to operate with full caution, rather than trust an imperfect solution to guard them.

Use **EXTREME** caution while installing third-party filters. These are anything that isn't maintained by the [Bedrock OSS Community](https://github.com/Bedrock-OSS/regolith-filters). This includes my filters in this repository.

While I want all my filters are safe and secure, you have no way of knowing that. Therefore, you need to trust me before you install any of these filters. Use caution and do research.  
Like the documentation on safety from *regolith*, I would rather not give you a false sense of security.

Still here? Cool, just don't say I didn't warn you.

## Usage
Before using these filters, it is highly recommended you read the [getting started](https://bedrock-oss.github.io/regolith/docs/getting-started) guide for *regolith*. Get familiar with the `config.json` and the standardized [project configuration standard](https://github.com/Bedrock-OSS/project-config-standard). After that, read on.

In order to add any of these filters, you must open the `config.json` file and apply a filter to the profile you plan on using:
```json
{
  "profiles": {
	"dev": {
	  "filters": [
		{
			"url": "FILTER_REPO_FOLDER"
		}
	  ]
	}
  }
}
```

Replace `FILTER_REPO_FOLDER` with the filter, in the format: `github.com/cda94581/regolith-filters/<FILTERNAME>`, replacing `<FILTERNAME>` with the folder containing the filter you would like.

Afterwards, run `regolith install` to install the filters. Finally, you may `regolith run [PROFILE]` in order to build your add-on with the filters.  
Additional information about each filter may be provided in a `README.md` file, in that folder.

## *regolith* Filter Ideas
Below is just a list of ideas I have for different filters, I may work on them someday. Knowing me, I'll likely use JS because it's most familiar for me.

- [ ] Minimize JSON
	- [x] Minimize the JSON
	- [x] Minimize JS
	- [ ] Minimize Molang
	- [ ] Molang may require a parser? Create one/experiment with available npm packages?
	- [ ] Condense Molang variables/queries/etc. to `v.`/`q.`
- [ ] Automated Texts Localization
	- [ ] The first `//` comment of a file will be the name of a item/block/entity/etc. Can then strip the names and generate the localization files automatically.
- [ ] Auto-Apply Namespace
	- [x] Just type an identifier for blocks/items/entities/etc., namespace will be added upon deployment.
	- Useful for temporary namespaces.
	- [ ] Component Groups & Events
- [ ] Obfuscate
	- [ ] Confusify the JSON in order to slow down those trying to steal code
	- [ ] Random Comments
	- [ ] Random JSON (in a way that still allows MC to open)
	- [ ] Rename Files
	- [ ] Dummy Files
	- Not foolproof
- [ ] Add-on Watermark
	- [ ] Create a watermark for your add-on so all users will know the creator
- [x] Add-on Export
	- [x] Exports the add-on into a ".mcaddon" file so that you can be lazy
- [ ] Syntax Validation & Warnings
	- [ ] Validate all add-on syntax
	- [ ] Proactively warn users of any content logs they may experience
- [ ] Add-on Style Guide
	- [ ] Redefine everything in each file to follow the Bedrock Wiki's [style guide](https://wiki.bedrock.dev/meta/style-guide.html)
- [x] Export Backup
	- [x] Copy and backup the export target before exporting
	- This may be oddly specific to me, but useful as an extra layer of safety
- [ ] Manifest Generator
	- [ ] Helpful parameters to grab information from other files such as READMEs and whatnot
	- Helps to reduce some redundant manifest typing...but I guess it's also kind of pointless
- [ ] Contents File Generator
- [ ] Download VPs
	- Another useless one considering it's literally downloading and extracting 100 mb of stuff that could be used for thing better

Well, I guess I should get to work on these filters at some point. Typing will get me nowhere :>.