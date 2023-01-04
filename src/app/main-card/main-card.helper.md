```javascript
onFileDropped(event: any) {
  of(event)
    .pipe(
      map((event: any) => {
        // Obtener el archivo CSV
        const file = event.target.files[0];

        // Leer el archivo como texto
        const reader = new FileReader();
        reader.readAsText(file);

        // Usar un observable para emitir el contenido del archivo una vez que haya sido leído
        return new Observable((observer) => {
          reader.onload = () => {
            // Emitir el contenido del archivo como una cadena de texto
            observer.next(reader.result);
            observer.complete();
          };
        });
      })
    )
    .subscribe((data) => {
      // Convertir el texto del archivo CSV en un array de objetos
      this.csvData = this.csvToArray(data);
    });
}

onButtonPaste() {
  // Implementar la lógica para pegar el contenido del textarea aquí
}

csvToArray(csv: any) {
  // Dividir el texto CSV por las comas para obtener un array de filas
  const rows = csv.split(',');

  // Crear un array de objetos para almacenar los datos de cada fila
  const data: {}[] = [];

  // Iterar sobre cada fila
  rows.forEach((row: any) => {
    // Dividir la fila por las comas para obtener un array de valores de cada columna
    const values = row.split(',');

    // Crear un objeto para almacenar los valores de cada columna
    const obj = {};

    // Asignar los valores de cada columna a las claves correspondientes del objeto
    obj['col1'] = values[0];
    obj['col2'] = values[1];
    obj['col3'] = values[2];

    // Añadir el objeto al array de datos
    data.push(obj);
  });

  // Devolver el array de objetos
  return data;
}
```
