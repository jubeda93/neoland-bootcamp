function getByIndex (arr, idx) {

    if (idx < 0) {
        return 'Elemento no existe'
    }

    if (arr.length <= idx) {
        return 'Elemento no existe'
    }
    return arr[idx];
}

let resultado = getByIndex([1, 2],-1);
console.log(resultado);