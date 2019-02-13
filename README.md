# AW-FORM-MIXINS

Mixins necesarios para el funcionamiento de los aw-form-elements y aw-form-elements-df

Contenido:

- `aw-char-counter-mixin`: Mixin para el funcionamiento del helper aw-char-counter
- `aw-input-error-mixin`: Mixin para el funcionamiento de errores en los aw-form-elements y aw-form-elements-df
- `aw-input-preffix-mixin`: Mixin para el preffix y sufixs en los aw-form-elements y aw-form-elements-df
- `aw-form-validate-mixin`: Mixin para el validador del aw-form y aw-inputs

## Validador de formulario

Por defecto los elementos del formulario se validan cuando se envía el aw-form. Pero opcionalmente también podemos hacer que éstos se validen cuando cambian de valor añadiendo el atributo validateonchange. Si no pasa la evaluación dará un error y lo mostrará en el campo. Los atributos de validación varían un poco con los de HTML5 y tenemos algunos más que nos permitirán validar fechas, teléfonos, etc...

### Validación según el tipo de campo:

Según el tipo de campo se harán validaciones, por ejemplo si el campo es tipo email, dará un error si el valor introducido no es un email. Los tipos de campos que se autovalidan son los siguientes:

- `type=email`: Da error si el valor introducido no es un email.
- `type=url`: Da error si el valor introducido no es una url

____________________________________________

### Atributos de validación:

Por otro lado tenemos varios atributos de validación que nos permiten hacer validaciones más complejas:

- [required](#required): Si el campo no está rellenado dará un error. (Boolean)
- [nospaces](#nospaces): Da error si el campo tiene espacios en blanco. (Boolean)
- [minlength](#minlength): Evalua si el valor tiene una longitud de caracteres mínima. (Number)
- [rangelength](#rangelength): Evalua si el valor esta entre una longitud de caracteres en un rango dado. (Array)
- [isumber](#isumber): El valor del campo tiene que ser númerico. (Boolean)
- [min](#min): Evalua si el valor es númerico y cumple con un valor mínimo dado. (Number)
- [max](#max): Evalua si el valor es númerico y cumple con un valor máximo dado. (Number)
- [range](#range): Evalua si el valor es númerico y está entre el rango dado. (Array)
- [isemail](#isemail): Evalua si el valor del campo tiene un email válido. (Boolean)
- [isurl](#isurl): Evalua si el valor del campo tiene una url válida. (Boolean)
- [domains](#domains): Evalua si el valor contienen uno o varios dominios permitidos. (Array)
- [isdate](#isdate): Evalua si el valor dado es una fecha válidad. (Boolean)
- [dateprevius](#dateprevius): Evalua si el valor dado es una fecha válidad y anterior a la actual. (Boolean)
- [minage](#minage): Evalua si el valor dado es una fecha válida con una edad mínima. (Number)
- [maxage](#maxage): Evalua si el valor dado es una fecha válida con una edad máxima. (Number)
- [security](#security): Para contraseñas, evalua si el valor pasado cumple con una seguridad mínima. (String)
- [equalto](#equalto): Evalua si el valor del campo coincide con el del campo pasado en el atributo. (String)
- [phonenumber](#phonenumber): Evalua si el valor cumple con un estandar telefónico. (Boolean)
- [phonecountry](#phonecountry): Evalua si es un número telefónico de uno o varios paises. (Array)
- [pattern](#pattern): Evalua si se cumple la expresión regular pasada en el atributo.
- [mincheck](#mincheck): Para un grupo de checkbox establece un número mínimo de checkeados.
- [maxcheck](#maxcheck): Para un grupo de checkbox establece un número máximo de checkeados.

#### required:

Si el input tiene el atributo ***requiere*** este campo será de obligatorioi cumplimiento. (Boolean).

```html
<aw-input-df label="Nombre" required></aw-input-df>
```

#### nospaces:

Si el input tiene el atributo ***nospaces*** declarado sin ningún valor, el campo no podrá tener espacios en blanco. Opcionalmente le podemos pasar el valor "`autodel`" y lo que hará será eliminar los espacios automáticamente. (Boolean, String).

```html
<aw-input label="Nombre de usuario" nospaces></aw-input>
<aw-input label="Usuario de twitter" nospaces="autodel" validateonchange>
	<prefix>@</prefix>
</aw-input>
```

#### minlength:

Obliga a que el campo tenga al menos un mínimo de caracteres. (Number).

```html
<aw-input label="Nombre de usuario" minlength="15"></aw-input>
```

#### rangelength:

Obliga a que el campo tenga una longitud de caracteres entre el rango dado. (Array).

```html
<aw-input label="Nombre de usuario" rangelength="[7,15]"></aw-input>
```

#### isumber:

Valida que el valor introducido en un campo ses un número. Esto es útil si necesitamos validar un número en un input que no es del tipo ***number***.

```html
<aw-input type="text" label="Edad del usuario" isumber></aw-input>
```

#### min:

Valida que el valor introducido en un campo sea un número y además este tenga un valor mínimo dado.

```html
<aw-input type="number" label="Edad del usuario" min="5" spinners></aw-input>
```

#### max:

Valida que el valor introducido en un campo sea un número y además este tenga un valor máximo dado.

```html
<aw-input type="number" label="Edad del usuario" max="15" spinners></aw-input>
```

#### range:

Valida que el valor introducido en un campo se un número. Esto es útil si necesitamos validar un número en un input que no es ***number***.

```html
<aw-input type="number" label="Edad del usuario" range="[3,7]"></aw-input>
```

#### isemail:

Valida si en el campo viene un email válido. Esta regla es útil solo cuando estamos validando un email fuera de un imput tipo ***email***.

<aw-input type="text" label="Correo electrónico" isemail></aw-input>

#### isurl:

Valida si en el campo viene una url válida. Esta regla es útil solo cuando estamos validando una url fuera de un imput tipo ***url***.

```html
<aw-input label="Dirección web" isurl></aw-input>
```

#### domains:

Valida si en el campo viene uno o varios dominios pasados en el atributo. En el ejemplo inferior solo aceptaremos correos electrónicos con de los dominios "`gmail.com`" y "`yahoo.es`".

```html
<aw-input type="email" label="Correo electrónico" domains="[gmail.com,yahoo.es]"></aw-input>
```

#### isdate:

Valida si el campo tiene una fecha válida. Es util cuando queremos validar fechas fuera de un tipo ***date***. Este atributo será un string con el formato de la fecha que recibimos.

El validador valida correctamente fehcas tanto separadas por un guión ( aaaa-mm-dd ), como separadas por una barra ( aaaa/mm/dd ).

Valores permitidos (`aaaa-mm-dd`, `dd-mm-aaaa`, `mm-dd-aaaa`), según el formato de fecha que queramos.

```html
<aw-input label="Fecha de nacimiento" allwaysup placeholder="Ej.: 12-12-1982" isdate="dd-mm-aaaa"></aw-input>
```

#### dateprevius:

Valida si el campo tiene una fecha válida anterior a la fecha actual.

<span style="color:red; font-size: 12px">**¡NOTA!**</span> Si no es un tipo ***date***, el dateprevios deberá llevar obligatoriamente el atributo isdate con el formato dado, de lo contrario la validación no procederá.

```html
<aw-input label="Fecha de nacimiento" allwaysup placeholder="Ej.: 12-12-1982" isdate="dd-mm-aaaa" dateprevius></aw-input>
```

#### minage:

Valida si una fecha en un campo cumple con una edad mínima dada.

<span style="color:red; font-size: 12px">**¡NOTA!**</span> Si no es un tipo ***date***, el dateprevios deberá llevar obligatoriamente el atributo isdate con el formato dado, de lo contrario la validación no procederá.

```html
<aw-input label="Fecha de nacimiento" allwaysup placeholder="Ej.: 12-12-1982" isdate="dd-mm-aaaa" minage="18"></aw-input>
```

#### maxage:

Valida si una fecha en un campo cumple con una edad máxima dada.

<span style="color:red; font-size: 12px">**¡NOTA!**</span> Si no es un tipo ***date***, el dateprevios deberá llevar obligatoriamente el atributo isdate con el formato dado, de lo contrario la validación no procederá.

```html
<aw-input label="Fecha de nacimiento" allwaysup placeholder="Ej.: 12-12-1982" isdate="dd-mm-aaaa" maxage="65"></aw-input>
```

#### security:

Valida si el valor del campo tiene una seguridad mínima dada. Esto es útil para comprobar la seguridad de las contraseñas. Valores permitidos: (`low`, `medium`, `hight`, `ultra`). Valor por defecto: (`medium`).

- `low`: Una contraseña poco segura que puede ser cualquier cosa con al menos seis caracteres.
- `medium`: Una contraseña que debe tener al menos seis caracteres mayúsculas y minúsculas.
- `hight`: Una contraseña con al menos ocho caracteres, mayúsculas, minúsculas y números.
- `ultra`: Una contraseña con al menos ocho caracteres, mayúsculas, minúsculas, números y símbolos.

```html
<aw-input type="password" label="Contraseña no segura" security="low"></aw-input>
<aw-input type="password" label="Contraseña medio segura" security="medium"></aw-input>
<aw-input type="password" label="Contraseña segura" security="hight"></aw-input>
<aw-input type="password" label="Contraseña muy segura" security="ultra"></aw-input>
```

#### equalto:

Valida si el valor de un campo coincide con otro campo. Para esta validación se deben cumplir que los campos a comparar estén dentro de un mismo formulario. Se determinará el campo a comparar con el atributo "***name***" del campo con el que queremos compararlo.

```html
<form id="myForm1">
  <aw-input name="password" type="password" label="Escribe tu contraseña" security="mediuma" validateonchange></aw-input>
  <aw-input name="confirm" type="password" label="Confirma tu contraseña" equalto="password" validateonchange></aw-input>
</form>
```

#### phonenumber:

Valida si un campo es un número de teléfono. Este atributo es muy general y validará prácticamente cualquier número que cumpla unas pocas condiciones en las que pueda entrar un número de teléfono de cualquier país.

```html
<aw-input label="Número de teléfono" phonenumber></aw-input>
```

#### phonecountry:

Valida si el teléfono pertenece a alguno de los paises pasados separados por comas.

Valres permitidos:
- `es`: Valida teléfonos españoles.
- `us`: Valida teléfonos de EEUU.
- `uk`: Valida teléfonos británicos.
- `it`: Valida teléfonos italianos.
- `pt`: Valida teléfonos portugueses.
- `fr`: Valida teléfonos franceses.

```html
<aw-input label="Número de teléfono" placeholder="Solo España" phonecountry="[es]"></aw-input>
<aw-input label="Número de teléfono" placeholder="Solo Estados Unidos" phonecountry="[us]"></aw-input>
<aw-input label="Número de teléfono" placeholder="España y Francia" phonecountry="[es,fr]"></aw-input>
```

#### pattern:

Valida una expresión regular pasada a través del atributo pattern. Si no se cumple esa expresión devulve el error.

```html
<aw-input label="Usuario de Twitter" pattern="@([A-Za-z0-9_]{1,15})" ></aw-input>
```

#### mincheck:

Para un grupo de checkboxs establece un númer mínimo de inputs que tienen que estar checkeados. Este atributo debe ir acompañado siempre por el atributo checkgroup que asigna el grupo de checkboxs y basta con que solo se añada a uno de los checkboxs del grupo.

```html
<aw-form>
  <aw-checkbox name="checkbox1" checkgroup="grupo1" mincheck="1">
	<label>Checkbox 1</label>
  </aw-checkbox>
  <aw-checkbox name="checkbox2" checkgroup="grupo1">
	<label>Checkbox 2</label>
  </aw-checkbox>
  <aw-button type="submit">ENVIAR</aw-button>
</aw-form>
```

#### maxcheck: 

Para un grupo de checkboxs establece un númer máximo de inputs que tienen que estar checkeados. Este atributo debe ir acompañado siempre por el atributo checkgroup que asigna el grupo de checkboxs y basta con que solo se añada a uno de los checkboxs del grupo.

```html
<aw-form>
  <aw-checkbox name="checkbox1" checkgroup="grupo1" maxcheck="1">
	<label>Checkbox 1</label>
  </aw-checkbox>
  <aw-checkbox name="checkbox2" checkgroup="grupo1">
	<label>Checkbox 2</label>
  </aw-checkbox>
  <aw-button type="submit">ENVIAR</aw-button>
</aw-form>
```
_____________________________

### Impedir validación

Como hemos comentado, por defecto los aw-input no se validan cuando cambian de valor. Pero aunque igualmente se validarán cuando estén dentro de un aw-for. Si queremos impedir la validación de cualqueir modo, podemos añadir el atributo novalidate.

`novalidate`: Evita cualquier validación, ya sea cuando cambia o cuando se envía un aw-form.

```html
<aw-input label="Usuario de twitter" pattern="@([A-Za-z0-9_]{1,15})" novalidate validateonchange=></aw-input>
<aw-input type="email" label="Correo electrónico"></aw-input>
```
______________________________

<p style="text-align: center; padding: 50px 0">
    <b>Contacto</b><br><br>Manu J. Overa<br><a href="mailto:manu.overa@arismanwebs.es">manu.overa@arismanwebs.es</a><br><br>
    Diseño Web - <a href="https://arismanwebs.es">Arisman Webs</a>
</p>



