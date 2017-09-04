import { Component} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {ActivityNewAppComponent} from './activityNewApp.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-activity-apps-edit',
  templateUrl: './activityAppsEdit.component.html',
  styleUrls: ['./activityAppsEdit.component.scss']
})

export class ActivityAppsEditComponent {
  dialog: any;

  constructor(private activityService: ActivityService, private router: Router,
              private user: UserService, dialog: MdDialog) {
    this.dialog = dialog;
  }

  private newApp() {
      const dialogRef = this.dialog.open(ActivityNewAppComponent);
      dialogRef.componentInstance.dialogRef = dialogRef;
  }

  private delete_app(appId) {
    this.activityService.apps.deleteApp(appId, this.activityService.activity_loaded._id);
  }
}