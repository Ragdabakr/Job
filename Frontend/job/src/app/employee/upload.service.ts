import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { Upload } from 'src/app/common/models/upload.model';



@Injectable({
  providedIn: 'root'
})
export class UploadService {
  successMessage: string;
  downloadURL: any;
  private subject = new Subject<any>();
  private pdfUrl = new Subject<any>();
  constructor( 
              private db: AngularFireDatabase ,
              private fs: AngularFirestore
              ) { }

  private basePath: string = '/uploads';
  uploads: Upload[];

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        uploadTask.snapshot.ref.getDownloadURL().then(
          (downloadURL) => {
        // pass upload url to component
             this.subject.next({ downloadURL });
        });
      });
  }
  // pass upload url to component
  getUploadLink( ): Observable<any> {
    return this.subject.asObservable();
  }

  pushUploadPdf(upload: Upload){
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error);
        },
        () => {
          // upload success
          uploadTask.snapshot.ref.getDownloadURL().then(
            (downloadURLPdf) => {
          // pass upload url to component
               this.pdfUrl.next({ downloadURLPdf });
          });
        });
  }
  getPdfLink(): Observable<any> {
   return this.pdfUrl.asObservable();
  }

  // // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch(error => console.log(error));
  }

  // // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
