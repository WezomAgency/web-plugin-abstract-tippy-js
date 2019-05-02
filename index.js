'use strict';

/**
 * @module AbstractTippy
 * @author OlegDutchenko <dutchenko.o.dev@gmail.com>
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import tippy from 'tippy.js/esm/index';
import { WebPluginInterface } from 'web-plugin-interface';

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * @implements WebPluginInterface
 */
export class AbstractTippy extends WebPluginInterface {
	/**
	 * @param {HTMLElement} element
	 * @param {TippySettings} clientSettings
	 * @param {TippyProps} clientProps
	 */
	constructor (element, clientSettings, clientProps) {
		super();
		this.element = element;

		/**
		 * @type {Tippy}
		 */
		this.tippy = null;

		/**
		 * @type {TippyProps}
		 */
		this.props = {};
		this.clientProps = clientProps;

		/**
		 * @type {TippySettings}
		 */
		this.settings = {};
		this.clientSettings = clientSettings;
	}

	/**
	 * @type {TippyProps}
	 */
	get defaultProps () {
		return super.defaultProps;
	}

	/**
	 * @type {TippySettings}
	 */
	get defaultSettings () {
		return super.defaultSettings;
	}

	/** @protected */
	_setup () {
		this.props = Object.assign(this.defaultProps, this.clientProps);
		this.settings = Object.assign(this.defaultSettings, this.clientSettings);
		if (this.props.contentElement) {
			let contentElement = document.querySelector(this.props.contentElement);
			if (contentElement !== null) {
				this.settings.content = contentElement.innerHTML;
			}
		}
		delete this.clientProps;
		delete this.clientSettings;
	}

	/** @protected */
	_beforeInitialize () {
		super._beforeInitialize();
	}

	/** @protected */
	_afterInitialize () {
		super._afterInitialize();
	}

	/** @public */
	initialize () {
		this._setup();
		this._beforeInitialize();
		this.tooltip = tippy(this.element, this.settings);
		this._afterInitialize();
	}
}

/**
 * @typedef {Options} TippySettings
 */

/**
 * @typedef {Object} TippyProps
 * @property {string} [contentElement] - CSS selector
 */
