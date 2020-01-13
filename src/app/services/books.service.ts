import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Book } from '../book/book.model';

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
  public createBook(book: Book) {
    return this.firestore.collection('books').add(book);
  }
  public editBook(book: Book) {
    return this.firestore.collection('books').doc(book.id).set(book);
  }
  public deleteBook(id: string) {
    return this.firestore.collection('books').doc(id).delete();
  }
}
