import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'uploader dropzone'.w(),
  classNameBindings: 'isDragging isDisabled:is-disabled'.w(),
  attributeBindings: 'data-uploader'.w(),
  'data-uploader': 'true',
  isDisabled: false,

  dragOver(event){
    // this is needed to avoid the default behaviour from the browser
    event.preventDefault();
  },

  dragEnter(event){
    event.preventDefault();
    this.set('isDragging', true);
  },

  dragLeave(event){
    event.preventDefault();
    this.set('isDragging', false);
  },

  drop(event){
    var file;

    if(!this.get('isDisabled')){
      event.preventDefault();
      this.set('isDragging', false);

      file = event.dataTransfer.files[0];
      this.sendAction('fileInputChanged', file);
    } else{
      console.error('you can only parse one file at the time');
    }
  },

  click(){
    var $inputField,
        _this,
        file;

    $inputField = this.$('input');
    _this = this;

    $inputField[0].click();
    $inputField.on('change', ()=>{
      file = $inputField[0].files[0];
      _this.sendAction('fileInputChanged', file);
    });
  }
});
