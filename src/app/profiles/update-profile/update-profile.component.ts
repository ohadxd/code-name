import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo, User } from 'firebase/auth';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  profileForm = new FormGroup({
    displayName: new FormControl(''),
    profileImg: new FormControl(''),

  });

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  fileName: string = '';
  uploadProgress$: Observable<number>;
  uploadProgress: number;
  uploadSub: Subscription;
  progressSub: Subscription;
  uid: string;
  user: UserInfo;
  
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private auth: AngularFireAuth) {
    
    // this.options = fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    // });

  }
  ngOnInit(): void {

   localStorage.getItem('userData');
       this.auth.user.subscribe(user => {
       this.uid = user.uid;
       this.user = user;
      });
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    // const Metadata = {
    //   contentType: 'image/*'
    // };
    const userData: User = JSON.parse(localStorage.getItem('user') || 'null');
    if (file) {

      this.fileName = file.name;
      const uploadImg = this.storage.upload(`assets/profiles/${userData.uid.slice(0,5)}`, file);
      this.uploadProgress$ = uploadImg.percentageChanges();
      this.progressSub = this.uploadProgress$.subscribe((precentage => {
        this.uploadProgress = precentage;
        console.log(precentage);

      }));
      this.uploadSub = uploadImg.snapshotChanges().pipe(finalize(() => {
        this.progressSub.unsubscribe();
        console.log('success');
    }
      )).subscribe(() =>{
      }, error => {
        console.log(error);
      });
  }
}
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.progressSub.unsubscribe();

    this.reset();
  }

  reset() {
    this.progressSub = null;
    this.uploadSub = null;

  }

  onSubmit() {

  }
  }

