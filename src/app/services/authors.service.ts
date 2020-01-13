import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    return this.firestore.collection('authors').doc(author.id).set(author);
  }
  public deleteAuthor(id: string) {
    return this.firestore.collection('authors').doc(id).delete();
  }

}
