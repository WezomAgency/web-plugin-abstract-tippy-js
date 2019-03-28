'use strict';

/**
 * @module AbstractSlickCarousel
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

export class AbstractTippy extends WebPluginInterface {
	/**
	 * @param {HTMLElement} element
	 * @param {TippySettings} clientSettings
	 */
	constructor (element, clientSettings) {
		super();
		/** @type {TippySettings} */
		this.settings = {};
		this.element = element;
		this.clientSettings = clientSettings;
		this.tooltip = null;
	}

	/** @protected */
	_setup () {
		this.settings = Object.assign(this.defaults, this.clientSettings);
		if (this.settings._contentElement) {
			let contentElement = document.querySelector(this.settings._contentElement);
			if (contentElement !== null) {
				this.settings.content = contentElement.innerHTML;
			}
		}
		delete this.settings._contentElement;
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

	/**
	 * @public
	 * @return {Object}
	 */
	get defaults () {
		return super.defaults;
	}
}

/**
 * @typedef {Object} TippySettings
 * @property {boolean} [_contentElement] - true
 * @property {boolean} [a11y] - true
 * @property {boolean} [allowHTML] - true
 * @property {boolean} [animateFill] - true
 * @property {string} [animation] - "shift-away | shift-toward | fade | scale | perspective"
 * @property {Element|Function} [appendTo] - document.body
 * @property {boolean} [arrow] - false
 * @property {string} [arrowType] - "sharp | round"
 * @property {string} [arrowTransform] - " | ~scaleX(2)"
 * @property {string|Element} [content] - ""
 * @property {number|number[]} [delay] - [0, 20] ~ [show, hide]
 * @property {number|number[]} [duration] - [275, 50] ~ [show, hide]
 * @property {number} [distance] - 10
 * @property {boolean} [flip] - true
 * @property {string|string[]} [flipBehavior] - "flip"
 * @property {boolean|string} [followCursor] - false | "vertical" | "horizontal"
 * @property {string} [theme] - "dark" | "light" | "light-border"
 * @property {string} [trigger] - "mouseenter" | "focus" | "click" | "manual"
 */
