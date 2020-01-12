import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private firestore: AngularFirestore) { }

  public getAuthors() {
    return this.firestore.collection('authors').snapshotChanges();
  }
  public getAuthor(id: any) {
    return this.firestore.collection('authors').doc(id).snapshotChanges();
  }
  public createAuthor(author) {
    return this.firestore.collection('authors').add(author);
  }
  public editAuthor(author) {
    return this.firestore.collection('authors').doc(author.id).set(author);
  }
  public deleteAuthor(author) {
    return this.firestore.collection('authors').doc(author.id).delete();
  }

}
