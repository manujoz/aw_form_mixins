import "/node_modules/aw_polymer_3/polymer/polymer-element.js";

export const AwInputCharCounterMixin = superclass => class extends superclass {
	static get properties() {
		return {
			/** Indica si se debe mostrar el contador de caracteres */
			countchar: { type: Boolean },
		}
	}

	constructor() {
		super();

		this.countchar = false;
		this.countCharStr = "0";
	}

	/**
	 * @method	set_countchar
	 * 
	 * Activa el contador en el input
	 */
	set_countchar() {
		if( this.countchar ) {
			if ( !this.maxlength ) {
				this.countCharStr = this.inputElement.value.length;
			} else {
				this.countCharStr = this.inputElement.value.length + "/" + this.maxlength;
			}
		}
	}

	/**
	 * @method update_countchar
	 * 
	 * Actualiza el contador con el nuevo valor
	 */
	update_countchar() {
		if ( this.countchar ) {
			if ( !this.maxlength ) {
				this.countCharStr = this.inputElement.value.length;
			} else {
				this.countCharStr = this.inputElement.value.length + "/" + this.maxlength;
			}
		}
	}
	
	/**
	 * @method	_focusin
	 * 
	 * Pone el contador en focused
	 */
	_focusin() {
		this.shadowRoot.querySelector( "aw-char-counter" ).setAttribute( "focused" , "" );
	}
	
	/**
	 * @method	_focusout
	 * 
	 * Quita el focused del contador
	 */
	_focusout() {
		this.shadowRoot.querySelector( "aw-char-counter" ).removeAttribute( "focused" );
	}
	
	/**
	 * @method	_keyup
	 * 
	 * Actualiza el contador al levantar la tecla del input
	 */
	_keyup( ev ) {
		this.update_countchar();
	}
};