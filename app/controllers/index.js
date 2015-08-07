import Ember from 'ember';
/* global Papa */

export default Ember.Controller.extend({
  hasContracts: Ember.computed.notEmpty('model'),
  actions: {
    receiveFile(file){
      var _this,
          contracts;

      _this = this;
      Papa.parse(file, {
      	header: true,
      	dynamicTyping: true,
      	complete: (results)=>{
          contracts = results;
          contracts = contracts['data'].map((item)=>{
            var contract = _this.store.createRecord('contract',
                                                    {
                                                     id: item.Contract,
                                                     date: item.Date,
                                                     amount: item.Amount,
                                                     time: item.Time
                                                    });

            contract.save();
            return contract;
          });

          _this.set('model', contracts);
        }
      });
    }
  }
});
