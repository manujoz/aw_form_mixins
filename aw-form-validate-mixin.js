import "/node_modules/aw_polymer_3/polymer/polymer-element.js";

export const AwFormValidateMixin = superclass => class extends superclass {
	static get properties() {
		return {
			validator: {
				type: Object,
				value: {
					messages: null
				}
			}
		}
	}

	__validateAwForm( inputs, form ) {
		for( var i = 0; i < inputs.length; i++ ) {
			var input = inputs[ i ];
			var errorRule = null;
			
			// Validamos el input
			
			if ( !input.novalidate ) {
				errorRule = this.__errorValidateInput( input, form );
			}
			
			// Si hay error de validación
			
			if ( errorRule ) {
				// Si la regla tiene un mensaje
				
				if( this.validator.messages && this.validator.messages[ errorRule ] ) {
					input.setAttribute( "errmsg", this.validator.messages[ input.name ] );
				}
				
				// Devolvemos el error
				
				return {
					error: true,
					errorRule: errorRule,
					errorField: input
				};
			}
		}
		
		return {
			error: false,
			errorRule: null,
			errorField: null
		};
	}
	
	__errorValidateInput( input, form ) {
		// Validamos si es email
		
		if(( input.type === "email" || input.hasAttribute( "isemail" )) && !this.__validateIsEmail( input )) {
			return "isemail";
		}
		
		// Validamos si es url
		
		if(( input.type === "url" || input.hasAttribute( "isurl" )) && !this.__validateIsUrl( input )) {
			return "isurl";
		} 
		
		// Validamso si es required
		
		if ( input.hasAttribute( "required" ) && !this.__validateIsRequired( input, form )) {
			return "required";
		}
		
		// Validamso si es nospaces
		
		if ( input.hasAttribute( "nospaces" ) && input.value !== "" && !this.__validateNoSpaces( input )) {
			return "nospaces";
		}
		
		// Validamos el minlength
		
		if( input.hasAttribute( "minlength" ) && !this.__validateIsMinLength( input )) {
			return "minlength";
		}
		
		// Validamos el rangelength
	   
		if( input.hasAttribute( "rangelength" ) && !this.__validateIsRangeLength( input )) {
			return "rangelength";
		}
		
		// Validamos si es número
	   
		if( input.hasAttribute( "isumber" ) && !this.__validateIsNumber( input )) {
			return "isumber";
		}
		
		// Validamos min
		
		if( input.hasAttribute( "min" ) && !this.__validateIsMin( input )) {
			return "min";
		}
		
		// Validamos max
		
		if( input.hasAttribute( "max" ) && !this.__validateIsMax( input )) {
			return "max";
		}
		
		// Validamos range
		
		if( input.hasAttribute( "range" ) && !this.__validateIsRange( input )) {
			return "range";
		}
		
		// Validamos range
		
		if( input.hasAttribute( "domains" ) && !this.__validateDomains( input )) {
			return "domains";
		}
		
		// Validamos si es fecha
		
		if(( input.type === "date" || input.hasAttribute( "isdate" )) && !this.__validateIsDate( input )) {
			return "isdate";
		} 
		
		// Validamos si es fecha previa
		
		if((( input.type === "date" && input.hasAttribute( "dateprevius" )) || ( input.hasAttribute( "isdate" ) && input.hasAttribute( "dateprevius" ))) && !this.__validateIsDateprevius( input )) {
			return "dateprevius";
		} 
		
		// Validamos si tiene una edad mínima
		
		if((( input.type === "date" && input.hasAttribute( "minage" )) || ( input.hasAttribute( "isdate" ) && input.hasAttribute( "minage" ))) && !this.__validateIsMinage( input )) {
			return "minage";
		} 
		
		// Validamos si es edad máxima
		
		if((( input.type === "date" && input.hasAttribute( "maxage" )) || ( input.hasAttribute( "isdate" ) && input.hasAttribute( "maxage" ))) && !this.__validateIsMaxage( input )) {
			return "false";
		} 
		
		// Validamos el security
		
		if( input.hasAttribute( "security" ) && !this.__validateSecurity( input )) {
			return "security";
		}
		
		// Validamos equalto
		
		if ( input.hasAttribute( "equalto" ) && form && !this.__validateEqualTo( input, form )) {
			return "equalto";
		}
		
		// Validamos número de teléfono
		
		if ( input.hasAttribute( "phonenumber" ) && !this.__validatePhonenumber( input )) {
			return "phonenumber";
		}
		
		// Validamos número de teléfono por paises
		
		if ( input.hasAttribute( "phonecountry" ) && !this.__validatePhonecountry( input )) {
			return "phonecountry";
		}
		
		// Validamos el pattern
		
		if( input.hasAttribute( "pattern" ) && !this.__validatePattern( input )) {
			return "pattern";
		}
		
		// Validamos el allowed para el input file
		
		if( input.hasAttribute( "allowed" ) && !this.__validateAllowed( input )) {
			return "allowed";
		}
		
		// Validamos el mincheck de un grupo de checkboxs
		
		if( input.hasAttribute( "mincheck" ) && !this.__validateMincheck( input, form )) {
			return "mincheck";
		}
		
		// Validamos el maxcheck de un grupo de checkboxs
		
		if( input.hasAttribute( "maxcheck" ) && !this.__validateMaxcheck( input, form )) {
			return "mincheck";
		}
		
		// Devolvemos true si la validación es correcta
		
		return false;
	}
	
	
	__validateIsEmail( input ) {
		var email = input.value;

		if( !email ) {
			input.setAttribute( "errmsg", "" );
			return true;
		}

		var se = email.split( "@" );
		if( !se[ 1 ] ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "isemail" ));
			input.focus();
			return false;
		}

		if( email.indexOf( "@", 0) === -1 || se[ 1 ].indexOf( ".", 0 ) === -1 ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "isemail" ));
			input.focus();
			return false;
		}

		input.setAttribute( "errmsg", "" );
		return true;
	}
	
	__validateIsUrl( input ) {
		var url = input.value;

		if( !/^(http|https|ftp)\:\/\//.test( url ) && url ) {
			url = "http://" + url;
		}

		var regexp = /^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;

		if (( !regexp.test( url )) && ( url )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "isurl" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsRequired( input, form ) {
		var value = input.value;
		
		if( input.type === "checkbox" || input.type === "radio" ) {
			value = false;
			
			if( input.hasAttribute( "checked" )) {
				value = true;
			}
		}
		
		if( input.type === "radio" ) {
			var checked = false;
			for( var i = 0; i < form.length; i++ ) {
				if( form[ i ].checked ) {
					checked = true;
				}
			}

			if( checked ) {
				value = true;
			}
		}
		
		if ( !value ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "required" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateNoSpaces( input ) {
		var value = input.value;
		var attr = input.getAttribute( "nospaces" );
		
		if ( attr === "autodel" ) {
			value = value.split( " " ).join( "" );
			input.value = value;
		} else {
			var regexp = /\s/;
			if ( regexp.test( value ) ) {
				input.setAttribute( "errmsg", this.__getMessagesValidate( input, "nospaces" ));
				input.focus();
				return false;
			}
		}
			
		input.setAttribute( "errmsg", "" );
		return true;
	}
	
	__validateIsMinLength( input ) {
		var minlength = parseInt( input.getAttribute( "minlength" ) );
		
		if ( input.value.length < minlength ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "minlength" [minlength] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsRangeLength( input ) {
		// Convertimos el valor a un array
		
		var rangelength = input.getAttribute( "rangelength" );
		
		rangelength = this.__converToArrayValidate( rangelength );
		
		// Validamos la regla
		
		if( input.value.length < parseInt( rangelength[ 0 ]) || input.value.length > parseInt( rangelength[ 1 ] )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "rangelength" [rangelength[ 0 ], rangelength[ 1 ]] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
			
		}
	}
	
	__validateIsNumber( input ) {
		var value = input.value;
		
		if( isNaN( value )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "isumber" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
			
		}
	}
	
	__validateIsMin( input ) {
		var min = parseInt( input.min );
		var valor = parseFloat( input.value );
		
		if ( isNaN( valor )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "min", [min] ));
			input.focus();
			return false;
		}
		
		if ( valor < min ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "min", [min] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsMax( input ) {
		var max = parseInt( input.max );
		var valor = parseFloat( input.value );
		
		if ( isNaN( valor )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "max", [max] ));
			input.focus();
			return false;
		}
		
		if ( valor > max ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "max", [max] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsRange( input ) {
		var value = parseInt( input.value );
		var range = input.getAttribute( "range" );
		range = this.__converToArrayValidate( range );
		
		if( isNaN( input.value )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "range", [range[ 0 ], range[ 1 ]] ));
			input.focus();
			return false;
		} else if ( value < parseInt( range[ 0 ] ) || value > parseInt( range[ 1 ] )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "range", [range[ 0 ], range[ 1 ]] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateDomains( input ) {
		var domains = input.getAttribute( "domains" );
		domains = this.__converToArrayValidate( domains );
		
		var find = false;			
		for( var i = 0; i < domains.length; i++ ) {
			var regexp = new RegExp( domains[ i ], 'g' );

			if (regexp.test( input.value )) {
				find = true;
				break;
			}
		}
		
		if( !find ) {
			input.setAttribute( "errmsg", "No hay ninguno de los dominios permitidos" );
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "domains" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsDate( input ) {
		if( !input.value ) {
			input.setAttribute( "errmsg", "" );
			return true;
		}
		
		var fecha = input.value;
		fecha = fecha.toString();
		fecha = fecha.replace( new RegExp( "/", 'g' ), "-" );
		
		var formato = "aaaa-mm-dd";
		if( input.hasAttribute( "isdate" )) {
			formato = input.getAttribute( "isdate" );
		}
		
		var aho = null;
		var mes = null;
		var dia = null;
		var fechaArr = fecha.split('-');
		if (formato === "aaaa-mm-dd") {
			aho = fechaArr[0];
			mes = fechaArr[1];
			dia = fechaArr[2];
		} else if (formato === "dd-mm-aaaa") {
			aho = fechaArr[2];
			mes = fechaArr[1];
			dia = fechaArr[0];
		} else if (formato === "mm-dd-aaaa") {
			aho = fechaArr[2];
			mes = fechaArr[0];
			dia = fechaArr[1];
		}
		
		var plantilla = new Date(aho, mes - 1, dia);//mes empieza de cero Enero = 0

		if ((!plantilla) || ((plantilla.getFullYear() !== aho) && (plantilla.getMonth() !== mes - 1) && (plantilla.getDate() !== dia))) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "isdate" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsDateprevius( input ) {
		var fecha = input.value;
		fecha = fecha.toString();
		fecha = fecha.replace( new RegExp( "/", 'g' ), "-" );
		
		var formato = "aaaa-mm-dd";
		if( input.hasAttribute( "isdate" )) {
			formato = input.getAttribute( "isdate" );
		}
		
		var aho = null;
		var mes = null;
		var dia = null;
		var fechaArr = fecha.split('-');
		if (formato === "aaaa-mm-dd") {
			aho = fechaArr[0];
			mes = fechaArr[1];
			dia = fechaArr[2];
		} else if (formato === "dd-mm-aaaa") {
			aho = fechaArr[2];
			mes = fechaArr[1];
			dia = fechaArr[0];
		} else if (formato === "mm-dd-aaaa") {
			aho = fechaArr[2];
			mes = fechaArr[0];
			dia = fechaArr[1];
		}

		var x = new Date();
		x.setFullYear(aho, mes - 1, dia);
		var today = new Date();

		if (x >= today) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "dateprevius" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsMinage( input ) {
		var edadmin = parseInt( input.getAttribute( "minage" ));
		
		var fecha = input.value;
		fecha = fecha.toString();
		fecha = fecha.replace( new RegExp( "/", 'g' ), "-" );
		
		var formato = "aaaa-mm-dd";
		if( input.hasAttribute( "isdate" )) {
			formato = input.getAttribute( "isdate" );
		}
		
		if ( edadmin > this.__calcularEdadValidate( fecha, formato )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "minage", edadmin ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateIsMaxage( input ) {
		var edadmax = parseInt( input.getAttribute( "maxage" ));
		
		var fecha = input.value;
		fecha = fecha.toString();
		fecha = fecha.replace( new RegExp( "/", 'g' ), "-" );
		
		var formato = "aaaa-mm-dd";
		if( input.hasAttribute( "isdate" )) {
			formato = input.getAttribute( "isdate" );
		}
		
		if ( edadmax < this.__calcularEdadValidate( fecha, formato )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "maxage", edadmax ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
		
	}
	
	__validateSecurity( input ) {
		var pass = input.value;
		var security = input.getAttribute( "security" );
		
		// Ponemos medium como valor por defecto
		
		if( security !== "low" && security !== "medium" && security !== "hight" && security !== "ultra" ) {
			security = "medium";
		}
		
		var regexp = null;
		
		// Comprobamos longitud

		if ((( security === "ultra" ) || ( security === "hight" )) && ( pass.length < 8 )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos 8 caracteres"] ));
			input.focus();
			return false;
		} else if( pass.length < 6 ){
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos 6 caracteres"] ));
			input.focus();
			return false;
		}
		
		// Seguridad ultra

		if ( security === "ultra" ) {
			regexp = /[\@\$\*\&\#\-\_\+\.\/\;\(\)\[\]\{\}\\\º\ª\%\!\¿\?\¡\^\~\·\¬]+/;

			if (!regexp.test(pass)) {
				input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos un símbolo"] ));
				input.focus();
				return false;
			}
		}
		
		// Seguridad alta

		if (( security === "ultra" ) || ( security === "hight" )) {
			regexp = /[0-9]+/;

			if (!regexp.test(pass)) {
				input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos un valor numérico"] ));
				input.focus();
				return false;
			}
		}
		
		// Seguridad media

		if (( security === "ultra" ) || ( security === "hight" ) || ( security === "medium" )) {
			regexp = /[a-z]+/;

			if (!regexp.test(pass)) {
				input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos una letra minúscula"] ));
				input.focus();
				return false;
			}

			regexp = /[A-Z]+/;

			if (!regexp.test(pass)) {
				input.setAttribute( "errmsg", this.__getMessagesValidate( input, "security", ["La contraseña debe tener al menos una letra mayúscula"] ));
				input.focus();
				return false;
			}
		}
		
		// Seguridad pasada
		
		input.setAttribute( "errmsg", "" );
		return true;
	}
	
	__validateEqualTo( input, form ) {
		var equalto = input.getAttribute( 'equalto' );
		var inputEq = form.children[ equalto ];

		if( !inputEq ) {
			for( var i = 0; i < form.children.length; i++ ) {
				if( form.children[ i ].name === equalto ) {
					inputEq = form.children[ i ];
					break;
				}
			}
		}
		
		if ( input.value !== inputEq.value ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "equalto" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validatePhonenumber( input ) {
		var telefono = input.value;
		
		telefono = telefono.toString();
		telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
		telefono = telefono.replace( new RegExp( "-", 'g' ), "" );
		telefono = telefono.replace( new RegExp( "\\.", 'g' ), "" );
		telefono = telefono.replace( new RegExp( "\\/", 'g' ), "" );

		var regexp = /^((\+\d{1,3})|(00\d{1,3}))?(\(\d{1,3}\))?([\d]){7,11}$/;

		if ( telefono && ( !regexp.test(telefono) || telefono.length < 8 )) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "phonenumber" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validatePhonecountry( input ) {
		var telefono = input.value;
		var paises = this.__converToArrayValidate( input.getAttribute( "phonecountry" ));
		var valido = false;

		if ( !telefono ) {
			input.setAttribute( "errmsg", "" );
			return true;
		}

		var regexp = null;
		var regexp2 = null;
		var regexp3 = null;
		
		// Recorremos el array con los paises
		
		for( var i = 0; i < paises.length; i++ ) {
			var country = paises[ i ];
			
			if ( country === "es" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );

				regexp = /^((\+34)|(0034))?(6|7|8|9)(\d){8}$/;

				if ( regexp.test( telefono ) ) {
					valido = country;
					break;
				}
			}

			if ( country === "uk" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "-", 'g' ), "" );

				regexp = /^((\+44(\(0\))?(1|2|3|7|8))|(0044(\(0\))?(1|2|7))|(0(1|2|7)))\d{9}$/;

				if ( regexp.test( telefono ) ) {
					valido = country;
					break;
				}
			}

			if ( country === "it" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "-", 'g' ), "" );

				regexp = /^((\+39)|(0039))?(0)(\d){5,9}$/;
				regexp2 = /^((\+39)|(0039))?(3)(\d){9}$/;
				regexp3 = /^((\+39)|(0039))?(80)(\d){7}$/;

				if ( regexp.test( telefono ) || regexp2.test( telefono ) || regexp3.test( telefono )) {
					valido = country;
					break;
				}
			}

			if ( country === "pt" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "-", 'g' ), "" );

				regexp = /^((\+351)|(00351))?(2|7|8|9)(\d){8}$/;

				if ( regexp.test( telefono ) ) {
					valido = country;
					break;
				}
			}

			if ( country === "fr" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "-", 'g' ), "" );

				regexp = /^((\+33)|(0033))?(0)?(1|2|3|4|5|6|8)\d{8}$/;

				if ( regexp.test( telefono ) ) {
					valido = country;
					break;
				}
			}

			if ( country === "us" ) {
				telefono = telefono.toString();
				telefono = telefono.replace( new RegExp( " ", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "-", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "\\.", 'g' ), "" );
				telefono = telefono.replace( new RegExp( "\\/", 'g' ), "" );

				regexp = /^((\+1)|(001))?(1?((\(\d{3}\))|(\d{3})))?\d{7}$/;

				if ( regexp.test( telefono ) ) {
					valido = country;
					break;
				}
			}
		}
		
		// Comprobamos si es válido
		
		if ( !valido ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "phonecountry" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			input.value = this.__sortTelephoneValidate( telefono, valido );
			return true;
		}
	}
	
	__validatePattern( input ) {
		var regExp = new RegExp( input.pattern );
		
		if ( input.value && !regExp.test( input.value ) ) {
			input.setAttribute( "errmsg", "Patrón no válido");
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "pattern" ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateAllowed( input ) {
		var allowed = JSON.parse( input.getAttribute( "allowed" ));
		var files = input.files;
		var valid = true;
		
		for ( var i = 0; i < files.length; i++ ) {
			var file = files[ i ];
			var ext = file.name.split( "." );
			ext = ext[ ext.length - 1 ];
			
			var find = false;
			for ( var o = 0; o < allowed.length; o++ ) {
				if ( allowed[ o ] === ext ) {
					find = true;
					break;
				}
			}
			
			if( !find ) {
				valid = false;
				break;
			}
		}
		
		if ( !valid ) {
			// Cogemos los archivos permitidos
			var permitidos = "";
			for ( var o = 0; o < allowed.length; o++ ) {
				if( o === 0 ){
					permitidos = allowed[ o ];
				} else {
					permitidos += ", " + allowed[ o ];
				}
			}
			
			// Marcamos el error
			
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "allowed", [permitidos] ));
			input.focus();
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateMincheck( input, form ) {
		var mincheck = parseInt( input.getAttribute( "mincheck" ));
		var checkgroup = input.getAttribute( "checkgroup" );
		var checkboxs = form.querySelectorAll( "input[type=checkbox]" );
		
		var checkeds = 0;
		for( var i = 0; i < checkboxs.length; i++ ) {
			if( checkboxs[ i ].getAttribute( "checkgroup" ) === checkgroup && checkboxs[ i ].hasAttribute( "checked" )) {
				checkeds++;
			}
		}
		
		if( mincheck > checkeds ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "mincheck", [mincheck] ));
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	__validateMaxcheck( input, form ) {
		var maxcheck = parseInt( input.getAttribute( "maxcheck" ));
		var checkgroup = input.getAttribute( "checkgroup" );
		var checkboxs = form.querySelectorAll( "input[type=checkbox]" );
		
		var checkeds = 0;
		for( var i = 0; i < checkboxs.length; i++ ) {
			if( checkboxs[ i ].getAttribute( "checkgroup" ) === checkgroup && checkboxs[ i ].hasAttribute( "checked" )) {
				checkeds++;
			}
		}
		
		if( maxcheck < checkeds ) {
			input.setAttribute( "errmsg", this.__getMessagesValidate( input, "maxcheck", [maxcheck] ));
			return false;
		} else {
			input.setAttribute( "errmsg", "" );
			return true;
		}
	}
	
	
	__getMessagesValidate( input, rule, data ) {
		var messages = this.validator.messages;
		
		// Mensajes definidos
		
		if( messages && messages[ input.name ] && messages[ input.name ][ rule ] ) {
			return messages[ input.name ][ rule ];
		}
		
		// Mensajes por defecto
		
		if( rule === "isemail" ) {
			return "No es un email válido";
		}
		if( rule === "isurl" ) {
			return "No es una url válida";
		}
		if( rule === "required" ) {
			return "Este campo es obligatorio";
		}
		if( rule === "nospaces" ) {
			return "Este campo no puede contener espacios";
		}
		if( rule === "minlength" ) {
			return "Logintud mínima " + data[ 0 ] + " caracteres";
		}
		if( rule === "rangelength" ) {
			return "La longitud debe estar entre " + data[ 0 ] + " y " + data[ 1 ] + " caracteres";
		}
		if( rule === "isumber" ) {
			return "El valor introducido debe ser numérico";
		}
		if( rule === "min" ) {
			return "Valor númerico obligatorio, mínimo " + data[ 0 ];
		}
		if( rule === "max" ) {
			return "Valor númerico obligatorio, máximo " + data[ 0 ];
		}
		if( rule === "range" ) {
			return "El valor debe estar entre " + data[ 0 ] + " y " + data[ 1 ] + "";
		}
		if( rule === "domains" ) {
			return "No hay ninguno de los dominios permitidos";
		}
		if( rule === "isdate" ) {
			return "No es una fecha válida";
		}
		if( rule === "dateprevius" ) {
			return "La fecha tiene que ser inferior al día de hoy";
		}
		if( rule === "minage" ) {
			return "Debes tener más de " + data[ 0 ] + " años";
		}
		if( rule === "maxage" ) {
			return "Debes tener menos de " + data[ 0 ] + " años";
		}
		if( rule === "security" ) {
			return data[ 0 ];
		}
		if( rule === "equalto" ) {
			return "Las contraseñas no coinciden";
		}
		if( rule === "phonenumber" || rule === "phonecountry" ) {
			return "El teléfono introducido no es correcto";
		}
		if( rule === "pattern" ) {
			return "Patrón no válido";
		}
		if( rule === "allowed" ) {
			return "Archivos permitidos " + data[ 0 ];
		}
		if( rule === "mincheck" ) {
			return "Tienes que marcar al menos " + data[ 0 ] + " casillas";
		}
		if( rule === "maxcheck" ) {
			return "Tienes que marcar como mucho " + data[ 0 ] + " casillas";
		}
	}
	
	__calcularEdadValidate( fecha, formato ) {
		var aho = null;
		var mes = null;
		var dia = null;

		fecha = fecha.toString();
		fecha = fecha.replace( new RegExp( "/", 'g' ), "-" );

		var fechaArr = fecha.split('-');
		if (formato === "aaaa-mm-dd") {
			aho = parseInt(fechaArr[0]);
			mes = parseInt(fechaArr[1]);
			dia = parseInt(fechaArr[2]);
		} else if (formato === "dd-mm-aaaa") {
			aho = parseInt(fechaArr[2]);
			mes = parseInt(fechaArr[1]);
			dia = parseInt(fechaArr[0]);
		} else if (formato === "mm-dd-aaaa") {
			aho = parseInt(fechaArr[2]);
			mes = parseInt(fechaArr[0]);
			dia = parseInt(fechaArr[1]);
		}

		var fechaAct = new Date();
		var a_aho = fechaAct.getYear();
		var a_mes = fechaAct.getMonth() + 1;
		var a_dia = fechaAct.getDate();

		var edad = (a_aho + 1900) - aho;

		if (a_mes < mes) {
			edad--;
		}

		if ((mes === a_mes) && (dia > a_dia)) {
			edad--;
		}

		if (edad > 1900) {
			edad -= 1900;
		}

		return edad;
	}
	
	__converToArrayValidate( valor ) {
		var newArr = [];
		
		valor = valor.replace( "[", "" );
		valor = valor.replace( "]", "" );
		valor = valor.replace( new RegExp( " ", 'g' ), "" );
		valor = valor.split( "," );
		
		for( var i = 0; i < valor.length; i++ ) {
			newArr.push( valor[ i ]);
		}
		
		return newArr;
	}
	
	__sortTelephoneValidate( telefono, pais ) {
		if ( pais === "es" ) {
			telefono = telefono.toString();
			telefono = telefono.replace( new RegExp( " ", 'g' ), "" );

			if ( telefono.length === "13" ) {
				if ( telefono[ 4 ] === 9 ) {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + "" + telefono[ 2 ] + "" + telefono[ 3 ] + " " + telefono[ 4 ] + "" + telefono[ 5 ] + " " + telefono[ 6 ] + "" + telefono[ 7 ] + "" + telefono[ 8 ] + " " + telefono[ 9 ] + "" + telefono[ 10 ] + " " + telefono[ 11 ] + "" + telefono[ 12 ];
				} else {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + "" + telefono[ 2 ] + "" + telefono[ 3 ] + " " + telefono[ 4 ] + "" + telefono[ 5 ] + "" + telefono[ 6 ] + " " + telefono[ 7 ] + "" + telefono[ 8 ] + "" + telefono[ 9 ] + " " + telefono[ 10 ] + "" + telefono[ 11 ] + "" + telefono[ 12 ];
				}
			} else if ( telefono.length === "12" ) {
				if ( telefono[ 3 ] === 9 ) {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + "" + telefono[ 2 ] + " " + telefono[ 3 ] + "" + telefono[ 4 ] + " " + telefono[ 5 ] + "" + telefono[ 6 ] + "" + telefono[ 7 ] + " " + telefono[ 8 ] + "" + telefono[ 9 ] + " " + telefono[ 10 ] + "" + telefono[ 11 ];
				} else {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + "" + telefono[ 2 ] + " " + telefono[ 3 ] + "" + telefono[ 4 ] + "" + telefono[ 5 ] + " " + telefono[ 6 ] + "" + telefono[ 7 ] + "" + telefono[ 8 ] + " " + telefono[ 9 ] + "" + telefono[ 10 ] + "" + telefono[ 11 ];
				}
			} else {
				if ( telefono[ 0 ] === "9" ) {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + " " + telefono[ 2 ] + "" + telefono[ 3 ] + "" + telefono[ 4 ] + " " + telefono[ 5 ] + "" + telefono[ 6 ] + " " + telefono[ 7 ] + "" + telefono[ 8 ];
				} else {
					telefono = telefono[ 0 ] + "" + telefono[ 1 ] + "" + telefono[ 2 ] + " " + telefono[ 3 ] + "" + telefono[ 4 ] + "" + telefono[ 5 ] + " " + telefono[ 6 ] + "" + telefono[ 7 ] + "" + telefono[ 8 ];
				}
			}
		}

		return telefono;
	}

}