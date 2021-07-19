import "../aw_polymer_3/polymer/polymer-element.js";

export const AwInputErrorMixin = superclass => class extends superclass {
	static get properties() {
		return {
			/** Pone el input en modo error */
			error: { type: Boolean },
			/** El mensaje de error que se va a mostrar */
			errmsg: { type: String },
			/** No se mostrarán los errores */
			noerrors: { type: Boolean },
		}
	}

	constructor() {
		super();

		this.error = false;
		this.errmsg = "";
		this.noerrors = false;

		/** @type {MutationObserver} */
		this.observerErr = undefined;
	}
	
	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar cuando el componente se desconecta.
	 */
	disconnectedCallback(){
		super.disconnectedCallback();

		// Dejamos de escuchar los cambios en el input

		this.observerErr.disconnect();
	}

	/**
	 * @method	error_listen
	 * 
	 * Pone a la escucha los errores en el input
	 */
	error_listen() {
		if( this.noerrors ) {
			return false;
		}

		// Escuhamos los cambios en el input
		
		this.observerErr = new MutationObserver( ev => this._error_handler( ev ));
        this.observerErr.observe( this.inputElement, { attributes: true, attributeOldValue: true, attributeFilter: ['class', "errmsg"] });
	}

	/**
	 * @method	_errorHandler
	 * 
	 * Manjea el error en el input cuando detecta algún cambio en alguno de sus atributos.
	 * 
	 * @param	{object}		ev		Evento devuelto por el observe.
	 */
	_error_handler( ev ) {
		// Si cambia el atributo error

		if ( ev[ 0 ].attributeName === "errmsg" ) {
			if ( this.inputElement.attributes.errmsg && this.inputElement.attributes.errmsg.value !== "" ) {
				this.error = true;
				this.errmsg = this.inputElement.attributes.errmsg.value;
			} else {
				this.error = false;
				this.errmsg = "";
			}
		}
		
		// Si cambia el atributo clase

		if ( ev[ 0 ].attributeName === "class" ) {
			let clases = this.inputElement.className;

			if ( clases && new RegExp("(^|\\s)error(\\s|$)").test( clases ) ) {
				this.error = true;
				this.errmsg = (this.inputElement.attributes.errmsg) ? this.inputElement.attributes.errmsg.value : "";
			} else {
				this.error = false;
				this.errmsg = "";
			}
		}

		// Mostramos el error
		
		this._show_error();
	}

	/**
	 * @method	_show_error
	 * 
	 * Muestra el error en el input.
	 */
	_show_error() {
		let charcounter = this.shadowRoot.querySelector( "aw-char-counter" );

		if ( this.error ) {
			// Generales
			
			this.$.baseline && this.$.baseline.setAttribute( "error" , "" );
			this.$.label && this.$.label.setAttribute( "error" , "" );
			this.$.container && this.$.container.setAttribute( "error", "" );
			
			// Contador de caracteres
			
			charcounter && charcounter.setAttribute( "error" , "" );
			
			// Botón del input file
			
			this.buttonFile && this.buttonFile.setAttribute( "error" , "" );
			
			// Específicos del checkbox
			
			this.$.aw_div_checkbox && this.$.aw_div_checkbox.setAttribute( "error" , "" );
			this.$.subtitle && this.$.subtitle.setAttribute( "error" , "" );
		} else {
			// Generales
			
			this.$.baseline && this.$.baseline.removeAttribute( "error" );
			this.$.label && this.$.label.removeAttribute( "error" );
			this.$.container && this.$.container.removeAttribute( "error", "" );
			
			// Contador de caracteres
			
			charcounter && charcounter.removeAttribute( "error" );
			
			// Botón del input file
			
			this.buttonFile && this.buttonFile.removeAttribute( "error" );
			
			// Específicos del checkbox
			
			this.$.aw_div_checkbox && this.$.aw_div_checkbox.removeAttribute( "error" );
			this.$.subtitle && this.$.subtitle.removeAttribute( "error" );
		}
	}
};