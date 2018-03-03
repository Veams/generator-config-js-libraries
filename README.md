# generator-config-js-libraries (`@veams/generator-config-js-libraries`)
> Sub-Generator :: Simple JavaScript Libraries Config Generator.

## Sub-Generators in Veams 

Sub-Generators are only responsible to provide prompts and save the answers in a configuration file or in the passed store instance.

Sub-Generators should be used in a composable way, means they are only useful in conjunction with main generators.

## Installation

Be sure you have a main generator in place. Then you can install the generator into that: 

### NPM 

```bash
npm install @veams/generator-config-js-libraries --dev
```

### Yarn 

```bash
yarn add @veams/generator-config-js-libraries
```

## Usage 

Now you can start to work with the sub generator in your main generator. 
This is pretty easy, let's just compose them:

**Main Generator** 

``` js
module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(`Welcome to the my main generator ${chalk.red('generator-single-page-app')}!`);
	}

	initializing() {
		this.composeWith(require.resolve('generator-config-js-libraries'), {
			__store: this.config
		});

	}

	configuring() {
		this.config.save();
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('dummyfile.txt.ejs'),
			this.destinationPath('dummyfile.txt'),
			{
				setup: this.config.getAll()
			}
		);
	}

	install() {
		this.installDependencies();
	}
};

```

You can also see, that we pass the config object (`this.config`) - which is a store instance - from the main generator to the sub generator. 

When the store instance is provided like that (`this.options.__store`), then this sub generator is saving the answers in this store instance.

## Getting To Know Yeoman

Yeoman is used to simplify the creation of generators ...

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).


## License

MIT © [Sebastian Fitzner]()
