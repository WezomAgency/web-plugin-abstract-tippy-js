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
	_initialize () {
		this.tooltip = tippy(this.element, this.settings);
	}

	/** @protected */
	_afterInitialize () {
		super._afterInitialize();
	}

	/** @public */
	initialize () {
		this._setup();
		this._beforeInitialize();
		this._initialize();
		this._afterInitialize();
	}
}

/**
 * @typedef {Options} TippySettings
 * @property {boolean} [a11y] true
 * @property {boolean} [allowHTML] true
 * @property {boolean} [animateFill] true
 * @property {string} [animation] shift-away
 * @property {string} [appendTo] function appendTo() {return document.body}
 * @property {string} [aria] describedby
 * @property {boolean} [arrow] false
 * @property {string} [arrowType] sharp
 * @property {string} [boundary] scrollParent
 * @property {string} [content]
 * @property {number} [delay] 0
 * @property {number} [distance] 10
 * @property {number[]} [duration] [325, 275]
 * @property {boolean} [flip] true
 * @property {string} [flipBehavior] flip
 * @property {boolean} [flipOnUpdate] false
 * @property {boolean} [followCursor] false
 * @property {boolean} [hideOnClick] true
 * @property {boolean} [ignoreAttributes] false
 * @property {boolean} [inertia] false
 * @property {boolean} [interactive] false
 * @property {number} [interactiveBorder] 2
 * @property {number} [interactiveDebounce] 0
 * @property {boolean} [lazy] true
 * @property {number} [maxWidth] 350
 * @property {boolean} [multiple] false
 * @property {number} [offset] 0
 * @property {function} [onHidden]
 * @property {function} [onHide]
 * @property {function} [onMount]
 * @property {function} [onShow]
 * @property {function} [onShown]
 * @property {function} [onTrigger]
 * @property {string} [placement] top
 * @property {object} [popperOptions] {}
 * @property {string} [role] tooltip
 * @property {boolean} [showOnInit] false
 * @property {string} [size] regular
 * @property {boolean} [sticky] false
 * @property {string} [target]
 * @property {string} [theme] dark
 * @property {boolean} [touch] true
 * @property {boolean} [touchHold] false
 * @property {string} [trigger] mouseenter focus
 * @property {null} [triggerTarget] null
 * @property {number} [updateDuration] 0
 * @property {null} [wait] null
 * @property {number} [zIndex] 9999
 */

/**
 * @typedef {Object} TippyProps
 * @property {string} [contentElement] - CSS selector
 */
