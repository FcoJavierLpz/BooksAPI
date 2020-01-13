import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Author } from '../author/author.model';

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
  public createAuthor(author: Author) {
    return this.firestore.collection('authors').add(author);
  }
  public editAuthor(author: Author) {
    return this.firestore.collection('authors').doc(author.id.toString()).set(author);
  }
  public deleteAuthor(id: string) {
    return this.firestore.collection('authors').doc(id.toString()).delete();
  }

}
