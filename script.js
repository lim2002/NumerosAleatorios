const methodMenu = document.getElementById('method-menu');
const selectButton = document.getElementById('select-button');
const generatorForm = document.getElementById('generator-form');
const resultTable = document.getElementById('result-table');
const resultTableBody = document.getElementById('result-table-body');
const resultTable2 = document.getElementById('result-table2');
const resultTableBody2 = document.getElementById('result-table-body2');
const resultTable3 = document.getElementById('result-table3');
const resultTableBody3 = document.getElementById('result-table-body3');

const clearButton = document.getElementById('clear-table');
//Limpiar
// Obtener los formularios y los botones de limpiar
const clearInputsButtons = document.querySelectorAll('#clear-inputs');
const inputs = document.querySelectorAll('input[type="number"]');
const clearTableButtons = document.querySelectorAll('#clear-table');

// Función para limpiar los inputs
function clearInputs() {
    inputs.forEach(input => {
        input.value = ''; // Limpia el valor de cada input
    });
}

// Función para limpiar las tablas
function clearTables() {
    resultTableBody.innerHTML = ''; // Limpia la tabla 1
    resultTableBody2.innerHTML = ''; // Limpia la tabla 2
    resultTableBody3.innerHTML = ''; // Limpia la tabla 3

    // Asegura que las tablas estén ocultas después de limpiar
    resultTable.style.display = 'none';
    resultTable2.style.display = 'none';
    resultTable3.style.display = 'none';
}


// Asignar el evento click al botón de limpiar inputs
clearInputsButtons.forEach(button => {
    button.addEventListener('click', clearInputs);
});

// Asignar el evento click a los botones de limpiar tablas
clearTableButtons.forEach(button => {
    button.addEventListener('click', clearTables);
});





//Fin de limpieza

document.addEventListener('DOMContentLoaded', function() {
    const clearButton = document.getElementById('clear-table');
    const resultTableBody = document.getElementById('result-table-body');

    clearButton.addEventListener('click', function() {
        resultTableBody.innerHTML = '';
    });
});

selectButton.addEventListener('click', function() {
    const methodSelect = document.getElementById('method-select');
    const selectedMethod = methodSelect.value;

    switch (selectedMethod) {
        case 'cuadradosM':
            showForm('cuadrados-form');
            break;
        case 'productosM':
            showForm('productos-form');
            break;
        case 'lineal':
            showForm('lineal-form');
            break;
        case 'multiplicativo':
            showForm('multiplicativo-form');
            break;
        default:
            hideAllForms();
            break;
    }
});

function showForm(formId) {
    hideAllForms();   // Oculta los demás formularios
    clearTables();    // Limpia todas las tablas
    document.getElementById(formId).style.display = 'block';  // Muestra el formulario seleccionado
}


function hideAllForms() {
    document.getElementById('cuadrados-form').style.display = 'none';
    document.getElementById('productos-form').style.display = 'none';
    document.getElementById('lineal-form').style.display = 'none';
    document.getElementById('multiplicativo-form').style.display = 'none';
}

document.getElementById('cuadrados-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const seed = parseInt(document.getElementById('seed').value);
    const quantity = parseInt(document.getElementById('quantityC').value);

    if (isNaN(seed) || isNaN(quantity)) {
        alert('Por favor ingresa valores válidos para la semilla y la cantidad de números.');
        return;
    }

    generateCuadrados(seed, quantity);
});

function generateCuadrados(seed, quantity) {
    resultTable.style.display = 'block';
    resultTableBody.innerHTML = '';
    let numero = seed;
    const digits = seed.toString().length;
    let degeneracionEncontrada = false; // Bandera para verificar si hay degeneración

    if (digits % 2 !== 0) {
        numero = parseInt('0' + seed.toString());
    }    
    
    for (let i = 0; i < quantity; i++) {
        const xi = numero;
        const xiSquared = xi * xi;
        const xiSquaredString = xiSquared.toString();

        const realLength = xiSquaredString.length;
        const desiredLength = digits * 2;
        const zerosToAdd = desiredLength - realLength;
        const zeroPadding = '0'.repeat(zerosToAdd);
        const xiSquaredStringPadded = zeroPadding + xiSquaredString;
        
        const start = Math.floor((xiSquaredString.length - digits) / 2);
        const end = start + digits;
        const yi = parseInt(xiSquaredString.substring(start, end));

        const yiF = xi * xi;
                
        let xiNextString = yi.toString();
        const missingDigits = digits * 2 - xiNextString.length;
        
        if (missingDigits > 0) {
            const prefixZeros = '0'.repeat(missingDigits);
            xiNextString = prefixZeros + xiNextString;
        }
        
        const xiNext = parseInt(xiNextString);
        const ri = xiNext / Math.pow(10, digits);
        
        // Si se encuentra un Ri = 0 y no se ha detectado antes
        if (ri === 0 && !degeneracionEncontrada) {
            alert(`Ri se degenera en la posición: ${i + 1}`);
            degeneracionEncontrada = true;  // Activa la bandera para evitar múltiples alertas
        }
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${i + 1}</td><td>${yiF}</td><td>${xiNext}</td><td>${ri}</td>`;
        
        resultTableBody.appendChild(newRow);
        numero = xiNext;
    }
}


document.getElementById('productos-form').addEventListener('submit', function(event){
    event.preventDefault();

    const seed1 = parseInt(document.getElementById('seed1').value);
    const seed2 = parseInt(document.getElementById('seed2').value);
    const quantity = parseInt(document.getElementById('quantityP').value);

    if (isNaN(seed1) || isNaN(seed2) || isNaN(quantity)) {
        alert('Por favor ingresa valores válidos para las semillas y la cantidad de números.');
        return;
    }

    generateProductos(seed1, seed2, quantity);
});

function generateProductos(seed1, seed2, quantity) {
    resultTable.style.display = 'block';
    resultTableBody.innerHTML = '';
    
    let numero1 = seed1;
    let numero2 = seed2;
    const digits = seed1.toString().length;
    let degeneracionEncontrada = false; // Bandera para verificar si hay degeneración

    for(let i = 0; i < quantity; i++) {
        const xi = numero1;
        const xi1 = numero2;
        const xiSquared = xi * xi1;
        const xiSquaredString = xiSquared.toString();

        const realLength = xiSquaredString.length;
        const desiredLength = digits * 2;
        const zerosToAdd = desiredLength - realLength;
        const zeroPadding = '0'.repeat(zerosToAdd);
        const xiSquaredStringPadded = zeroPadding + xiSquaredString;
        
        const start = Math.floor((xiSquaredString.length - digits) / 2);
        const end = start + digits;
        const yi = parseInt(xiSquaredString.substring(start, end));

        const yiF = xi * xi1;
                
        let xiNextString = yi.toString();
        const missingDigits = digits * 2 - xiNextString.length;
        
        if (missingDigits > 0) {
            const prefixZeros = '0'.repeat(missingDigits);
            xiNextString = prefixZeros + xiNextString;
        }
        
        const xiNext = parseInt(xiNextString);
        const ri = xiNext / Math.pow(10, digits);
        
        // Si se encuentra un Ri = 0 y no se ha detectado antes
        if (ri === 0 && !degeneracionEncontrada) {
            alert(`Ri se degenera en la posición: ${i + 1}`);
            degeneracionEncontrada = true;  // Activa la bandera para evitar múltiples alertas
        }
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${i + 1}</td><td>${yiF}</td><td>${xiNext}</td><td>${ri}</td>`;
        
        resultTableBody.appendChild(newRow);
        numero1 = xi1;
        numero2 = xiNext;
    }
}


document.getElementById('lineal-form').addEventListener('submit', function(event){
    event.preventDefault();

    const seed = parseInt(document.getElementById('seedL').value);
    const p = parseInt(document.getElementById('p').value);
    const k = parseInt(document.getElementById('k').value);
    const c = parseInt(document.getElementById('c').value);

    const g = Math.log(p)/Math.log(2);
    const m = Math.pow(2,g); 
    const a = 1+(4*k);

    // Mostramos los resultados debajo de los inputs
    document.getElementById('resultado-a').innerHTML = `a = 1 + 4 * ${k} = ${a.toFixed(2)}`;
    document.getElementById('resultado-m').innerHTML = `m = 2^${g.toFixed(2)} = ${m.toFixed(2)}`;


    resultTable2.style.display = 'block';
    resultTableBody2.innerHTML = '';

    let numero = seed;
    const digits = seed.toString().length;

    for(let i = 0; i < m+1; i++) {
        const xi = numero;
        const xiPlusOne = (a * xi + c) % m;

        const formula = `(${a} * ${xi} + ${c}) mod ${m}`;
        const xiPlusOneString = xiPlusOne.toString();

        const realLength = xiPlusOneString.length;
        const desiredLength = digits * 2;
        const zerosToAdd = desiredLength - realLength;
        const zeroPadding = '0'.repeat(zerosToAdd);
        const xiPlusOneStringPadded = zeroPadding + xiPlusOneString;
        
        const start = Math.floor((xiPlusOneString.length - digits) / 2);
        const end = start + digits;
        const riPlusOne = xiPlusOne/(m-1);
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${i + 1}</td><td>${formula}</td><td>${xiPlusOne}</td><td>${riPlusOne.toFixed(5)}</td>`;
        
        resultTableBody2.appendChild(newRow);
        numero = xiPlusOne;
    }
});

document.getElementById('multiplicativo-form').addEventListener('submit', function(event){
    event.preventDefault();

    const seed = parseInt(document.getElementById('seedM').value);
    const k = parseInt(document.getElementById('kM').value); // Agregar campo para k
    const p = parseInt(document.getElementById('pM').value); // Agregar campo para p

    if (isNaN(seed) || isNaN(k) || isNaN(p)) {
        alert('Por favor ingresa valores válidos para la semilla, k y p.');
        return;
    }

    // Calcular g, a y m
    const g = Math.ceil(Math.log(p) / Math.log(2)) + 2;
    const a = 5 + 8 * k;
    const m = Math.pow(2, g);

    console.log('g:', g);
    console.log('a:', a);
    console.log('m:', m);

    resultTable3.style.display = 'block';
    resultTableBody3.innerHTML = '';

    let numero = seed;
    const digits = seed.toString().length;
    const generatedNumbers = [];
    let repetitionIndex = -1;

    for(let i = 0; i < m+1; i++) { 
        const xi = numero;
        const xiPlusOne = (a * xi) % m;

        console.log('Iteración:', i + 1);
        console.log('xi:', xi);
        console.log('xiPlusOne:', xiPlusOne);

        const formula = `(${a} * ${xi}) mod ${m}`;
        const xiPlusOneString = xiPlusOne.toString();

        const realLength = xiPlusOneString.length;
        const desiredLength = digits * 2;
        const zerosToAdd = desiredLength - realLength;
        const zeroPadding = '0'.repeat(zerosToAdd);
        const xiPlusOneStringPadded = zeroPadding + xiPlusOneString;
        
        const start = Math.floor((xiPlusOneString.length - digits) / 2);
        const end = start + digits;
        const riPlusOne = xiPlusOne/(m-1);
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${i + 1}</td><td>${formula}</td><td>${xiPlusOne}</td><td>${riPlusOne.toFixed(5)}</td>`;
        
        if(generatedNumbers.includes(xiPlusOne)){
            repetitionIndex = i;
            break;
        }
        generatedNumbers.push(xiPlusOne);
        resultTableBody3.appendChild(newRow);
        numero = xiPlusOne;
    }
    if(repetitionIndex !== -1){
        alert(`Se repite en la iteración ${repetitionIndex}`);
    }else{
        alert('No se repite dentro de las iteraciones');
    }
});