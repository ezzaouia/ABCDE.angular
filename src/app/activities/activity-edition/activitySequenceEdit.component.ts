import {Component, Input} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-activity-sequence-edit',
  templateUrl: './activitySequenceEdit.component.html',
  styleUrls: ['./activitySequenceEdit.component.scss']
})

export class ActivitySequenceEditComponent {
  @Input() edit: boolean;

  constructor(private activityService: ActivityService,
              private userService: UserService,
              private router: Router) {
    console.log(this.activityService.activity_loaded_child);
  }

  show_subactivity(activityId) {
    this.activityService.load_activity(activityId).then( res => {
      this.router.navigate(['activity_view/' + activityId]);
    });
  }

  edit_subactivity(activityId) {
    this.activityService.load_activity(activityId).then( res => {
      this.router.navigate(['activity_edit/' + activityId]);
    });
  }

  new_subactivity() {
    this.activityService.createSubActivity(this.activityService.activity_loaded._id).then( newActivity => {
      this.userService.db.query('byActivity/by-activity',
        { startkey: this.activityService.activity_loaded._id, endkey: this.activityService.activity_loaded._id}).then( participants => {
          let users = [];
          participants.rows.map((row) => {
            row.value.activites.push(newActivity['id']);
            users.push(row.value);
          });
        this.userService.db.bulkDocs(users).then(res => {
          //this.activityService.load_activity(newActivity['id']);
          });
        });
    });
  }

  delete_subactivity(activityId) {
  }

}
