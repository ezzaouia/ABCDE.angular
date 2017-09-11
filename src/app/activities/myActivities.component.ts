import {Component} from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {NewActivityComponent} from './newActivity.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './myActivities.component.html',
})

export class MyActivitiesComponent {
  activities: any;
  dialog: any;

  constructor(private user: UserService, private activityService: ActivityService, private router: Router,
              dialog: MdDialog) {
    this.dialog = dialog;
  }

  load_activity(activity_id) {
    this.activityService.load_activity(activity_id).then( res => {
      this.router.navigate(['activity_apps']);
    });
  }

  show_activity(activity_id) {
    this.activityService.load_activity(activity_id).then(res => {
      this.router.navigate(['activity_view']);
    });
  }

  edit_activity(activity_id) {
    this.activityService.load_activity(activity_id).then( res => {
      this.router.navigate(['activity_edit']);
    });
  }

  newActivity() {
    const dialogRef = this.dialog.open(NewActivityComponent);
    dialogRef.componentInstance.dialogRef = dialogRef;
  }

  delete_activity(activityId) {
    this.activityService.delete_activity(activityId);
  }

  duplicate_activity(activityId) {
    this.activityService.duplicate(activityId);
}
}
