import angular from 'angular';

class service {

  /* @ngInject */
  constructor(AsyncService) {
    this.firstHitLogId = null;
    this.hitLog = pageName => {
      AsyncService.hitLog(pageName, this.firstHitLogId).then(([{ id: hitLogId }]) => {
        if (!this.firstHitLogId) {
          this.firstHitLogId = hitLogId;
        }
      });
    };

    this.getHitLogId = () => this.firstHitLogId;
  }
}

export default angular.module('myApp.services.hitlog', [])
.service('HitLogService', service)
  .name;
