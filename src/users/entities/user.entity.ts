import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({   // El decorador @Entity se importa desde typeorm.
    name: 'user'  // Nombre de la tabla que se mapea en MySQL.
})
export class User {    // export: esta clase se puede importar desde otro archivo en mi proyecto.
    @PrimaryGeneratedColumn({   // id es una columna que será PK de la tabla.
        type: 'int', 
        name: 'id',   
    })
    id: number;  // Define la propiedad id de tipo numérico.

    
    @Column ('varchar',{name: 'user',})   //user es una columna de la tabla.
    user: string;


    @Column ('varchar',{name: 'pass',})  //pass es una columna de la tabla.
    pass: string;
}