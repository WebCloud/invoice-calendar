import DS from 'ember-data';
import Ember from 'ember';
/* global moment */

export default DS.Model.extend({
  date: DS.attr('string'),
  time: DS.attr('string'),
  amount: DS.attr('number'),
  computeDates: Ember.observer('date', 'time', function(){
    var normalizedDate = `${this.get('date')}T${this.get('time')}`;
    
    this.set('formattedTime',
             moment(normalizedDate).format('HH:mm'));
    this.set('formattedDate',
             moment(normalizedDate).format('Do of MMMM, YYYY'));

    if(moment(normalizedDate).isBefore(moment())){
      this.set('isOverdue', true);
    }

    this.set('fromNow', moment(normalizedDate).fromNow());
  }).on('init')
});
