import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'contract-calendar'.w(),
  contracts: [],
  hasSelectedDay: Ember.computed('selectedDay', function(){
    return !!this.get('selectedDay.date');
  }),
  selectedDay: {},
  didInsertElement(){
    var events,
        contracts;

    contracts = this.get('contracts');

    events = contracts.map((contract)=>{
      return {
        id: contract.get('id'),
        title: `Contract #${contract.get('id')}`,
        start: `${contract.get('date')}`,
        end: `${contract.get('date')}`,
        editable: false
      };
    });

    this.$().fullCalendar({
      events: events,
      eventClick: (event)=>{
        this.set('contract', contracts.findBy('id', event.id));
        this.$('#event-info').modal('show');
      }.bind(this),
      dayClick: (date, ev)=>{
        var dateContracts,
            totalDueForDate;

        totalDueForDate = 0;

        dateContracts = this.get('contracts').filterBy('date', date.format());
        dateContracts.forEach((item)=>{
          totalDueForDate += item.get('amount');
        });

        Ember.$('.fc-day.selected-day').removeClass('selected-day');
        Ember.$(ev.target).addClass('selected-day');

        if(totalDueForDate > 0){
          this.set('selectedDay', {
            date: date.format('Do of MMMM, YYYY'),
            total: totalDueForDate,
            numberOfContracts: dateContracts.length
          });
        } else {
          this.set('selectedDay', {});
        }
      }.bind(this)
    });
  }
});
