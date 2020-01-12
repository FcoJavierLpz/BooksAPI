import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private firestore: AngularFirestore) { }

  public getBooks() {
    return this.firestore.collection('books').snapshotChanges();
  }
  public getBook(id: any) {
    return this.firestore.collection('books').doc(id).snapshotChanges();
  }
  public createBook(book) {
    return this.firestore.collection('books').add(book);
  }
  public editBook(book) {
    return this.firestore.collection('books').doc(book.id).set(book);
  }
  public deleteBook(book) {
    return this.firestore.collection('books').doc(book.id).delete();
  }
}
