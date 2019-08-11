import { Injectable  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Postuser } from 'src/app/post-user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {

/*  Declaracion  de  varibles  para  coleccion    "textarea"    */
commentaryCollection: AngularFirestoreCollection<Postuser>;
probandoimagenes: Observable<Postuser[]>;
commentary: Observable<Postuser[]>;
commentaryDoc: AngularFirestoreDocument<Postuser>;

/*  Declaracion  de  varibles  para  coleccion    " image-post "    */
/* uso en html */
/*imgSrcPost:string;
selectImagePost:any=null;*/
/* isSubmitted:boolean
   isLogged:boolean = false */
 
constructor(public afs:AngularFirestore) {   
// Lectura de la coleccion "commentary" en Firestore
this.commentaryCollection = this.afs.collection('commentary');  //Inicia la coleccion
}


/* Funcion que es llamada por post-user.component.ts.
     Mediante los metodos de firebase irá leyendo la coleccion que creo
     en el post y nos retornará lo escrito por el */
 getRead() {
     // this.commentaryCollection = this.afs.collection('commentary');   
      this.commentary = this.commentaryCollection.snapshotChanges().pipe(map((changes => {
     
        return changes.map(a => {
          console.log("a " + a)
          const data = a.payload.doc.data() as Postuser;
             data.idFireStore = a.payload.doc.id;
              console.log(data);
          return data;    
      });
      })
      ));
      console.log(this.commentary);
        return this.commentary; 
    
    }



  /* Funcion para agregar el post a la coleccion mediante el metodo "add"
   la entregamos con esa estructura de objeto */
  
addPost(postuser : Postuser) {   
    console.log("llegoooooooooooo al service de addpost");
    console.log(postuser.id);  console.log(postuser.post);
    
    this.commentaryCollection.add(
                            {   id : postuser.id,
                                idFireStore : '',
                                post : postuser.post                          
                              }
                                
                              ).then( _ => alert("Post creado") ); // add es una promesa de firebase
    }


     /* Elimina el post de events. Para esto es necesario usar el ID que me entrega
  firestore y así eliminarlo desde esta base de datos */
  deletePost(postuser: Postuser) {
    this.commentaryDoc = this.afs.doc(`commentary/${postuser.idFireStore}`);
    this.commentaryDoc.delete();
      // .then( _ => alert('te quedaste sin comida'))
      // .catch(_ => alert('no pude eliminar'));
  }


   
}
