import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Postuser } from 'src/app/post-user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {
 
commentaryCollection: AngularFirestoreCollection<Postuser>;
commentary: Observable<Postuser[]>;
commentaryDoc: AngularFirestoreDocument<Postuser>;
 
 
 
  constructor(public afs:AngularFirestore) { 

// Lectura de la coleccion "commentary" en Firestore
this.commentaryCollection = this.afs.collection('commentary');  //Inicia la coleccion

this.commentary = this.commentaryCollection.snapshotChanges().pipe(map((changes => {
  return changes.map(a => {
    const data = a.payload.doc.data() as Postuser;
  //  data.idFireStore = a.payload.doc.id;
        console.log(data);
    return data;    
});
})
));
}

   /* Funcion que es llamada por post-user.component.ts.
     Mediante los metodos de firebase irá leyendo la coleccion que creo
     en el post y nos retornará lo escrito por el */
     getRead() {
      this.commentaryCollection = this.afs.collection('commentary');   
      this.commentary = this.commentaryCollection.snapshotChanges().pipe(map((changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Postuser;
      //    data.idFireStore = a.payload.doc.id;
              console.log(data);
          return data;    
      });
      })
      ));
        return this.commentary; 
    
    }



  /* Funcion para agregar el post a la coleccion mediante el metodo "add"
   la entregamos con esa estructura de objeto */

    addPost(postuser : Postuser) {   
    console.log("llegoooooooooooo");
    console.log(postuser);
    
    this.commentaryCollection.add(
                            {   id : postuser.id,
                                post : postuser.post
                              }
                                
                              ).then( _ => alert("Post creado") ); // add es una promesa de firebase
    }
  

}
