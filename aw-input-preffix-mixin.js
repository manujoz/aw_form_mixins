import "../aw_polymer_3/polymer/polymer-element.js";

export const AwInputPrefixMixin = superclass => class extends superclass {
	static get properties() {
		return {
			prefixStyles: {
				type: Object,
				value: {}
			}
		}
	}
	
	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
		
		this.prefixStyles = {
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		};

		this.prefixs = [];
		this.suffixs = [];
	}
	
	/**
	 * @method	findPrefixAndSuffixs
	 * 
	 * Busca los prefix y los suffixs del componente.
	 */
	findPrefixAndSuffixs() {
		const childs = this.childNodes;

		for ( let i = 0; i < childs.length; i++ ) {
			if ( childs[ i ].tagName === "PREFIX" || childs[ i ].tagName === "prefix" ) {
				this._putPrefix( childs[ i ] );
			}

			if ( childs[ i ].tagName === "SUFFIX" || childs[ i ].tagName === "suffix" ) {
				this._putSuffix( childs[ i ] );
			}
		}

		// Ajustamos el paddingRight si hay data list
		
		if ( this.datalist ) {
			this.prefixStyles.padding.right = 25;
		}

		if ( this.prefixs.length > 0 || this.suffixs.length > 0 ) {
			setTimeout(() => {
				this._adjustPrefixSuffixs()
			}, 100);
		}
	}

	/**
	 * @method	_putPrefix
	 * 
	 * Añade un prefix al input.
	 * 
	 * @param	{node}			el		Nodo con el prefix a añadir.
	 */
	_putPrefix( el ) {
		el.classList.add("prefix");
		this.$.container.appendChild( el );
		this.prefixs.push( el );
	}

	/**
	 * @method	_putSuffix
	 * 
	 * Añade un suffix al input.
	 * 
	 * @param	{node}			el		Nodo con el suffix a añadir.
	 */
	_putSuffix( el ) {
		el.classList.add("suffix");
		this.$.container.appendChild( el );
		this.suffixs.push( el );
	}

	/**
	 * @method	_adjustPrefixSuffixs
	 * 
	 * Enmarca los prefixs y los suffixs en el componente.
	 */
	_adjustPrefixSuffixs() {
		let input = ( this.inputVisible ) ? this.inputVisible : this.inputElement;

		if( this.tagName.indexOf( "-DF" ) > -1 ) {
			this.prefixStyles.padding.right += 7;
			this.prefixStyles.padding.left += 7;
		}
		
		var fontSize = parseInt( window.getComputedStyle( input, null ).fontSize.replace( "px", "" ));
		var paddgingTopDf = parseInt( window.getComputedStyle( this.$.container, null ).paddingTop.replace( "px", "" ));
		
		for( let i = 0; i < this.prefixs.length; i++ ) {
			var el = this.prefixs[ i ];

			// Ponemos el ancho si es iron-icon

			if( el.children[ 0 ] && el.children[ 0 ].tagName === "IRON-ICON" ) {
				this._calcIronIconSufix( el, fontSize );
			}

			// Ponemos el ancho si es imagen.

			if( el.children[ 0 ] && el.children[ 0 ].tagName === "IMG" ) {
				this._calcImgSufix( el, fontSize );
			}

			// Calculamos la posición del prefix

			var hInput = input.offsetHeight;
			var hPrefix = el.offsetHeight;
			var prefixTop = parseInt( window.getComputedStyle( el, null ).top.replace( "px", "" ));

			el.style.top = ((hInput / 2) - (hPrefix / 2 ) + prefixTop) + "px";
			el.style.left = this.prefixStyles.padding.left + "px";

			// Ajustamos los parámetros.

			this.prefixStyles.padding.left += el.offsetWidth + 2;
			input.style.paddingLeft = this.prefixStyles.padding.left + "px";

			// Ajustamos el left del label si no es DF.

			if( this.tagName.indexOf( "-DF" ) == -1 ) {
				this.$.label.style.left = this.paddingLeft + "px";
			}
			// Mostramos el prefix

			el.setAttribute( "show", "" );
		}

		for( let i = 0; i < this.suffixs.length; i++ ) {
			var el = this.suffixs[ i ];

			// Ponemos el ancho si es iron-icon

			if( el.children[ 0 ] && el.children[ 0 ].tagName === "IRON-ICON" ) {
				this._calcIronIconSufix( el, fontSize );
			}

			// Ponemos el ancho si es imagen.

			if( el.children[ 0 ] && el.children[ 0 ].tagName === "IMG" ) {
				this._calcImgSufix( el, fontSize );
			}

			// Calculamos la posición del prefix

			var hInput = input.offsetHeight;
			var hPrefix = el.offsetHeight;
			var prefixTop = parseInt( window.getComputedStyle( el, null ).top.replace( "px", "" ));

			el.style.top = ((hInput / 2) - (hPrefix / 2 ) + prefixTop) + "px";
			el.style.right = this.prefixStyles.padding.right + "px";

			// Ajustamos los parámetros.

			this.prefixStyles.padding.right += el.offsetWidth + 2;
			input.style.paddingRight = this.prefixStyles.padding.right + "px";

			// Mostramos el prefix

			el.setAttribute( "show", "" );
		}
	}

	/**
	 * @method	_calcIronIconSufix
	 * 
	 * Calcula el alto y y ancho del preffix y suffix si es un iron-icon.
	 * 
	 * @param	{node}		el			IRON-ICON que se está calculando.
	 * @param	{number}	fontSize	Tamaño de la fuente del input.
	 */
	_calcIronIconSufix( el, fontSize ) {
		if ( fontSize !== 16 ) {
			var alto100 = 16
			var anMod = ( fontSize * 22 ) / alto100;

			el.style.height = anMod + "px";
			el.style.width = anMod + "px";
		}
	}

	/**
	 * @method	_calcImgSufix
	 * 
	 * Calcula el alto y y ancho del preffix y suffix si es una imagen.
	 * 
	 * @param	{node}		el			Imagen que se está calculando.
	 * @param	{number}	fontSize	Tamaño de la fuente del input.
	 */
	_calcImgSufix( el, fontSize ) {
		if ( fontSize < 16 ) {
			el.style.bottom = "8px";
		}
	}
}