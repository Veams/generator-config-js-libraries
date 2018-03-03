'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const config = require('./config');

module.exports = class extends Generator {
	initializing() {
		this.globalStore = this.options.__store;
		this.choices = this.options.choices || Object.keys(config).map(item => config[item]);
	}

	prompting() {

		const prompts = [
			{
				name: 'jsLibraries',
				type: 'checkbox',
				message: 'Do you want to use any further JavaScript libraries?',
				choices: [
					{
						name: '@veams/query',
						value: config.veamsQueryId,
						checked: false
					},
					{
						name: 'jQuery (latest Version)',
						value: config.jqueryId,
						checked: false
					},
					{
						name: 'Handlebars',
						value: config.handlebarsId,
						checked: false
					},
					{
						name: 'Redux',
						value: config.reduxId,
						checked: false
					},
					{
						name: 'RxJS',
						value: config.rxjsId,
						checked: false
					}
				].filter(choice => this.choices.includes(choice.value)),
				validate: function (chosenAnswer) {
					let done = this.async();

					if (chosenAnswer.indexOf(config.jqueryId) != -1 && chosenAnswer.indexOf(config.veamsQueryId) != -1) {

						done("Please choose only one of the two DOM handler libraries.", false);
					}

					done(null, true);
				}
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	configuring() {
		if (this.globalStore) {
			this.globalStore.set('jsLibraries', this.props.jsLibraries);
		} else {
			this.config.set('jsLibraries', this.props.jsLibraries);
		}
	}
};
